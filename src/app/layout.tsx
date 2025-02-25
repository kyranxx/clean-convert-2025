'use client';

import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background dark:bg-background-dark text-content dark:text-content-dark min-h-screen`}>
        <SessionProvider>
          <ThemeProvider>
            <Toaster position="top-right" />
            <Navigation />
            <main className="pt-16">
              {children}
            </main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
