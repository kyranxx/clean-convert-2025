import { Metadata } from 'next'
import Logo from '@/components/Logo'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Authentication - Clean Convert',
  description: 'Sign in or create an account to use Clean Convert',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-grey-900 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <Logo size="lg" showUnderline={false} />
        </div>
        <div className="bg-white dark:bg-dark-grey-800 shadow-medium dark:shadow-dark-medium rounded-xl p-6">
          {children}
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-dark-grey-600 dark:text-dark-grey-400">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-accent">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="/privacy" className="text-accent hover:text-accent-dark dark:text-accent-light dark:hover:text-accent">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
