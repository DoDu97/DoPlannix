import Stripe from 'stripe'
import { Resend } from 'resend'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
  httpClient: Stripe.createNodeHttpClient(),
})

const resend = new Resend(process.env.RESEND_API_KEY!)

// Mapování názvů produktů na PDF download linky
const PRODUCT_LINKS: Record<string, { name: string; url: string }> = {
  'Business No Brainer': {
    name: 'Business No Brainer',
    url: 'https://qhax2qyplednen4e.public.blob.vercel-storage.com/pdfs/Business_No_Brainer.pdf',
  },
  'Financial No Brainer': {
    name: 'Financial No Brainer',
    url: 'https://qhax2qyplednen4e.public.blob.vercel-storage.com/pdfs/Financial_No_Brainer.pdf',
  },
  'DoPlannix Bundle': {
    name: 'DoPlannix Bundle',
    url: 'https://qhax2qyplednen4e.public.blob.vercel-storage.com/pdfs/Bundle_Doplannix.pdf',
  },
}

function buildEmailHtml(products: { name: string; url: string }[]): string {
  const productRows = products
    .map(
      (p) => `
      <div style="margin: 16px 0; padding: 20px; background: #1e1e1e; border-radius: 12px; border: 1px solid #2a2a2a;">
        <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #f0f0f0;">${p.name}</p>
        <a href="${p.url}"
           style="display: inline-block; padding: 12px 24px; background: #c9a84c; color: #0a0a0a; font-weight: 700; font-size: 14px; border-radius: 8px; text-decoration: none;">
          ↓ Download PDF
        </a>
      </div>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 560px; margin: 0 auto; padding: 40px 24px;">

    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 32px;">
      <img
        src="https://doplannix.com/images/dp_white.png"
        alt="DoPlannix"
        width="40"
        height="40"
        style="display: inline-block; width: 40px; height: 40px; object-fit: contain; vertical-align: middle; margin-right: 10px;"
      />
      <span style="font-size: 22px; font-weight: 900; color: #f0f0f0; letter-spacing: -0.03em; vertical-align: middle;">DoPlannix</span>
    </div>

    <!-- Hero -->
    <div style="text-align: center; margin-bottom: 32px;">
      <p style="font-size: 32px; margin: 0 0 8px 0;">🎉</p>
      <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 900; color: #f0f0f0;">Your order is confirmed!</h1>
      <p style="margin: 0; font-size: 15px; color: #888888;">Thank you for your purchase. Your templates are ready to download below.</p>
    </div>

    <!-- Products -->
    <div style="margin-bottom: 32px;">
      ${productRows}
    </div>

    <!-- How to use -->
    <div style="padding: 20px; background: #141414; border-radius: 12px; border: 1px solid #2a2a2a; margin-bottom: 32px;">
      <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #c9a84c; text-transform: uppercase; letter-spacing: 0.08em;">How to use your template</p>
      <ol style="margin: 0; padding-left: 20px; color: #888888; font-size: 14px; line-height: 1.8;">
        <li>Download the PDF using the button above</li>
        <li>Open the PDF and click the Notion template link inside</li>
        <li>In Notion, click <strong style="color: #f0f0f0;">"Duplicate"</strong> to add it to your workspace</li>
        <li>Start using your template right away</li>
      </ol>
    </div>

    <!-- Guarantee -->
    <div style="text-align: center; margin-bottom: 32px; color: #888888; font-size: 13px;">
      <p style="margin: 0;">🛡️ 30-day money-back guarantee — not happy? Just reply to this email.</p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; border-top: 1px solid #2a2a2a; padding-top: 24px;">
      <p style="margin: 0 0 8px 0; font-size: 13px; color: #888888;">Questions? Reply to this email or contact us at</p>
      <a href="mailto:hello@doplannix.com" style="color: #c9a84c; font-size: 13px; text-decoration: none;">hello@doplannix.com</a>
      <p style="margin: 16px 0 0 0; font-size: 12px; color: #555555;">© 2025 DoPlannix. All rights reserved.</p>
    </div>

  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing Stripe-Signature header.' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[Stripe Webhook] Signature verification failed: ${message}`)
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const customerEmail = session.customer_email

      console.log(`[Stripe] ✅ Payment completed — session: ${session.id}, email: ${customerEmail}`)

      if (!customerEmail) {
        console.error('[Stripe] No customer email found in session.')
        break
      }

      // Načteme zakoupené položky ze Stripe session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 10,
      })

      // Zjistíme které produkty zákazník koupil
      const purchasedProducts: { name: string; url: string }[] = []

      for (const item of lineItems.data) {
        const productName = item.description ?? ''
        const match = Object.keys(PRODUCT_LINKS).find((key) =>
          productName.toLowerCase().includes(key.toLowerCase())
        )
        if (match) {
          purchasedProducts.push(PRODUCT_LINKS[match])
        }
      }

      if (purchasedProducts.length === 0) {
        console.error('[Stripe] No matching products found for line items:', lineItems.data)
        break
      }

      // Odešleme email se stažením
      const { error } = await resend.emails.send({
        from: 'DoPlannix <hello@doplannix.com>',
        to: customerEmail,
        subject: '🎉 Your DoPlannix template is ready to download',
        html: buildEmailHtml(purchasedProducts),
      })

      if (error) {
        console.error('[Resend] Failed to send email:', error)
      } else {
        console.log(`[Resend] ✅ Email sent to ${customerEmail}`)
      }

      // Uložíme objednávku do Supabase
      const orderRows = purchasedProducts.map((product) => ({
        stripe_session_id: session.id,
        customer_email: customerEmail,
        product_name: product.name,
        amount_total: session.amount_total ?? 0,
        currency: session.currency ?? 'usd',
        status: 'completed',
        pdf_url: product.url,
      }))

      const { error: dbError } = await supabaseAdmin.from('orders').insert(orderRows)

      if (dbError) {
        console.error('[Supabase] Failed to insert order(s):', dbError.message)
      } else {
        console.log(`[Supabase] ✅ Inserted ${orderRows.length} order row(s) for session ${session.id}`)
      }

      break
    }

    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent
      console.error(`[Stripe] ❌ Payment failed — intent ID: ${intent.id}`)
      break
    }

    default:
      console.log(`[Stripe] Unhandled event: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
