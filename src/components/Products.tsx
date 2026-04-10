'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PRODUCTS, formatPrice } from '@/lib/data'
import { useCart } from '@/lib/cart'

function ProductCard({
  product,
  added,
  onAdd,
}: {
  product: (typeof PRODUCTS)[number]
  added: boolean
  onAdd: () => void
}) {
  return (
    <div
      data-animate
      className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.6)] bg-card ${
        product.featured
          ? 'border-[rgba(201,168,76,0.5)]'
          : 'border-stroke hover:border-[rgba(201,168,76,0.4)]'
      }`}
    >
      {/* image */}
      <div className="flex items-center justify-center px-10 pt-8 pb-6" style={{ background: '#111' }}>
        <Image
          src={product.img}
          alt={product.name}
          width={200}
          height={200}
          className="object-contain rounded-xl transition-transform duration-500 group-hover:scale-110"
          style={{ filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.7))', maxWidth: '180px' }}
        />
      </div>

      {/* body */}
      <div className="flex flex-col flex-1 p-6">
        <p className="text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-gold mb-1.5">{product.tag}</p>
        <h3 className="font-bold text-[1.15rem] leading-tight mb-2">{product.name}</h3>
        <p className="text-dim text-[0.875rem] leading-relaxed mb-4 flex-1">{product.desc}</p>

        <ul className="flex flex-col gap-1.5 mb-5">
          {product.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-[0.8rem] text-[#aaa]">
              <span className="text-gold font-bold flex-shrink-0">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-stroke pt-5">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[0.78rem] text-red-400 line-through">{formatPrice(product.originalPrice)} Kč</span>
              <span className="text-[0.75rem] font-black tracking-wide px-2 py-0.5 rounded-full bg-gold text-black">
                −{Math.round((1 - product.price / product.originalPrice) * 100)} %
              </span>
            </div>
            <span className="text-[1.4rem] font-black leading-tight">
              {formatPrice(product.price)}{' '}
              <span className="text-[0.9rem] font-semibold text-dim">Kč</span>
            </span>
          </div>
          <button
            onClick={onAdd}
            className={`flex items-center gap-1.5 text-[0.85rem] font-bold px-5 py-2.5 rounded-xl border-0 cursor-pointer flex-shrink-0 transition-all duration-300 ${
              added
                ? 'bg-[#2a5c2a] text-[#7fff7f]'
                : 'bg-gold text-black hover:bg-gold-glow hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,168,76,0.35)]'
            }`}
          >
            {added ? '✓ Přidáno' : '+ Do košíku'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const { dispatch } = useCart()
  const [added, setAdded] = useState<Record<number, boolean>>({})

  const handleAdd = (id: number) => {
    const product = PRODUCTS.find((p) => p.id === id)
    if (!product) return
    dispatch({ type: 'ADD', product })
    setAdded((prev) => ({ ...prev, [id]: true }))
    setTimeout(() => setAdded((prev) => ({ ...prev, [id]: false })), 2000)
  }

  const bundle = PRODUCTS.find((p) => p.featured)!
  const singles = PRODUCTS.filter((p) => !p.featured)

  return (
    <section
      id="products"
      className="relative z-10 py-20 md:py-28 px-6 md:px-14"
      style={{ background: '#0a0a0a' }}
    >
      {/* header */}
      <div className="text-center mb-14">
        <p className="section-label">Naše produkty</p>
        <h2
          className="font-black tracking-tight leading-[1.12] mb-3"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          Vyber si svůj systém
        </h2>
        <p className="text-dim text-base max-w-md mx-auto">
          Každý template je navržen pro jeden konkrétní cíl. Nebo vezmi vše najednou a ušetři.
        </p>
      </div>

      {/* guarantee badge */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2.5 border border-[rgba(201,168,76,0.3)] rounded-xl px-5 py-2.5" style={{ background: 'var(--gold-dim-bg)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold shrink-0">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="text-[0.78rem] font-semibold text-gold">30denní garance vrácení peněz</span>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto flex flex-col gap-5">

        {/* ─── BUNDLE — full width, horizontal layout ─── */}
        <div
          data-animate
          className="group relative flex flex-col md:flex-row rounded-2xl border border-[rgba(201,168,76,0.5)] overflow-hidden bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(201,168,76,0.15)]"
        >
          {/* badge */}
          <div className="absolute top-4 right-4 z-10 text-[0.6rem] font-black tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-gold text-black">
            Nejlepší hodnota
          </div>

          {/* image side */}
          <div
            className="flex items-center justify-center px-12 py-10 md:w-[340px] flex-shrink-0"
            style={{ background: '#111' }}
          >
            <Image
              src={bundle.img}
              alt={bundle.name}
              width={300}
              height={300}
              className="object-contain rounded-xl transition-transform duration-500 group-hover:scale-110"
              style={{
                filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(201,168,76,0.12))',
                maxWidth: '260px',
              }}
            />
          </div>

          {/* content side */}
          <div className="flex flex-col flex-1 p-8 md:p-10">
            <p className="text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-gold mb-2">
              {bundle.tag}
            </p>
            <h3 className="font-black text-[1.6rem] md:text-[2rem] leading-tight tracking-tight mb-3">
              {bundle.name}
            </h3>
            <p className="text-dim text-[0.95rem] leading-relaxed mb-6 max-w-lg">
              {bundle.desc}
            </p>

            {/* features 2-col on wide */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-8">
              {bundle.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[0.85rem] text-[#aaa]">
                  <span className="text-gold font-bold flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* price + CTA */}
            <div className="flex items-center justify-between gap-3 mt-auto border-t border-stroke pt-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[0.78rem] text-red-400 line-through">
                    {formatPrice(bundle.originalPrice)} Kč
                  </span>
                  <span className="text-[0.75rem] font-black tracking-wide px-2 py-0.5 rounded-full bg-gold text-black">
                    −60 %
                  </span>
                </div>
                <span className="text-[1.4rem] font-black leading-tight">
                  {formatPrice(bundle.price)}{' '}
                  <span className="text-[0.9rem] font-semibold text-dim">Kč</span>
                </span>
                <span className="text-[0.75rem] text-gold mt-0.5">
                  Ušetříš {formatPrice(bundle.originalPrice - bundle.price)} Kč oproti koupi zvlášť
                </span>
              </div>
              <button
                onClick={() => handleAdd(bundle.id)}
                className={`flex items-center gap-1.5 text-[0.85rem] font-bold px-5 py-2.5 rounded-xl border-0 cursor-pointer flex-shrink-0 transition-all duration-300 ${
                  added[bundle.id]
                    ? 'bg-[#2a5c2a] text-[#7fff7f]'
                    : 'bg-gold text-black hover:bg-gold-glow hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,168,76,0.35)]'
                }`}
              >
                {added[bundle.id] ? '✓ Přidáno' : '+ Do košíku'}
              </button>
            </div>
          </div>
        </div>

        {/* ─── 3 individual products ─── */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {singles.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              added={!!added[product.id]}
              onAdd={() => handleAdd(product.id)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
