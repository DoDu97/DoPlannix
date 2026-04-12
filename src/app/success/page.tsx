import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Successful — DoPlannix',
  description: 'Your order is confirmed. We will send your template download link shortly.',
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
        Payment{' '}
        <span className="text-gold-glow">successful!</span>
      </h1>

      <p className="text-dim leading-relaxed max-w-md mb-2" style={{ fontSize: '1rem' }}>
        Thank you for your purchase. Your template download link has been sent to the email
        address provided at checkout — usually within a few minutes.
      </p>
      <p className="text-dim text-[0.85rem] mb-10">
        Please also check your <strong className="text-[#ccc]">Spam / Promotions</strong> folder just in case.
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
        30-day money-back guarantee — no questions asked
      </div>

      {/* CTA */}
      <Link href="/" className="btn-gold px-8 py-3.5 text-[0.95rem]">
        ← Back to homepage
      </Link>
    </main>
  )
}
