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
│   ├── layout.tsx                  — Root layout: Inter font (next/font), CartProvider, metadata (EN)
│   ├── page.tsx                    — Hlavní stránka — skládá sekce v pořadí sales funnelu
│   ├── globals.css                 — Tailwind v4 @import + @theme tokens + base styles + utility třídy
│   ├── success/page.tsx            — Stránka po úspěšné platbě (Stripe redirect)
│   ├── cancel/page.tsx             — Stránka po zrušení platby (Stripe redirect)
│   ├── privacy/page.tsx            — Privacy Policy (EN)
│   ├── terms/page.tsx              — Terms of Service (EN)
│   ├── returns/page.tsx            — Returns & Refunds (EN)
│   ├── gdpr/page.tsx               — Zásady ochrany osobních údajů (CZ)
│   ├── obchodni-podminky/page.tsx  — Obchodní podmínky (CZ)
│   ├── reklamace/page.tsx          — Reklamace a vrácení zboží (CZ)
│   └── api/
│       ├── checkout/route.ts       — POST endpoint → vytvoří Stripe checkout session, vrátí URL
│       └── webhooks/stripe/route.ts — Stripe webhook handler (checkout.session.completed)
│                                      TODO: odeslat email se šablonou + uložit do DB
├── components/
│   ├── AnimationInit.tsx   — IntersectionObserver pro [data-animate] elementy (fire-once)
│   ├── SmoothScroll.tsx    — Custom smooth scroll pro #anchor odkazy (1200ms, easeInOutCubic)
│   ├── Nav.tsx             — Fixed nav, scroll-based backdrop blur, cart badge
│   ├── Hero.tsx            — Hero sekce; sticky + parallax fade pouze na desktopu (md:sticky),
│   │                         na mobilu klasický scroll bez efektů
│   ├── StatsStrip.tsx      — Animované čítače (useCounter hook s IntersectionObserver)
│   ├── Benefits.tsx        — 6 výhod v auto-fit mřížce
│   ├── Audience.tsx        — 3 cílové skupiny
│   ├── Products.tsx        — Bundle (full-width, první) + 3 individuální karty; hover zoom na obrázku
│   ├── Gallery.tsx         — Slider s náhledy šablon; perView 1/2/3 podle šířky, dot navigace
│   ├── Testimonials.tsx    — Slider s recenzemi; perView 1/2/3 podle šířky, dot navigace
│   ├── FAQ.tsx             — Accordion, výška animována přes grid-template-rows: 0fr → 1fr
│   ├── LeadMagnet.tsx      — E-mail capture (setTimeout simulace — backend není napojen)
│   ├── CartDrawer.tsx      — Slide-in košík + 3-krokový checkout (cart → form → done)
│   │                         Promo kód: DOPLANNIX10 = 10 % sleva (hardcoded)
│   │                         Platba: fetch na /api/checkout → redirect na Stripe session
│   └── Footer.tsx          — Logo + copyright + linky na právní stránky
└── lib/
    ├── data.ts             — PRODUCTS, TESTIMONIALS, FAQ_ITEMS, formatPrice(), formatPriceFull()
    └── cart.tsx            — React Context + useReducer (ADD/REMOVE/INCREMENT/DECREMENT/OPEN/CLOSE)
```

### Pořadí sekcí — sales funnel
`Nav` → `Hero` → `StatsStrip` → `Benefits` → `Audience` → `Products` → `Gallery` → `Testimonials` → `FAQ` → `LeadMagnet` → `Footer` → `CartDrawer` (fixed overlay)

### Pozadí sekcí — vzor střídání
- `#0a0a0a` (noir): Hero, Benefits, Products, FAQ
- `#141414` (card): StatsStrip, Audience, Gallery, Testimonials, LeadMagnet

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

**Gallery slider:** `perView` 1/2/3 podle šířky okna (< 640 / < 1024 / ≥ 1024), šířka karet počítána z `getBoundingClientRect()`. Animace přes CSS `transform: translateX`.

**Testimonials slider:** stejný systém jako Gallery slider.

**Hero parallax:** pouze na desktopu (`window.matchMedia('(max-width: 768px)')` → skip). Scroll event listener (passive) — animuje `opacity` + `scale` + `translateY`. Hero je `md:sticky md:top-0` — na mobilu klasický scroll.

**Produktové karty:** `group` Tailwind třída na kartě + `group-hover:scale-110` na obrázku (zoom efekt). Bundle karta je vždy první a zabírá celou šířku (`flex-col md:flex-row`).

**Stripe checkout:** `CartDrawer` → POST `/api/checkout` → Stripe session → `window.location.href` redirect na Stripe. Po platbě redirect na `/success?session_id=...` nebo `/` při zrušení.

### Produkty (src/lib/data.ts)
| ID | Název | Cena | Původní cena |
|----|-------|------|--------------|
| 2  | Business No Brainer | $29 | $59 |
| 3  | Financial No Brainer | $29 | $59 |
| 4  | DoPlannix Bundle (featured) | $49 | $119 |

Ceny jsou v USD, Stripe session v CZK (`currency: 'czk'`). `formatPrice()` formátuje pro zobrazení, `formatPriceFull()` pro původní přeškrtnutou cenu.

### Obrázky
Uloženy v `public/images/`:
- `product_life.png`, `product_business.png`, `product_financial.png`, `product_bundle.png`
- `gallery_1.jpg` až `gallery_6.jpg` — náhledy šablon pro Gallery sekci
- `dp_black.png` — DoPlannix logo (použij s `filter: invert(1) brightness(0.85)` na tmavém pozadí)
- `notion-logo.png` — Notion logo (bez filtru, originální barvy)

### Environment Variables (.env.local)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```
Stejné proměnné musí být nastaveny ve Vercel dashboardu (Settings → Environment Variables).

### Deploy
- Git → GitHub (`DoDu97/DoPlannix`) → Vercel (auto-deploy na každý push do `main`)
- Doména: `doplannix.com` (Active24 DNS → Vercel)
- PDF soubory (`/pdf`) jsou v `.gitignore` — distribuují se zákazníkům odkazem po platbě

### Nedokončené integrace
- **Webhook po platbě:** `src/app/api/webhooks/stripe/route.ts` zpracovává `checkout.session.completed`, ale neposílá email se šablonou ani neukládá objednávku do DB — TODO
- **Lead magnet:** `LeadMagnet.tsx` → `setTimeout` simulace — žádný email service není napojen — TODO

## Konvence

- Obsah webu v **angličtině**, právní stránky existují v EN i CZ variantě
- Ceny přes `formatPrice()` / `formatPriceFull()`
- Nové sekce: alternuj `#0a0a0a` / `#141414` pozadí
- CTA tlačítka: vždy `.btn-gold` třída nebo ekvivalentní inline styly
- `"use client"` pouze tam kde je skutečně potřeba (interaktivita, hooks) — server components jsou default
- Komponenty jsou záměrně jednoduché — žádné zbytečné abstrakce
