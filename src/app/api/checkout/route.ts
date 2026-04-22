import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { PRODUCTS } from '@/lib/data'
import { validatePromoCode } from '@/lib/promo'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

const ALLOWED_ORIGINS = new Set([
  'https://doplannix.com',
  'https://www.doplannix.com',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
])

// Simple in-memory rate limiter (per serverless instance — best-effort protection)
const rateLimitMap = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

interface CheckoutBody {
  items: { id: number; qty: number }[]
  customerEmail: string
  promoCode?: string
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  // CORS — only accept requests from allowed origins
  const origin = req.headers.get('origin') ?? ''
  if (!ALLOWED_ORIGINS.has(origin)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }

  try {
    const body: CheckoutBody = await req.json()
    const { items, customerEmail, promoCode } = body

    // Validate cart
    if (!Array.isArray(items) || items.length === 0 || items.length > 10) {
      return NextResponse.json({ error: 'Invalid cart.' }, { status: 400 })
    }

    // Validate email
    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Validate promo code server-side (never trust the client's discount)
    const discount = promoCode ? validatePromoCode(promoCode) : 0

    // Build line items from server-side product catalog — prices are never taken from the client
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    for (const item of items) {
      if (
        !Number.isInteger(item.id) ||
        !Number.isInteger(item.qty) ||
        item.qty < 1 ||
        item.qty > 10
      ) {
        return NextResponse.json({ error: 'Invalid item data.' }, { status: 400 })
      }

      const product = PRODUCTS.find((p) => p.id === item.id)
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 })
      }

      const unitAmountCents =
        discount > 0
          ? Math.round(product.price * (1 - discount / 100) * 100)
          : Math.round(product.price * 100)

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [`${origin}${product.img}`],
          },
          unit_amount: unitAmountCents,
        },
        quantity: item.qty,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      customer_email: customerEmail,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=1`,
      payment_method_types: ['card'],
      locale: 'cs',
      metadata: {
        source: 'doplannix-web',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      console.error(JSON.stringify({ type: error.type, code: error.code, status: error.statusCode, message: error.message, raw: String(error) }))
    } else {
      console.error('[Stripe] Checkout session error:', String(error))
    }
    return NextResponse.json(
      { error: 'Failed to create payment session. Please try again.' },
      { status: 500 }
    )
  }
}
