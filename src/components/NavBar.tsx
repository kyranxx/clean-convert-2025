'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';
import Logo from './Logo';

export default function NavBar() {
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = session?.user?.role === 'ADMIN';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-dark-grey-200/50 dark:border-dark-grey-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="flex-shrink-0 transition-transform duration-250 hover:scale-105"
            >
              <Logo size="sm" showUnderline />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="icon-btn"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden icon-btn"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {status === 'loading' ? (
              <div className="h-9 w-24 bg-dark-grey-100 dark:bg-dark-grey-800 rounded-lg animate-pulse" />
            ) : session ? (
              <>
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
                      {session.user?.credits ?? 0}
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
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-2 pt-2 pb-4 space-y-1">
            {status === 'loading' ? (
              <div className="h-9 w-24 bg-dark-grey-100 dark:bg-dark-grey-800 rounded-lg animate-pulse" />
            ) : session ? (
              <>
                {isAdmin && (
                  <Link
                    href="/dashboard/admin/credits"
                    className="block px-3 py-2 rounded-md text-base font-medium text-content hover:bg-dark-grey-100 dark:hover:bg-dark-grey-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-content hover:bg-dark-grey-100 dark:hover:bg-dark-grey-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/credits"
                  className="block px-3 py-2 rounded-md text-base font-medium text-content hover:bg-dark-grey-100 dark:hover:bg-dark-grey-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span>Credits</span>
                    <span className="px-2 py-0.5 bg-accent/10 dark:bg-accent-dark/10 text-accent dark:text-accent-light rounded-full text-sm">
                      {session.user?.credits ?? 0}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-content hover:bg-dark-grey-100 dark:hover:bg-dark-grey-800"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="block px-3 py-2 rounded-md text-base font-medium text-content hover:bg-dark-grey-100 dark:hover:bg-dark-grey-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/auth/signin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-content hover:bg-dark-grey-100 dark:hover:bg-dark-grey-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-3 py-2 mt-2 text-center rounded-md btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start for free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
