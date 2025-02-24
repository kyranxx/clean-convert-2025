import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminCreditManager from '@/components/AdminCreditManager';

export default async function AdminCreditsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  });

  if (user?.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  // Fetch all users with their credit information
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      credits: true,
      _count: {
        select: { creditHistory: true }
      }
    },
    orderBy: { credits: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-content-dark">Credit Management</h1>
        <p className="text-content-light mt-2">
          Manage user credits and view credit history
        </p>
      </div>

      <AdminCreditManager users={users} />
    </div>
  );
}
