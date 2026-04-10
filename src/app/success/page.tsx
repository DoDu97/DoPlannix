import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Platba proběhla úspěšně — DoPlannix',
  description: 'Tvoje objednávka byla dokončena. Brzy ti pošleme odkaz na šablonu.',
}

export default function SuccessPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center"
      style={{ background: '#0a0a0a' }}
    >
      {/* icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6"
        style={{
          background: 'rgba(201,168,76,0.12)',
          border: '1px solid rgba(201,168,76,0.3)',
        }}
      >
        ✓
      </div>

      {/* heading */}
      <h1
        className="font-black tracking-tight mb-3"
        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
      >
        Platba proběhla{' '}
        <span className="text-gold-glow">úspěšně!</span>
      </h1>

      <p className="text-dim leading-relaxed max-w-md mb-2" style={{ fontSize: '1rem' }}>
        Děkujeme za nákup. Odkaz na tvoji Notion šablonu ti pošleme na e-mail
        zadaný při objednávce — obvykle do pár minut.
      </p>
      <p className="text-dim text-[0.85rem] mb-10">
        Zkontroluj také složku <strong className="text-[#ccc]">Spam / Hromadné</strong>, kdyby e-mail dorazil tam.
      </p>

      {/* guarantee strip */}
      <div
        className="flex items-center gap-2 rounded-xl px-5 py-3 mb-10 text-[0.82rem] font-semibold text-gold"
        style={{
          background: 'rgba(201,168,76,0.10)',
          border: '1px solid rgba(201,168,76,0.25)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        30denní garance vrácení peněz — bez otázek
      </div>

      {/* CTA */}
      <Link href="/" className="btn-gold px-8 py-3.5 text-[0.95rem]">
        ← Zpět na hlavní stránku
      </Link>
    </main>
  )
}
