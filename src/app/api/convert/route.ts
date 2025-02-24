import { NextRequest, NextResponse } from 'next/server';
import { convertImage, ConversionOptions } from '@/lib/server/imageConverter';
import { isFormatSupported } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const CREDITS_PER_CONVERSION = 1;

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }
  try {
    // Check user's credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true }
    });

    if (!user || user.credits < CREDITS_PER_CONVERSION) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 402 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const format = formData.get('format') as string | null;
    
    if (!file || !format) {
      return NextResponse.json(
        { error: 'File and format are required' },
        { status: 400 }
      );
    }

    if (!isFormatSupported(format)) {
      return NextResponse.json(
        { error: 'Unsupported format' },
        { status: 400 }
      );
    }

    let buffer: Buffer;
    try {
      buffer = Buffer.from(await file.arrayBuffer());
    } catch (error) {
      console.error('Buffer conversion error:', error);
      return NextResponse.json(
        { error: 'Failed to process uploaded file' },
        { status: 400 }
      );
    }
    
    const options: ConversionOptions = {
      format: format,
      quality: 80
    };

    try {
      const result = await convertImage(buffer, options);

      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 500 }
        );
      }

      // Record conversion and deduct credits
      const [conversion] = await prisma.$transaction([
        prisma.conversion.create({
          data: {
            userId: session.user.id,
            originalName: file.name,
            originalSize: parseInt(file.size.toString(), 10), // Ensure integer
            convertedSize: parseInt(result.size.toString(), 10), // Ensure integer
            fromFormat: file.type.split('/')[1],
            toFormat: format,
            status: 'COMPLETED',
            completedAt: new Date()
          }
        }),
        prisma.user.update({
          where: { id: session.user.id },
          data: { credits: { decrement: CREDITS_PER_CONVERSION } }
        }),
        prisma.credit.create({
          data: {
            userId: session.user.id,
            amount: -CREDITS_PER_CONVERSION,
            type: 'USAGE'
          }
        })
      ]);

      // Create response headers for file download
      const headers = new Headers();
      headers.set('Content-Type', `image/${format}`);
      headers.set('Content-Disposition', `attachment; filename="converted.${format}"`);
      headers.set('Content-Length', result.size.toString());

      return new NextResponse(result.data, {
        status: 200,
        headers
      });
    } catch (error) {
      console.error('Conversion error:', error);
      return NextResponse.json(
        { error: 'Image conversion failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
