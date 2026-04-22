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
│       ├── checkout/route.ts       — POST endpoint → validuje items ze serveru, vytvoří Stripe session
│       ├── validate-promo/route.ts — POST endpoint → validuje promo kód (server-side only)
│       └── webhooks/stripe/route.ts — Stripe webhook handler (checkout.session.completed)
│                                      Odesílá email přes Resend + ukládá objednávku do Supabase
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
│   ├── CartDrawer.tsx      — Slide-in košík + 3-krokový checkout (cart → form → done)
│   │                         Promo kód: DOPLANNIX10 = 10 % sleva (validace přes /api/validate-promo)
│   │                         Platba: fetch na /api/checkout → redirect na Stripe session
│   └── Footer.tsx          — Copyright + linky na právní stránky + Instagram ikona (vpravo)
└── lib/
    ├── data.ts             — PRODUCTS, TESTIMONIALS, FAQ_ITEMS, formatPrice(), formatPriceFull()
    ├── cart.tsx            — React Context + useReducer (ADD/REMOVE/INCREMENT/DECREMENT/OPEN/CLOSE)
    ├── promo.ts            — Server-side promo kódy + validatePromoCode() (nikdy se neposílá klientovi)
    └── supabase.ts         — Server-side Supabase admin client (service role, bypasuje RLS)
```

### Pořadí sekcí — sales funnel
`Nav` → `Hero` → `StatsStrip` → `Benefits` → `Audience` → `Products` → `Gallery` → `Testimonials` → `FAQ` → `Footer` → `CartDrawer` (fixed overlay)

### Pozadí sekcí — vzor střídání
- `#0a0a0a` (noir): Hero, Benefits, Products, FAQ
- `#141414` (card): StatsStrip, Audience, Gallery, Testimonials

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

Ceny jsou v USD, Stripe session v USD (`currency: 'usd'`). `formatPrice()` formátuje pro zobrazení, `formatPriceFull()` pro původní přeškrtnutou cenu.

### Obrázky
Uloženy v `public/images/`:
- `product_life.png`, `product_business.png`, `product_financial.png`, `product_bundle.png`
- `gallery_1.jpg` až `gallery_6.jpg` — náhledy šablon pro Gallery sekci
- `dp_black.png` — DoPlannix logo (použij s `filter: invert(1) brightness(0.85)` na tmavém pozadí)
- `dp_white.png` — DoPlannix logo bílé (použij v emailech a na tmavém pozadí bez filtru)
- `notion-logo.png` — Notion logo (bez filtru, originální barvy)

### PDF soubory
Uloženy lokálně ve `/pdf` (v `.gitignore`) a nahrané na **Vercel Blob Storage**:
```
https://qhax2qyplednen4e.public.blob.vercel-storage.com/pdfs/Business_No_Brainer.pdf
https://qhax2qyplednen4e.public.blob.vercel-storage.com/pdfs/Financial_No_Brainer.pdf
https://qhax2qyplednen4e.public.blob.vercel-storage.com/pdfs/Bundle_Doplannix.pdf
```
Po aktualizaci PDF je potřeba znovu nahrát přes `vercel blob put`.

### Favicon
- `src/app/icon.png` — 512×512, použit `Images/Logo/3D/DP-3D.png`
- `src/app/favicon.ico` — 32×32, stejný zdroj
- Next.js App Router je servuje automaticky, žádná konfigurace není potřeba

