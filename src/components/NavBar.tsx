'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Logo from './Logo';

export default function NavBar() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-dark-grey-200/50 dark:border-dark-grey-700/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex-shrink-0 transition-transform duration-250 hover:scale-105"
            >
              <Logo size="sm" showUnderline />
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {status === 'loading' ? (
              <div className="h-9 w-24 bg-dark-grey-100 dark:bg-dark-grey-800 rounded-lg animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-6">
                {isAdmin && (
                  <Link 
                    href="/dashboard/admin/credits" 
                    className="nav-link relative group"
                  >
                    <span>Admin</span>
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
                  </Link>
                )}
                <Link 
                  href="/dashboard" 
                  className="nav-link relative group"
                >
                  <span>Dashboard</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
                </Link>
                <Link 
                  href="/dashboard/credits" 
                  className="nav-link relative group"
                >
                  <div className="flex items-center gap-2">
                    <span>Credits</span>
                    <span className="px-2 py-0.5 bg-accent/10 dark:bg-accent-dark/10 text-accent dark:text-accent-light rounded-full text-sm">
                      {session.user.credits}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="nav-link relative group"
                >
                  <span>Sign out</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link 
                  href="/pricing" 
                  className="nav-link relative group"
                >
                  <span>Pricing</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
                </Link>
                <Link 
                  href="/auth/signin" 
                  className="nav-link relative group"
                >
                  <span>Sign in</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
                </Link>
                <Link 
                  href="/auth/register" 
                  className="btn-primary group relative overflow-hidden"
                >
                  <span className="relative z-10">Start for free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%] group-hover:animate-gradient" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
