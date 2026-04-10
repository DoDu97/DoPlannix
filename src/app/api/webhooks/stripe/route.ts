import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Chybí Stripe-Signature hlavička.' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Neznámá chyba'
    console.error(`[Stripe Webhook] Ověření podpisu selhalo: ${message}`)
    return NextResponse.json({ error: `Webhook chyba: ${message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      console.log(`[Stripe] ✅ Platba dokončena — session ID: ${session.id}, email: ${session.customer_email}`)
      // TODO: Odeslat zákazníkovi e-mail s odkazem na Notion šablonu
      // TODO: Uložit objednávku do databáze
      break
    }

    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent
      console.error(`[Stripe] ❌ Platba selhala — intent ID: ${intent.id}`)
      break
    }

    default:
      // Ostatní eventy logujeme, ale nereagujeme
      console.log(`[Stripe] Neobsloužený event: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
