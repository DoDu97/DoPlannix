# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page pro prodej Notion šablon — **DoPlannix**. Next.js 15 + Tailwind CSS v4 + React 19 + TypeScript.

> `index.html` v rootu je původní prototyp — slouží jako referenční návrh, není aktivní.

## Running the Project

```bash
npm run dev    # http://localhost:3000
npm run build  # produkční build
npm start      # spustí produkční build
```

## Architecture

### Struktura souborů

```
src/
├── app/
│   ├── layout.tsx          — Root layout: Inter font (next/font), CartProvider, metadata
│   ├── page.tsx            — Hlavní stránka — skládá sekce v pořadí sales funnelu
│   └── globals.css         — Tailwind v4 @import + @theme tokens + base styles + utility třídy
├── components/
│   ├── AnimationInit.tsx   — IntersectionObserver pro [data-animate] elementy (fire-once)
│   ├── SmoothScroll.tsx    — Custom smooth scroll pro #anchor odkazy (1200ms, easeInOutCubic)
│   ├── Nav.tsx             — Fixed nav, scroll-based backdrop blur, cart badge
│   ├── Hero.tsx            — Sticky hero s parallax fade, Notion logo badge
│   ├── StatsStrip.tsx      — Animované čítače (useCounter hook s IntersectionObserver)
│   ├── Benefits.tsx        — 6 výhod v auto-fit mřížce
│   ├── Audience.tsx        — 3 cílové skupiny
│   ├── Products.tsx        — Bundle (full-width, první) + 3 individuální karty; hover zoom na obrázku
│   ├── Testimonials.tsx    — Slider s perView 1/2/3 podle šířky, dot navigace
│   ├── FAQ.tsx             — Accordion, výška animována přes grid-template-rows: 0fr → 1fr
│   ├── LeadMagnet.tsx      — E-mail capture (setTimeout simulace)
│   ├── CartDrawer.tsx      — Slide-in košík + 3-krokový checkout (cart → form → done)
│   └── Footer.tsx          — Logo + copyright
└── lib/
    ├── data.ts             — PRODUCTS, TESTIMONIALS, FAQ_ITEMS, formatPrice()
    └── cart.tsx            — React Context + useReducer (ADD/REMOVE/INCREMENT/DECREMENT/OPEN/CLOSE)
```

### Pořadí sekcí — sales funnel
`Nav` → `Hero` (sticky + parallax) → `StatsStrip` → `Benefits` → `Audience` → `Products` → `Testimonials` → `FAQ` → `LeadMagnet` → `Footer` → `CartDrawer` (fixed overlay)

### Pozadí sekcí — vzor střídání
- `#0a0a0a` (noir): Hero, Benefits, Products, FAQ
- `#141414` (card): StatsStrip, Audience, Testimonials, LeadMagnet

### Tailwind v4 — design tokeny (`@theme` v globals.css)
```
--color-noir        #0a0a0a   → bg-noir
--color-card        #141414   → bg-card
--color-raised      #1e1e1e   → bg-raised
--color-stroke      #2a2a2a   → border-stroke
--color-dim         #888888   → text-dim
--color-gold        #c9a84c   → text-gold, bg-gold, border-gold
--color-gold-glow   #e8c97a   → text-gold-glow
```

CSS proměnné v `:root` (pro hodnoty mimo Tailwind utility):
```
--gold-dim-bg       rgba(201,168,76,0.12)   — zlaté průhledné pozadí (badge, ikony)
--gold-border       rgba(201,168,76,0.3)    — zlatý rámeček
--gold-glow-shadow  rgba(201,168,76,0.25)   — shadow pro CTA hover
--ease              cubic-bezier(0.4,0,0.2,1)
```

### Utility třídy (globals.css `@layer`)
- `.gold-badge` — zlatý pill pro labely (hero badge, lead magnet)
- `.section-label` — zlatý uppercase label nad každým h2
- `.btn-gold` — zlaté CTA tlačítko (hover: gold-glow + translateY(-2px) + shadow)
- `.drawer-overlay` / `.cart-drawer` — cart slide-in systém
- `.toast` — notifikační toast

### Typografie
- Font: **Inter** přes `next/font/google`, variable `--font-inter`
- H2 sekce: `font-black`, `tracking-tight`, `clamp(1.8rem, 4vw, 2.8rem)`
- Fluid sizing všude přes `clamp()`

### Klíčové JS systémy

**Scroll animace:** `AnimationInit.tsx` — IntersectionObserver sleduje `[data-animate]`. Přidá `.visible` (opacity + translateY → 0), poté se odpojí. Zpoždění přes inline `style={{ transitionDelay }}`.

**Smooth scroll:** `SmoothScroll.tsx` — zachytí klik na `a[href^="#"]`, počítá `offsetTop` cíle a animuje `window.scrollTo` přes `requestAnimationFrame` s `easeInOutCubic` (1200ms).

**Košík:** `CartContext` (useReducer) v `src/lib/cart.tsx`. Stav: `items: Record<number, CartItem>` + `isOpen: boolean`. Žádný localStorage — reset při refreshi. Hooky: `useCart()`, `useCartCount()`, `useCartTotal()`.

**Testimonials slider:** `perView` 1/2/3 podle šířky okna, šířka karet počítána z `getBoundingClientRect()`. Animace přes CSS `transform: translateX`.

**Hero parallax:** scroll event listener (passive) — animuje `opacity` + `scale` + `translateY` hero sekce při scrollování přes sticky pozici.

**Produktové karty:** `group` Tailwind třída na kartě + `group-hover:scale-110` na obrázku (zoom efekt). Bundle karta je vždy první a zabírá celou šířku (`flex-col md:flex-row`).

### Obrázky
Uloženy v `public/images/`:
- `product_life.png`, `product_business.png`, `product_financial.png`, `product_bundle.png`
- `dp_black.png` — DoPlannix logo (použij s `filter: invert(1) brightness(0.85)` na tmavém pozadí)
- `notion-logo.png` — Notion logo (bez filtru, originální barvy)

### Nedokončené integrace
- **Platební brána:** `CartDrawer` → checkout form → `setTimeout` simulace — Stripe není připojen.
- **Lead magnet:** `LeadMagnet` → `setTimeout` simulace — žádný backend/EmailJS není napojený.

## Konvence

- Obsah v **češtině**, ceny přes `formatPrice()` (`cs-CZ` locale, `Kč`)
- Nové sekce: alternuj `#0a0a0a` / `#141414` pozadí
- CTA tlačítka: vždy `.btn-gold` třída nebo ekvivalentní inline styly
- `"use client"` pouze tam kde je skutečně potřeba (interaktivita, hooks) — server components jsou default
- Komponenty jsou záměrně jednoduché — žádné zbytečné abstrakce
