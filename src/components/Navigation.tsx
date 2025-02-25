'use client';

import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import { ThemeToggle } from './ThemeProvider';

export default function Navigation() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-dark-grey-100 dark:bg-dark-grey-900/80 dark:border-dark-grey-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Clean</span>
              <span className="text-2xl font-bold text-accent">Convert</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 hover:bg-dark-grey-100 dark:hover:bg-dark-grey-800 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className="text-content-light hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-content-light hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-content-light hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Auth Buttons and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {session ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className="text-content-light hover:text-primary transition-colors"
                >
                  Sign in
                </button>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                  Start for free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}
