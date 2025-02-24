import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { ToastContainer } from '@/components/ToastProgress'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Clean Convert - Modern Image Conversion',
  description: 'Transform your images with precision and simplicity. Support for JPEG, PNG, WebP, GIF, TIFF, AVIF, and HEIF formats.',
  keywords: ['image conversion', 'file format', 'image processing', 'web tools'],
  authors: [{ name: 'Clean Convert Team' }],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-light dark:bg-gradient-dark transition-colors duration-250`}>
        <Providers session={session}>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
