'use client';

import Link from 'next/link';
import PaymentLogos from './PaymentLogos';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface/50 dark:bg-surface-dark/50 border-t border-dark-grey-200/50 dark:border-dark-grey-700/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Logo size="sm" showUnderline />
            <p className="text-sm text-content-light dark:text-dark-grey-400 leading-relaxed">
              Transform your images with simplicity and precision. Support for all major image formats.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://twitter.com/cleanconvert" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-content-light dark:text-dark-grey-400 hover:text-accent dark:hover:text-accent-light transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/cleanconvert" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-content-light dark:text-dark-grey-400 hover:text-accent dark:hover:text-accent-light transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-content dark:text-content-dark">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/pricing" 
                  className="text-sm text-content-light dark:text-dark-grey-400 hover:text-accent dark:hover:text-accent-light transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className="text-sm text-content-light dark:text-dark-grey-400 hover:text-accent dark:hover:text-accent-light transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard/credits" 
                  className="text-sm text-content-light dark:text-dark-grey-400 hover:text-accent dark:hover:text-accent-light transition-colors"
                >
                  Buy Credits
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-content dark:text-content-dark">
              Legal
            </h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-sm text-content-light dark:text-dark-grey-400 hover:text-accent dark:hover:text-accent-light transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-sm text-content-light dark:text-dark-grey-400 hover:text-accent dark:hover:text-accent-light transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/cookies" 
                  className="text-sm text-content-light dark:text-dark-grey-400 hover:text-accent dark:hover:text-accent-light transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-content dark:text-content-dark">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:support@cleanconvert.com" 
                  className="text-sm text-content-light dark:text-dark-grey-400 hover:text-accent dark:hover:text-accent-light transition-colors"
                >
                  support@cleanconvert.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-16 pt-8 border-t border-dark-grey-200/50 dark:border-dark-grey-700/50">
          <div className="text-center space-y-6">
            <h3 className="text-sm font-medium text-content-light dark:text-dark-grey-400">
              Secure Payment Methods
            </h3>
            <PaymentLogos className="max-w-2xl mx-auto opacity-60" />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-dark-grey-200/50 dark:border-dark-grey-700/50 text-center">
          <p className="text-sm text-content-light dark:text-dark-grey-400">
            © {currentYear} Clean Convert. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
