import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'

// Initialise Stripe lazily so the function still imports when the key is absent
function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(key)
}

interface LineItem {
  title: string
  quantity: number
  price: number // in euros (e.g. 49.90)
  currency: string
}

interface RequestBody {
  orderId: string
  items: LineItem[]
  currency?: string
  successUrl?: string
  cancelUrl?: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { orderId, items, currency = 'eur', successUrl, cancelUrl } =
    req.body as RequestBody

  if (!orderId || !items?.length) {
    return res.status(400).json({ error: 'orderId and items are required' })
  }

  const origin = req.headers.origin ?? 'https://donchik.art'

  try {
    const stripe = getStripe()

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: currency.toLowerCase(),
          unit_amount: Math.round(item.price * 100), // Stripe uses cents
          product_data: { name: item.title },
        },
        quantity: item.quantity,
      })),
      metadata: { orderId },
      success_url:
        successUrl ?? `${origin}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl ?? `${origin}/checkout`,
    })

    return res.status(200).json({ url: session.url, sessionId: session.id })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Stripe error'
    console.error('[stripe-checkout]', message)
    return res.status(500).json({ error: message })
  }
}
