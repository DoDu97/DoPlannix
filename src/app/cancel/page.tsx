import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Platba zrušena — DoPlannix',
  description: 'Platba byla zrušena. Vrať se zpět a zkus to znovu.',
}

export default function CancelPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center"
      style={{ background: '#0a0a0a' }}
    >
      {/* icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-6"
        style={{
          background: 'rgba(255,107,107,0.08)',
          border: '1px solid rgba(255,107,107,0.25)',
        }}
      >
        ✕
      </div>

      {/* heading */}
      <h1
        className="font-black tracking-tight mb-3"
        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
      >
        Platba byla <span style={{ color: '#ff6b6b' }}>zrušena</span>
      </h1>

      <p className="text-dim leading-relaxed max-w-md mb-10" style={{ fontSize: '1rem' }}>
        Nic se nestalo — žádná platba nebyla stržena. Kdykoliv se můžeš
        vrátit a objednávku dokončit.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link href="/#products" className="btn-gold px-8 py-3.5 text-[0.95rem]">
          Zpět na produkty →
        </Link>
        <Link
          href="/"
          className="px-8 py-3.5 text-[0.9rem] text-dim hover:text-white transition-colors"
        >
          Hlavní stránka
        </Link>
      </div>
    </main>
  )
}
