'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useCart, useCartCount } from '@/lib/cart'

export default function Nav() {
  const { dispatch } = useCart()
  const count = useCartCount()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[72px] px-6 md:px-14 transition-all duration-300 ${
        scrolled
          ? 'bg-noir/90 backdrop-blur-xl border-b border-stroke'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2.5 no-underline group">
        <Image
          src="/images/dp_black.png"
          alt="DoPlannix"
          width={36}
          height={36}
          className="h-9 w-auto"
          style={{ filter: 'invert(1) brightness(0.85)' }}
        />
        <span className="text-[1.1rem] font-bold tracking-[0.05em] text-white">
          DoPlannix
        </span>
      </a>

      {/* CTA + Cart */}
      <div className="flex items-center gap-3">
        <a
          href="#products"
          className="btn-gold text-sm px-5 py-2.5"
        >
          Buy →
        </a>
        <button
          onClick={() => dispatch({ type: 'OPEN' })}
          className="relative w-11 h-11 rounded-xl border border-stroke bg-transparent text-white flex items-center justify-center text-lg cursor-pointer transition-all duration-300 hover:border-gold hover:text-gold"
          aria-label="Cart"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-gold text-black w-5 h-5 rounded-full text-[0.6rem] font-bold flex items-center justify-center leading-none">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
