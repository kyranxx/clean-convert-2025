import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashIpAddress } from '@/utils/hash';

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Get the first IP if there are multiple
    return forwardedFor.split(',')[0].trim();
  }
  
  // Fallback to other headers
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Final fallback
  return 'unknown';
}

export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const hashedIp = hashIpAddress(ip);

    const usage = await prisma.freeTierUsage.findFirst({
      where: {
        ipAddress: hashedIp,
      },
      orderBy: {
        lastUsedAt: 'desc',
      },
    });

    return NextResponse.json({
      hasUsedFreeTier: !!usage,
      lastUsedAt: usage?.lastUsedAt,
    });
  } catch (error) {
    console.error('Error checking free tier usage:', error);
    return NextResponse.json(
      { error: 'Failed to check free tier usage' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { recaptchaScore } = await req.json();
    const ip = getClientIp(req);
    const hashedIp = hashIpAddress(ip);

    // Check if user has already used free tier
    const existingUsage = await prisma.freeTierUsage.findFirst({
      where: {
        ipAddress: hashedIp,
      },
    });

    if (existingUsage) {
      return NextResponse.json(
        { error: 'Free tier already used' },
        { status: 400 }
      );
    }

    // Record new free tier usage
    const usage = await prisma.freeTierUsage.create({
      data: {
        ipAddress: hashedIp,
        recaptchaScore,
      },
    });

    return NextResponse.json({
      success: true,
      id: usage.id,
    });
  } catch (error) {
    console.error('Error recording free tier usage:', error);
    return NextResponse.json(
      { error: 'Failed to record free tier usage' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, conversionId } = await req.json();

    // Update the free tier usage record with the conversion ID
    const usage = await prisma.freeTierUsage.update({
      where: { id },
      data: {
        conversionId,
      },
    });

    return NextResponse.json({
      success: true,
      usage,
    });
  } catch (error) {
    console.error('Error updating free tier usage:', error);
    return NextResponse.json(
      { error: 'Failed to update free tier usage' },
      { status: 500 }
    );
  }
}
