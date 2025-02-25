'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeProvider';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { data: session } = useSession();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match transition duration
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-64 bg-white dark:bg-dark-grey-900 shadow-xl transform transition-transform duration-300 ${
          isClosing ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-between items-center p-4">
            <ThemeToggle />
            <button
              onClick={handleClose}
              className="p-2 hover:bg-dark-grey-100 dark:hover:bg-dark-grey-800 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col px-4 py-2 space-y-1">
            <Link
              href="/features"
              className="px-4 py-2 text-content-light hover:text-primary hover:bg-dark-grey-50 dark:hover:bg-dark-grey-800 rounded-lg transition-colors"
              onClick={handleClose}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="px-4 py-2 text-content-light hover:text-primary hover:bg-dark-grey-50 dark:hover:bg-dark-grey-800 rounded-lg transition-colors"
              onClick={handleClose}
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-content-light hover:text-primary hover:bg-dark-grey-50 dark:hover:bg-dark-grey-800 rounded-lg transition-colors"
              onClick={handleClose}
            >
              Blog
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="mt-auto p-4 space-y-2">
            {session ? (
              <Link
                href="/dashboard"
                className="block w-full px-4 py-2 text-center text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                onClick={handleClose}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleClose();
                    signIn();
                  }}
                  className="block w-full px-4 py-2 text-center text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  Sign in
                </button>
                <Link
                  href="/signup"
                  className="block w-full px-4 py-2 text-center text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                  onClick={handleClose}
                >
                  Start for free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
