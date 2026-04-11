'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { TESTIMONIALS } from '@/lib/data'

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(3)

  /* calculate perView on resize */
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else setPerView(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const total = TESTIMONIALS.length
  const maxIndex = Math.max(0, total - perView)

  const goTo = useCallback(
    (idx: number) => setCurrent(Math.max(0, Math.min(idx, maxIndex))),
    [maxIndex]
  )

  /* translate track */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.children[0]?.getBoundingClientRect().width ?? 0
    const gap = 20
    track.style.transform = `translateX(-${current * (cardWidth + gap)}px)`
  }, [current, perView])

  const dotCount = maxIndex + 1

  return (
    <section
      id="testimonials"
      className="relative z-10 py-20 md:py-28 px-6 md:px-14"
      style={{ background: '#0a0a0a' }}
    >
      {/* header */}
      <div className="text-center mb-14">
        <p className="section-label">What customers say</p>
        <h2
          className="font-black tracking-tight leading-[1.12] mb-3"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          Results speak for themselves
        </h2>
        <p className="text-dim text-base max-w-md mx-auto">
          Join the people who stopped improvising and started having a system.
        </p>
      </div>

      {/* slider */}
      <div className="max-w-[1040px] mx-auto">
        <div className="overflow-hidden" data-animate>
          <div
            ref={trackRef}
            className="flex gap-5"
            style={{
              transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
              willChange: 'transform',
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="flex-shrink-0 border border-stroke rounded-2xl p-7 flex flex-col gap-4 transition-colors duration-300 hover:border-[rgba(201,168,76,0.3)]"
                style={{
                  background: '#141414',
                  width: `calc((100% - ${(perView - 1) * 20}px) / ${perView})`,
                }}
              >
                {/* stars */}
                <div className="text-gold tracking-[2px] text-[0.9rem]">
                  ★★★★★
                </div>
                {/* quote */}
                <p className="text-[#ccc] text-[0.875rem] leading-[1.75] italic flex-1">
                  {t.quote}
                </p>
                {/* author */}
                <div className="flex items-center gap-3 border-t border-stroke pt-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[0.8rem] font-bold text-gold flex-shrink-0"
                    style={{
                      background: 'rgba(201,168,76,0.12)',
                      border: '1px solid rgba(201,168,76,0.3)',
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[0.85rem] font-bold">{t.name}</div>
                    <div className="text-[0.75rem] text-dim">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="w-11 h-11 rounded-xl border border-stroke text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:enabled:border-gold hover:enabled:text-gold disabled:opacity-30 disabled:cursor-default bg-card"
            aria-label="Previous"
          >
            ←
          </button>

          {/* dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-2 rounded-full border-0 cursor-pointer transition-all duration-300 p-0"
                style={{
                  width: i === current ? 26 : 8,
                  background: i === current ? '#c9a84c' : '#2a2a2a',
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(current + 1)}
            disabled={current >= maxIndex}
            className="w-11 h-11 rounded-xl border border-stroke text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:enabled:border-gold hover:enabled:text-gold disabled:opacity-30 disabled:cursor-default bg-card"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
