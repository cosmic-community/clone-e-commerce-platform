import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nike Clone - Just Do It',
  description: 'Nike-inspired e-commerce platform powered by Cosmic CMS',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        url: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="16x16" type="image/x-icon" />
        <link rel="icon" href="/icon.png" sizes="32x32" type="image/png" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}