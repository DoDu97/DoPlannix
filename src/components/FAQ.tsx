'use client'

import { useState } from 'react'
import { FAQ_ITEMS } from '@/lib/data'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="relative z-10 py-20 md:py-28 px-6 md:px-14"
      style={{ background: '#141414' }}
    >
      {/* header */}
      <div className="text-center mb-14">
        <p className="section-label">FAQ</p>
        <h2
          className="font-black tracking-tight leading-[1.12] mb-3"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          Časté otázky
        </h2>
        <p className="text-dim text-base">
          Nenašel jsi odpověď?{' '}
          <a
            href="mailto:hello@doplannix.cz"
            className="text-gold underline underline-offset-4 hover:text-gold-glow transition-colors"
          >
            Napiš nám
          </a>
          .
        </p>
      </div>

      {/* accordion */}
      <div className="max-w-[1100px] mx-auto border border-stroke rounded-2xl overflow-hidden bg-raised">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i
          return (
            <div
              key={i}
              data-animate
              className={`border-b last:border-b-0 border-stroke transition-opacity duration-500`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full bg-transparent border-0 text-white font-semibold text-base text-left px-6 py-5 flex justify-between items-center gap-4 cursor-pointer transition-colors duration-200 hover:text-gold-glow"
              >
                {item.q}
                {/* +/× icon */}
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: isOpen
                      ? 'rgba(201,168,76,0.6)'
                      : '#2a2a2a',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <line
                      x1="6"
                      y1="1"
                      x2="6"
                      y2="11"
                      stroke={isOpen ? '#c9a84c' : '#888'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="6"
                      x2="11"
                      y2="6"
                      stroke={isOpen ? '#c9a84c' : '#888'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>

              {/* answer — grid-rows animation */}
              <div
                className="overflow-hidden transition-all duration-350"
                style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.35s ease',
                }}
              >
                <div className="overflow-hidden">
                  <p className="text-dim text-[0.9rem] leading-[1.8] px-6 pb-5">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
