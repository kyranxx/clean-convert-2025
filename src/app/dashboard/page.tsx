import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import DashboardContent from '@/components/DashboardContent';
import { prisma } from '@/lib/prisma';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  const [user, conversions, creditHistory] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true }
    }),
    prisma.conversion.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    }),
    prisma.credit.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    })
  ]);

  return (
    <DashboardContent 
      initialCredits={user?.credits ?? 0}
      initialConversions={conversions}
      initialCreditHistory={creditHistory}
    />
  );
}
