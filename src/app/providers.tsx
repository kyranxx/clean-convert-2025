'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/ThemeProvider';

export function Providers({
  children,
  session
}: {
  children: React.ReactNode;
  session?: Session | null;
}) {
  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        {children}
        <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
        />
      </SessionProvider>
    </ThemeProvider>
  );
}
