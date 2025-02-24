'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import { SupportedFormat } from '@/lib/types';
import Logo from '@/components/Logo';
import PaymentLogos from '@/components/PaymentLogos';

export default function Home() {
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleConversion = async (file: File, format: SupportedFormat) => {
    setIsConverting(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', format);

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Conversion failed');
      }

      const originalName = file.name.replace(/\.[^/.]+$/, "");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${originalName}_converted.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during conversion');
      throw err;
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-grey-900 hero-pattern">
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background pointer-events-none" />
        
        <section className="relative pt-24 pb-16 md:pt-36 md:pb-24">
          <div className="container-narrow text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-content dark:text-content-dark">
              Convert Images with Ease
            </h1>
            <p className="text-lg md:text-xl text-content-light dark:text-content-dark/80 max-w-2xl mx-auto">
              Transform your images between formats instantly. Free, fast, and secure image conversion for everyone.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-content-light dark:text-content-dark/60">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No Registration Required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>100% Secure</span>
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-16">
          <div className="container-narrow">
            <div className="bg-white/50 dark:bg-dark-grey-800/50 backdrop-blur-sm shadow-lg dark:shadow-dark-lg rounded-2xl border border-gray-100/50 dark:border-dark-grey-700/50">
              <FileUpload
                onFileSelect={handleConversion}
                isConverting={isConverting}
              />
              {error && (
                <div className="mx-6 mb-6 p-4 bg-red-50/50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="relative pb-16">
          <div className="container-narrow text-center space-y-8">
            <h2 className="text-2xl font-semibold text-content dark:text-content-dark">
              Trusted by Users Worldwide
            </h2>
            <PaymentLogos className="max-w-2xl mx-auto opacity-70" />
            <div className="flex items-center justify-center gap-8 text-sm text-content-light dark:text-content-dark/60">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>End-to-end Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% Private</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
