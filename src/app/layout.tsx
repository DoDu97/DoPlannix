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
  title: 'DoPlannix — Notion šablony pro produktivní život',
  description:
    'Kompletní Notion systémy pro řízení života, businessu a financí. Navrženo tak, aby fungovalo od prvního dne.',
  keywords: 'Notion, šablony, produktivita, plánování, finance, business',
  openGraph: {
    title: 'DoPlannix — Notion šablony pro produktivní život',
    description:
      'Kompletní Notion systémy pro řízení života, businessu a financí.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={inter.variable}>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
