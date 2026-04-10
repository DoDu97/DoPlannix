'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useCart, useCartCount, useCartTotal } from '@/lib/cart'
import { formatPrice } from '@/lib/data'

export default function CartDrawer() {
  const { state, dispatch } = useCart()
  const count = useCartCount()
  const total = useCartTotal()
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'done'>(
    'cart'
  )
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    promoCode: '',
    consent: false,
  })
  const [showPromo, setShowPromo] = useState(false)
  const [promoApplied, setPromoApplied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  /* lock body scroll when open */
  useEffect(() => {
    document.body.style.overflow = state.isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [state.isOpen])

  /* reset checkout step when drawer closes */
  useEffect(() => {
    if (!state.isOpen) {
      setTimeout(() => setCheckoutStep('cart'), 350)
    }
  }, [state.isOpen])

  const items = Object.values(state.items)

  const totalOriginal = Object.values(state.items).reduce(
    (sum, item) => sum + item.originalPrice * item.qty,
    0
  )
  const totalSavings = totalOriginal - total

  const handleApplyPromo = () => {
    if (form.promoCode.trim()) setPromoApplied(true)
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setCheckoutError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: item.qty,
            img: item.img,
          })),
          customerEmail: form.email,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Nepodařilo se spustit platbu.')
      }

      window.location.href = data.url
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Neočekávaná chyba. Zkus to prosím znovu.')
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* overlay */}
      <div
        className={`drawer-overlay ${state.isOpen ? 'open' : ''}`}
        onClick={() => dispatch({ type: 'CLOSE' })}
      />

      {/* drawer */}
      <div className={`cart-drawer ${state.isOpen ? 'open' : ''}`}>
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stroke">
          <h3 className="text-[1.05rem] font-bold">
            {checkoutStep === 'cart'
              ? `Košík${count > 0 ? ` (${count})` : ''}`
              : checkoutStep === 'form'
              ? 'Dokončení objednávky'
              : 'Objednávka přijata'}
          </h3>
          <button
            onClick={() => dispatch({ type: 'CLOSE' })}
            className="w-9 h-9 rounded-lg border border-stroke bg-transparent text-dim cursor-pointer flex items-center justify-center text-lg transition-all duration-200 hover:text-white hover:border-[#555]"
          >
            ×
          </button>
        </div>

        {/* ─── CART VIEW ─── */}
        {checkoutStep === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 flex-1 py-16 text-center text-dim">
                  <span className="text-4xl">🛒</span>
                  <p className="text-[0.9rem]">Košík je prázdný</p>
                  <button
                    onClick={() => dispatch({ type: 'CLOSE' })}
                    className="mt-1 text-gold text-sm underline underline-offset-4 hover:text-gold-glow transition-colors cursor-pointer bg-transparent border-0"
                  >
                    Prohlédnout produkty
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-raised border border-stroke rounded-xl p-3"
                    style={{ animation: 'fadeUp 0.25s ease' }}
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="object-contain rounded-lg bg-[#111] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.85rem] font-semibold truncate">
                        {item.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[0.8rem] text-gold font-semibold">
                          {formatPrice(item.price)} Kč
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-[0.72rem] text-dim line-through">
                            {formatPrice(item.originalPrice)} Kč
                          </span>
                        )}
                      </div>
                    </div>
                    {/* qty controls */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          dispatch({ type: 'DECREMENT', id: item.id })
                        }
                        className="w-7 h-7 rounded-md bg-stroke border-0 text-white cursor-pointer flex items-center justify-center text-sm transition-colors hover:bg-gold hover:text-black"
                      >
                        −
                      </button>
                      <span className="text-[0.85rem] font-semibold w-5 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          dispatch({ type: 'INCREMENT', id: item.id })
                        }
                        className="w-7 h-7 rounded-md bg-stroke border-0 text-white cursor-pointer flex items-center justify-center text-sm transition-colors hover:bg-gold hover:text-black"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        dispatch({ type: 'REMOVE', id: item.id })
                      }
                      className="text-[#555] hover:text-[#ff6b6b] transition-colors text-base bg-transparent border-0 cursor-pointer px-1"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-stroke px-6 py-5 flex flex-col gap-3">
                {totalSavings > 0 && (
                  <div className="flex justify-between items-center text-[0.82rem]">
                    <span className="text-dim">Původní cena</span>
                    <span className="text-dim line-through">{formatPrice(totalOriginal)} Kč</span>
                  </div>
                )}
                {totalSavings > 0 && (
                  <div className="flex justify-between items-center text-[0.82rem]">
                    <span className="text-[#4caf78]">Ušetříš</span>
                    <span className="text-[#4caf78] font-semibold">−{formatPrice(totalSavings)} Kč</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-[0.9rem] text-dim">Celkem</span>
                  <strong className="text-[1.3rem] font-black">
                    {formatPrice(total)} Kč
                  </strong>
                </div>
                <button
                  onClick={() => setCheckoutStep('form')}
                  className="btn-gold w-full py-4 text-[1rem] justify-center"
                >
                  Pokračovat k platbě →
                </button>
                <p className="flex items-center justify-center gap-1.5 text-[0.75rem] text-dim">
                  🔒 Bezpečná platba · Okamžitý přístup
                </p>
              </div>
            )}
          </>
        )}

        {/* ─── CHECKOUT FORM ─── */}
        {checkoutStep === 'form' && (
          <form
            onSubmit={handleCheckout}
            className="flex flex-col flex-1 overflow-y-auto"
          >
            <div className="flex-1 px-6 py-5 flex flex-col gap-4">
              {/* order summary */}
              <div className="bg-raised border border-stroke rounded-xl p-4 flex flex-col gap-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-[0.85rem]"
                  >
                    <span className="text-[#ccc]">
                      {item.name}
                      {item.qty > 1 && ` ×${item.qty}`}
                    </span>
                    <span className="font-semibold">
                      {formatPrice(item.price * item.qty)} Kč
                    </span>
                  </div>
                ))}
                {totalSavings > 0 && (
                  <div className="flex justify-between text-[0.82rem]">
                    <span className="text-[#4caf78]">Sleva</span>
                    <span className="text-[#4caf78]">−{formatPrice(totalSavings)} Kč</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-stroke mt-1 pt-2 font-bold">
                  <span>Celkem</span>
                  <span className="text-gold">{formatPrice(total)} Kč</span>
                </div>
              </div>

              {/* fields */}
              <div className="flex flex-col gap-3">
                {/* jméno + příjmení */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[0.8rem] text-dim mb-1.5 font-medium">
                      Jméno <span className="text-[#ff6b6b]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, firstName: e.target.value }))
                      }
                      required
                      placeholder="Jan"
                      className="w-full bg-noir border border-stroke rounded-xl px-4 py-3 text-[0.9rem] text-white placeholder-[#444] outline-none transition-colors focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.8rem] text-dim mb-1.5 font-medium">
                      Příjmení <span className="text-[#ff6b6b]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, lastName: e.target.value }))
                      }
                      required
                      placeholder="Novák"
                      className="w-full bg-noir border border-stroke rounded-xl px-4 py-3 text-[0.9rem] text-white placeholder-[#444] outline-none transition-colors focus:border-gold"
                    />
                  </div>
                </div>

                {/* e-mail */}
                <div>
                  <label className="block text-[0.8rem] text-dim mb-1.5 font-medium">
                    E-mail <span className="text-[#ff6b6b]">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                    placeholder="jan@email.cz"
                    className="w-full bg-noir border border-stroke rounded-xl px-4 py-3 text-[0.9rem] text-white placeholder-[#444] outline-none transition-colors focus:border-gold"
                  />
                  <p className="text-[0.72rem] text-dim mt-1">Šablona bude doručena na tento e-mail.</p>
                </div>

                {/* slevový kód */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowPromo((v) => !v)}
                    className="text-[0.8rem] text-dim hover:text-gold transition-colors bg-transparent border-0 cursor-pointer flex items-center gap-1"
                  >
                    <span>{showPromo ? '−' : '+'}</span>
                    Mám slevový kód
                  </button>
                  {showPromo && (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        value={form.promoCode}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, promoCode: e.target.value.toUpperCase() }))
                        }
                        placeholder="KÓDSLEVA"
                        className="flex-1 bg-noir border border-stroke rounded-xl px-4 py-2.5 text-[0.85rem] text-white placeholder-[#444] outline-none transition-colors focus:border-gold"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-4 py-2.5 rounded-xl border border-gold text-gold text-[0.82rem] font-semibold bg-transparent cursor-pointer hover:bg-[var(--gold-dim-bg)] transition-colors"
                      >
                        {promoApplied ? '✓' : 'Použít'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* způsob platby */}
              <div>
                <label className="block text-[0.8rem] text-dim mb-2 font-medium">
                  Způsob platby
                </label>
                <div className="flex items-center gap-2 bg-noir border border-stroke rounded-xl px-4 py-3">
                  <svg width="28" height="20" viewBox="0 0 38 24" fill="none" className="shrink-0">
                    <rect width="38" height="24" rx="4" fill="#1A1F71"/>
                    <path d="M15.5 16.5h-3l1.88-9h3L15.5 16.5zM25.1 7.8c-.6-.23-1.53-.48-2.7-.48-2.98 0-5.07 1.58-5.1 3.85-.02 1.67 1.5 2.6 2.63 3.16 1.17.57 1.56.93 1.55 1.44-.01.78-.93 1.13-1.79 1.13-1.2 0-1.84-.18-2.83-.62l-.39-.18-.42 2.6c.7.32 2 .6 3.34.61 3.15 0 5.2-1.56 5.22-3.97.01-1.32-.79-2.33-2.52-3.16-.05-.03-1.05-.5-1.05-1.06 0-.36.34-.74 1.06-.74.61-.01 1.05.13 1.39.27l.17.08.4-2.43zM29.7 7.53h-2.33c-.72 0-1.26.21-1.58.96l-4.47 10.73h3.16s.52-1.44.63-1.76l3.85.01c.09.41.37 1.75.37 1.75h2.79l-2.42-11.69zM26 14.53c.25-.67 1.2-3.26 1.2-3.26-.02.03.25-.68.4-1.12l.2 1.01.7 3.37H26z" fill="white"/>
                  </svg>
                  <svg width="28" height="20" viewBox="0 0 38 24" fill="none" className="shrink-0">
                    <rect width="38" height="24" rx="4" fill="#EB001B" fillOpacity="0.1" stroke="#2a2a2a"/>
                    <circle cx="15" cy="12" r="7" fill="#EB001B"/>
                    <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
                    <path d="M19 7.2a7 7 0 0 1 0 9.6A7 7 0 0 1 19 7.2z" fill="#FF5F00"/>
                  </svg>
                  <span className="text-[0.82rem] text-dim ml-1">Platební karta</span>
                  <span className="ml-auto text-[0.72rem] text-[#4caf78] font-medium">✓ Aktivní</span>
                </div>
              </div>

              {/* GDPR souhlas */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, consent: e.target.checked }))
                    }
                    required
                    className="sr-only"
                  />
                  <div
                    className="w-4 h-4 rounded border transition-colors"
                    style={{
                      background: form.consent ? 'var(--color-gold, #c9a84c)' : 'transparent',
                      borderColor: form.consent ? 'var(--color-gold, #c9a84c)' : '#2a2a2a',
                    }}
                  >
                    {form.consent && (
                      <svg viewBox="0 0 12 12" fill="none" className="w-full h-full p-0.5">
                        <path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[0.75rem] text-dim leading-relaxed">
                  Souhlasím se{' '}
                  <span className="text-gold underline underline-offset-2 cursor-pointer">zpracováním osobních údajů</span>
                  {' '}a{' '}
                  <span className="text-gold underline underline-offset-2 cursor-pointer">obchodními podmínkami</span>.
                  {' '}Tento souhlas je nezbytný pro dokončení objednávky. <span className="text-[#ff6b6b]">*</span>
                </span>
              </label>
            </div>

            <div className="border-t border-stroke px-6 py-5 flex flex-col gap-2">
              {/* guarantee badge */}
              <div className="flex items-center gap-2 border border-[rgba(201,168,76,0.3)] rounded-xl px-3 py-2.5 mb-1" style={{ background: 'var(--gold-dim-bg)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold shrink-0">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-[0.73rem] font-semibold text-gold">30denní garance vrácení peněz</span>
              </div>
              {checkoutError && (
                <div className="rounded-xl border border-[rgba(255,107,107,0.4)] bg-[rgba(255,107,107,0.08)] px-4 py-3 text-[0.78rem] text-[#ff6b6b]">
                  ⚠ {checkoutError}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-gold w-full py-4 text-[1rem] justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Přesměrování na platbu…
                  </span>
                ) : (
                  `Zaplatit ${formatPrice(total)} Kč`
                )}
              </button>
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="text-dim text-sm text-center hover:text-white transition-colors bg-transparent border-0 cursor-pointer py-1"
              >
                ← Zpět do košíku
              </button>
            </div>
          </form>
        )}

        {/* ─── DONE ─── */}
        {checkoutStep === 'done' && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center text-3xl">
              ✓
            </div>
            <h4 className="font-bold text-lg text-gold-glow">
              Objednávka přijata!
            </h4>
            <p className="text-dim text-[0.9rem] leading-relaxed max-w-xs">
              Platba proběhla úspěšně. Odkaz na šablonu ti pošleme na zadaný e-mail. Děkujeme!
            </p>
            <button
              onClick={() => dispatch({ type: 'CLOSE' })}
              className="btn-gold px-7 py-3 mt-2"
            >
              Zavřít
            </button>
          </div>
        )}
      </div>
    </>
  )
}
