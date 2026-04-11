import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/lib/cart'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DoPlannix — Notion Templates for a Productive Life',
  description:
    'Complete Notion systems for managing your life, business, and finances. Designed to work from day one.',
  keywords: 'Notion, templates, productivity, planning, finance, business',
  openGraph: {
    title: 'DoPlannix — Notion Templates for a Productive Life',
    description:
      'Complete Notion systems for managing your life, business, and finances.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
