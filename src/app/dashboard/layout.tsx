import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import NavBar from '@/components/NavBar';

export const metadata: Metadata = {
  title: 'Dashboard - Clean Convert',
  description: 'Manage your image conversions and credits',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  // Check if trying to access admin routes
  if (
    session.user.role !== 'ADMIN' && 
    typeof window !== 'undefined' && 
    window.location.pathname.includes('/admin')
  ) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </div>
    </div>
  )
}
