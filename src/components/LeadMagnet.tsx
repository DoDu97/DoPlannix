'use client'

import { useState } from 'react'

export default function LeadMagnet() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setTimeout(() => {
      setStatus('done')
      setEmail('')
    }, 1200)
  }

  return (
    <section
      id="newsletter"
      className="relative z-10 py-20 md:py-28 px-6 md:px-14 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />

      <div
        className="relative z-10 max-w-xl mx-auto text-center"
        data-animate
      >
        <div className="gold-badge mb-7 mx-auto w-fit">✦ Free for you</div>

        <h2
          className="font-black tracking-tight leading-[1.1] mb-4"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)' }}
        >
          Get a{' '}
          <span className="text-gold-glow">free mini template</span>
          <br />
          before everyone else.
        </h2>

        <p className="text-dim text-base leading-relaxed mb-6 max-w-md mx-auto">
          Join the people who have a system. We&apos;ll send you a free starter
          Notion template and be the first to let you know when we release a new
          product or discount.
        </p>

        {/* perks */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            'Free Notion template',
            'No spam, unsubscribe anytime',
            'Exclusive offers first',
          ].map((p) => (
            <span
              key={p}
              className="flex items-center gap-1.5 text-[0.82rem] text-[#aaa]"
            >
              <span className="text-gold font-bold">✓</span>
              {p}
            </span>
          ))}
        </div>

        {status === 'done' ? (
          <div className="flex items-center justify-center gap-2 text-gold font-semibold text-base">
            <span>✓</span>
            <span>Thanks! We&apos;ll send you the template via email soon.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex gap-2.5 max-w-[460px] mx-auto mb-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-noir border border-stroke rounded-xl px-5 py-3.5 text-[0.95rem] text-white placeholder-[#444] outline-none transition-colors duration-200 focus:border-gold min-w-0"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-gold text-[0.92rem] px-6 py-3.5 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? '…' : 'Get the template →'}
            </button>
          </form>
        )}

        {status !== 'done' && (
          <p className="text-[0.75rem] text-[#555]">
            No spam. Unsubscribe anytime with one click.
          </p>
        )}
      </div>
    </section>
  )
}
