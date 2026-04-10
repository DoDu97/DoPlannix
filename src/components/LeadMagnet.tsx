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
        <div className="gold-badge mb-7 mx-auto w-fit">✦ Zdarma pro tebe</div>

        <h2
          className="font-black tracking-tight leading-[1.1] mb-4"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)' }}
        >
          Získej{' '}
          <span className="text-gold-glow">mini šablonu</span>
          <br />
          dřív než ostatní.
        </h2>

        <p className="text-dim text-base leading-relaxed mb-6 max-w-md mx-auto">
          Přidej se k lidem, kteří mají systém. Pošleme ti zdarma startovací
          Notion template a dáme ti vědět jako první, až vydáme nový produkt
          nebo slevu.
        </p>

        {/* perks */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            'Notion template zdarma',
            'Bez spamu, kdykoli odhlášení',
            'Exkluzivní nabídky jako první',
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
            <span>Díky! Brzy ti pošleme šablonu na e-mail.</span>
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
              placeholder="tvuj@email.cz"
              required
              className="flex-1 bg-noir border border-stroke rounded-xl px-5 py-3.5 text-[0.95rem] text-white placeholder-[#444] outline-none transition-colors duration-200 focus:border-gold min-w-0"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-gold text-[0.92rem] px-6 py-3.5 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? '…' : 'Chci šablonu →'}
            </button>
          </form>
        )}

        {status !== 'done' && (
          <p className="text-[0.75rem] text-[#555]">
            Žádný spam. Odhlásit se můžeš kdykoliv jedním klikem.
          </p>
        )}
      </div>
    </section>
  )
}
