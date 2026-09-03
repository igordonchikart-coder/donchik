import type { VercelRequest, VercelResponse } from '@vercel/node'

const PAYPAL_BASE = 'https://api-m.paypal.com' // live; use api-m.sandbox.paypal.com for testing

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials are not configured')
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.status}`)
  }

  const data = (await res.json()) as { access_token: string }
  return data.access_token
}

interface LineItem {
  title: string
  quantity: number
  price: number
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

  const { orderId, items, currency = 'EUR', successUrl, cancelUrl } =
    req.body as RequestBody

  if (!orderId || !items?.length) {
    return res.status(400).json({ error: 'orderId and items are required' })
  }

  const origin = req.headers.origin ?? 'https://donchik.art'
  const totalAmount = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)

  try {
    const token = await getAccessToken()

    const orderRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'PayPal-Request-Id': orderId, // idempotency key
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: orderId,
            amount: {
              currency_code: currency.toUpperCase(),
              value: totalAmount,
              breakdown: {
                item_total: { currency_code: currency.toUpperCase(), value: totalAmount },
              },
            },
            items: items.map((item) => ({
              name: item.title,
              quantity: String(item.quantity),
              unit_amount: {
                currency_code: currency.toUpperCase(),
                value: item.price.toFixed(2),
              },
            })),
          },
        ],
        application_context: {
          return_url: successUrl ?? `${origin}/order-success?provider=paypal&orderId=${orderId}`,
          cancel_url: cancelUrl ?? `${origin}/checkout`,
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
        },
      }),
    })

    if (!orderRes.ok) {
      const err = await orderRes.text()
      throw new Error(`PayPal order creation failed: ${err}`)
    }

    const order = (await orderRes.json()) as {
      id: string
      links: Array<{ rel: string; href: string }>
    }

    const approveLink = order.links.find((l) => l.rel === 'approve')?.href

    return res.status(200).json({ orderId: order.id, approveUrl: approveLink })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'PayPal error'
    console.error('[paypal-order]', message)
    return res.status(500).json({ error: message })
  }
}
