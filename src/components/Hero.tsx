'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  /* parallax fade on scroll — desktop only */
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return
    const hero = heroRef.current
    if (!hero) return
    const onScroll = () => {
      const scrollY = window.scrollY
      const heroH = hero.offsetHeight
      if (scrollY < heroH) {
        const progress = scrollY / heroH
        hero.style.opacity = String(1 - progress * 1.2)
        hero.style.transform = `scale(${1 - progress * 0.04}) translateY(${scrollY * 0.15}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* hero image entrance */
  useEffect(() => {
    const t = setTimeout(() => {
      imgRef.current?.classList.add('visible')
    }, 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-14 pt-28 pb-16 md:sticky md:top-0 z-10 overflow-hidden"
      >
        {/* ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)',
          }}
        />

        {/* pill badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
          style={{ animation: 'fadeUp 0.6s 0.1s ease both' }}
        >
          <div className="gold-badge">
            <Image
              src="/images/notion-logo.png"
              alt="Notion"
              width={18}
              height={18}
              className="w-[18px] h-[18px] object-contain"
            />
            Notion Templates
          </div>
          <div className="gold-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            30-day money-back guarantee
          </div>
        </div>

        {/* headline */}
        <h1
          className="font-black leading-[1.08] tracking-[-0.03em] mb-5 relative z-10"
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 5.2rem)',
            animation: 'fadeUp 0.7s 0.25s ease both',
          }}
        >
          Take control of your{' '}
          <span className="text-gold-glow">life,&nbsp;finances,</span>
          <br />and <span className="text-gold-glow">business.</span>
        </h1>

        {/* sub */}
        <p
          className="text-dim leading-relaxed max-w-4xl mb-9 relative z-10"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            animation: 'fadeUp 0.7s 0.4s ease both',
          }}
        >
          Premium templates that help you bring order to everyday chaos and keep
          everything important in one place. Simple, fast, and without unnecessary
          complexity.
        </p>

        {/* CTA row */}
        <div
          className="flex flex-wrap gap-3 items-center justify-center relative z-10"
          style={{ animation: 'fadeUp 0.7s 0.55s ease both' }}
        >
          <a
            href="#products"
            className="btn-gold text-[0.95rem] px-8 py-3.5"
          >
            View products ↓
          </a>
        </div>
      </section>

      {/* ─── HERO VISUAL ─── */}
      <div className="relative z-10 -mt-12 px-6 md:px-14 flex justify-center">
        <div className="relative">
          {/* glow behind image */}
          <div
            className="absolute inset-[-15%] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.14) 0%, transparent 65%)',
            }}
          />
          {/* bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)',
            }}
          />
          <a href="#products" aria-label="View products" className="block">
            <Image
              ref={imgRef as React.RefObject<HTMLImageElement>}
              src="/images/product_bundle.png"
              alt="DoPlannix Notion Templates"
              width={860}
              height={540}
              priority
              className="relative z-[2] rounded-2xl transition-all duration-700 [data-animate]"
              style={{
                maxWidth: 'min(860px, 96vw)',
                filter:
                  'drop-shadow(0 40px 100px rgba(0,0,0,0.9)) drop-shadow(0 0 60px rgba(201,168,76,0.08))',
                opacity: 0,
                transform: 'translateY(40px)',
                transition:
                  'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)',
              }}
              onLoad={(e) => {
                const img = e.currentTarget
                setTimeout(() => {
                  img.style.opacity = '1'
                  img.style.transform = 'translateY(0)'
                }, 400)
              }}
            />
          </a>
        </div>
      </div>
    </>
  )
}
