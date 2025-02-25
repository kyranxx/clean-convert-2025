'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface HeroSectionProps {
  className?: string;
  stats?: {
    conversions: number;
    users: number;
  };
}

export default function HeroSection({ className = '', stats }: HeroSectionProps) {
  const { data: session } = useSession();

  return (
    <div className={`text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 dark:bg-accent-dark/10 rounded-full mb-8">
        <svg className="w-5 h-5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="text-sm font-medium text-accent dark:text-accent-light">
          AI co-founder
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl sm:text-6xl font-bold text-content dark:text-content-dark mb-6">
        Convert Images with
        <span className="text-primary dark:text-primary-light"> Confidence</span>
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-content-light/80 dark:text-content-dark/60 mb-12 max-w-2xl mx-auto">
        Transform your images instantly with our secure converter. Free, fast, and no registration required.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <Link
          href={session ? '/dashboard' : '/signup'}
          className="w-full sm:w-auto px-8 py-3 text-lg font-medium text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
        >
          Start converting now
        </Link>
        <Link
          href="/features"
          className="w-full sm:w-auto px-8 py-3 text-lg font-medium text-content-light hover:text-primary border border-dark-grey-200 dark:border-dark-grey-700 hover:border-primary rounded-xl transition-all duration-200 hover:shadow-lg"
        >
          View all features
        </Link>
      </div>

      {/* Stats */}
      {stats && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-content-light/60 dark:text-content-dark/40">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary ring-2 ring-white dark:ring-dark-grey-900"
                />
              ))}
            </div>
            <span className="text-sm">
              <strong className="text-content dark:text-content-dark">{stats.users.toLocaleString()}</strong> users joined
            </span>
          </div>
          <div className="text-sm">
            <strong className="text-content dark:text-content-dark">{stats.conversions.toLocaleString()}</strong> images converted this week
          </div>
        </div>
      )}
    </div>
  );
}
