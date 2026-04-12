import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

interface CartItem {
  id: number
  name: string
  price: number
  qty: number
  img: string
}

interface CheckoutBody {
  items: CartItem[]
  customerEmail: string
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json()
    const { items, customerEmail } = body

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Košík je prázdný.' }, { status: 400 })
    }

    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [`${origin}${item.img}`],
        },
        // Stripe pracuje v halérech — Kč × 100
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      customer_email: customerEmail || undefined,
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
    console.error('[Stripe] Checkout session error:', error)
    return NextResponse.json(
      { error: 'Nepodařilo se vytvořit platební session. Zkus to prosím znovu.' },
      { status: 500 }
    )
  }
}