### Environment Variables (.env.local)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_SUPABASE_URL=https://gmzdammseqipgfzqpuem.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
```
Stejné proměnné musí být nastaveny ve Vercel dashboardu (Settings → Environment Variables).

### Deploy
- Git → GitHub (`DoDu97/DoPlannix`) → Vercel (auto-deploy na každý push do `main`)
- Doména: `doplannix.com` (Active24 DNS → Vercel)
- PDF soubory (`/pdf`) jsou v `.gitignore` — hostované na Vercel Blob, zákazníkům se posílají emailem

### Email po platbě (Resend)
- `src/app/api/webhooks/stripe/route.ts` zpracovává `checkout.session.completed`
- Po platbě odesílá email přes **Resend** z `hello@doplannix.com`
- Email obsahuje logo (`dp_white.png`), instrukce a download link na PDF dle zakoupeného produktu
- Mapování produktů na PDF je hardcoded v `PRODUCT_LINKS` v route.ts
- Doména `doplannix.com` ověřena v Resendu přes DNS záznamy (DKIM, SPF)

### Databáze objednávek (Supabase)
- Projekt: `Doplannix-prod` (ID: `gmzdammseqipgfzqpuem`)
- Tabulka `orders`: `id`, `stripe_session_id` (UNIQUE), `customer_email`, `product_name`, `amount_total` (centy), `currency`, `status`, `pdf_url`, `created_at`
- RLS povoleno, žádné policies — service role key bypasuje RLS
- Insert probíhá v webhook handleru po úspěšném odeslání emailu
- Duplicitní webhooky jsou zachyceny přes UNIQUE constraint na `stripe_session_id`

## Bezpečnost

### Co bylo implementováno
- **Server-side validace cen** — `/api/checkout` bere ceny výhradně z `PRODUCTS` katalogu, nikdy od klienta
- **Promo kódy server-side only** — uloženy v `src/lib/promo.ts`, klient je nikdy nevidí; validace přes `/api/validate-promo`
- **Input validace** — email regex, integer check na id/qty, limit 10 položek, ověření existence produktu
- **Rate limiting** — `/api/checkout` max 10 req/min, `/api/validate-promo` max 20 req/min per IP (in-memory, best-effort)
- **CORS whitelist** — pouze `https://doplannix.com` a `https://www.doplannix.com` (+ localhost v dev)
- **Security headers** — CSP, X-Frame-Options: DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy (viz `next.config.ts`)
- **Stripe webhook** — signature verification přes `stripe.webhooks.constructEvent()`, chyba vrací generickou zprávu
- **Stripe HTTP client** — `Stripe.createFetchHttpClient()` (vyžadováno pro Vercel; Node.js https modul nefunguje)

### Pravidla — nikdy neporušovat
- **Žádné secrets v kódu ani gitu.** API klíče pouze v `.env.local` (lokálně) a Vercel Environment Variables (produkce)
- **Ceny vždy ze serveru.** Klient posílá pouze `id` + `qty`, nikdy cenu
- **Promo kódy nikdy na klienta.** Pouze `src/lib/promo.ts` + `/api/validate-promo` endpoint
- **`"use client"` jen kde nutné** — API routes jsou vždy server-side

### Stripe – důležité poznámky
- Používá `Stripe.createFetchHttpClient()` — bez toho vzniká `StripeConnectionError` na Verceli
- API verze: `2026-03-25.dahlia` (Stripe SDK v21)
- Checkout session vytváří ceny dynamicky přes `price_data` — žádné předkonfigurované produkty v Stripe dashboardu nejsou potřeba

### Supabase RLS
- RLS **zapnuté**, žádné policies — to je správně (anon přístup přes Data API je zcela blokovaný)
- Service role key vždy obchází RLS → webhook může INSERT bez policy
- Nikdy nevytvářej permissive policy na tabulce `orders`

### Environment Variables
Při přidávání nové env proměnné ji nastav na **obou místech**:
1. `.env.local` (lokální vývoj)
2. Vercel dashboard → Settings → Environment Variables (produkce)

## Konvence

- Obsah webu v **angličtině**, právní stránky existují v EN i CZ variantě
- Ceny přes `formatPrice()` / `formatPriceFull()`
- Nové sekce: alternuj `#0a0a0a` / `#141414` pozadí
- CTA tlačítka: vždy `.btn-gold` třída nebo ekvivalentní inline styly
- `"use client"` pouze tam kde je skutečně potřeba (interaktivita, hooks) — server components jsou default
- Komponenty jsou záměrně jednoduché — žádné zbytečné abstrakce
