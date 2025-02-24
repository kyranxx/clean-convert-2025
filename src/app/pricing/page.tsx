'use client';

import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark pt-12 pb-16">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold mb-4 text-balance bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-light dark:from-accent-light dark:to-accent">
            Pricing Plans
          </h1>
          <p className="text-lg text-content-light dark:text-dark-grey-400 mb-2">
            Choose the perfect plan for your needs
          </p>
          <p className="text-sm text-content-light dark:text-dark-grey-400">
            All plans include high-quality conversions and batch processing
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Starter */}
          <div className="card text-center">
            <div className="px-6 py-8">
              <h3 className="text-lg font-medium mb-2">Starter</h3>
              <p className="text-content-light dark:text-dark-grey-400 mb-4">10 Credits</p>
              <p className="text-3xl font-semibold mb-6">$5</p>
              <ul className="space-y-3 mb-8 text-sm text-content-light dark:text-dark-grey-400">
                <li>✓ High-quality conversion</li>
                <li>✓ All formats supported</li>
                <li>✓ Batch processing</li>
                <li>✓ 24/7 support</li>
              </ul>
              <Link 
                href="/auth/signin" 
                className="btn-primary w-full"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Value Pack */}
          <div className="card text-center relative transform scale-105 bg-accent/5 dark:bg-accent-dark/10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent dark:bg-accent-light text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <div className="px-6 py-8">
              <h3 className="text-lg font-medium mb-2">Value Pack</h3>
              <p className="text-content-light dark:text-dark-grey-400 mb-4">50 Credits</p>
              <p className="text-3xl font-semibold mb-6">$20</p>
              <ul className="space-y-3 mb-8 text-sm text-content-light dark:text-dark-grey-400">
                <li>✓ High-quality conversion</li>
                <li>✓ All formats supported</li>
                <li>✓ Batch processing</li>
                <li>✓ 24/7 support</li>
                <li>✓ Priority processing</li>
              </ul>
              <Link 
                href="/auth/signin" 
                className="btn-primary w-full"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Pro Pack */}
          <div className="card text-center">
            <div className="px-6 py-8">
              <h3 className="text-lg font-medium mb-2">Pro Pack</h3>
              <p className="text-content-light dark:text-dark-grey-400 mb-4">100 Credits</p>
              <p className="text-3xl font-semibold mb-6">$35</p>
              <ul className="space-y-3 mb-8 text-sm text-content-light dark:text-dark-grey-400">
                <li>✓ High-quality conversion</li>
                <li>✓ All formats supported</li>
                <li>✓ Batch processing</li>
                <li>✓ 24/7 support</li>
                <li>✓ Priority processing</li>
                <li>✓ API access</li>
              </ul>
              <Link 
                href="/auth/signin" 
                className="btn-primary w-full"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-2">Questions?</h2>
          <p className="text-content-light dark:text-dark-grey-400">
            Contact our support team at{' '}
            <a href="mailto:support@cleanconvert.com" className="text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-accent">
              support@cleanconvert.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
