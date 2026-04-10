'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { count: 500, suffix: '+', label: 'spokojených zákazníků' },
  { count: 40, suffix: 'h+', label: 'ušetřeného času na nastavování' },
  { count: 3, suffix: '', label: 'komplexní systémy v jednom místě' },
  { count: 100, suffix: '%', label: 'připraveno k použití od prvního dne' },
]

function useCounter(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            el.textContent = String(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return ref
}

function StatItem({
  count,
  suffix,
  label,
}: {
  count: number
  suffix: string
  label: string
}) {
  const numRef = useCounter(count)

  return (
    <div className="flex flex-col items-center text-center px-6 py-2 relative [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:right-0 [&:not(:last-child)]:after:top-[15%] [&:not(:last-child)]:after:bottom-[15%] [&:not(:last-child)]:after:w-px [&:not(:last-child)]:after:bg-stroke">
      <div
        className="font-black text-gold leading-none mb-1.5 tabular-nums"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
      >
        <span ref={numRef}>0</span>
        <span>{suffix}</span>
      </div>
      <div className="text-[0.8rem] text-dim font-medium leading-snug max-w-[120px]">
        {label}
      </div>
    </div>
  )
}

export default function StatsStrip() {
  return (
    <div className="relative z-10 bg-card border-y border-stroke py-10 px-6 md:px-14">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 max-w-4xl mx-auto">
        {STATS.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </div>
  )
}
