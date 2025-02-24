import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Credit, UserWithCredits } from '@/types/credit';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Check if user is admin
  const admin = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });

  if (admin?.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    );
  }

  try {
    const { userId, amount, type, reason } = await request.json();

    if (!userId || !amount || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate credit type
    if (!['BONUS', 'REFUND', 'USAGE'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid credit type' },
        { status: 400 }
      );
    }

    // Update user credits and create credit history in a transaction
    const [updatedUser, newCredit] = await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { credits: { increment: amount } },
        select: { credits: true }
      }),
      prisma.credit.create({
        data: {
          userId,
          amount,
          type: type as 'BONUS' | 'REFUND' | 'USAGE',
          reason
        }
      })
    ]);

    return NextResponse.json({
      success: true,
      newBalance: updatedUser.credits,
      credit: newCredit
    });
  } catch (error) {
    console.error('Failed to manage credits:', error);
    return NextResponse.json(
      { error: 'Failed to manage credits' },
      { status: 500 }
    );
  }
}

// Get user credit information for admin
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Check if user is admin
  const admin = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });

  if (admin?.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 403 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  try {
    if (userId) {
      // Get specific user's credit info
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          creditHistory: true
        }
      });

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      // Sort and limit credit history
      const sortedHistory = [...user.creditHistory]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);

      return NextResponse.json({
        id: user.id,
        email: user.email,
        credits: user.credits,
        creditHistory: sortedHistory
      });
    } else {
      // Get all users with their credit counts
      const users = await prisma.user.findMany({
        include: {
          _count: {
            select: {
              creditHistory: true
            }
          }
        },
        orderBy: {
          credits: 'desc'
        }
      });

      // Map to the desired response format
      const formattedUsers = users.map(user => ({
        id: user.id,
        email: user.email,
        credits: user.credits,
        creditCount: user._count.creditHistory
      }));

      return NextResponse.json(formattedUsers);
    }
  } catch (error) {
    console.error('Failed to fetch credit information:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credit information' },
      { status: 500 }
    );
  }
}
