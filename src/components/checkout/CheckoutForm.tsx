import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/app/routes'
import { Button } from '@/components/common/Button'
import { TextAreaField, TextField } from '@/components/common/Field'
import { useCart } from '@/hooks/useCart'
import { ordersService } from '@/services/ordersService'
import { DEFAULT_CURRENCY } from '@/utils/constants'
import styles from './CheckoutForm.module.css'

type PaymentMethod = 'stripe' | 'paypal'

interface FormState {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  notes: string
}

const initialState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  notes: '',
}

async function redirectToStripe(orderId: string, items: Array<{ title: string; quantity: number; price: number; currency: string }>) {
  const res = await fetch('/api/stripe-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, items }),
  })

  if (!res.ok) {
    const { error } = await res.json() as { error: string }
    throw new Error(error ?? 'Could not create Stripe session')
  }

  const { url } = await res.json() as { url: string }
  window.location.href = url
}

async function redirectToPayPal(orderId: string, items: Array<{ title: string; quantity: number; price: number; currency: string }>) {
  const res = await fetch('/api/paypal-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, items }),
  })

  if (!res.ok) {
    const { error } = await res.json() as { error: string }
    throw new Error(error ?? 'Could not create PayPal order')
  }

  const { approveUrl } = await res.json() as { approveUrl: string }
  window.location.href = approveUrl
}

export function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(name: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // 1. Save the order to Supabase first (status: pending)
      const order = await ordersService.create({
        customer: {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          city: values.city,
          postalCode: values.postalCode,
        },
        items: items.map((item) => ({
          productId: item.productId,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          currency: item.currency,
        })),
        totalPrice,
        currency: items[0]?.currency ?? DEFAULT_CURRENCY,
        notes: values.notes || undefined,
      })

      const orderItems = items.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        currency: item.currency,
      }))

      // 2. Redirect to payment provider
      if (paymentMethod === 'stripe') {
        clearCart()
        await redirectToStripe(order.id, orderItems)
      } else {
        clearCart()
        await redirectToPayPal(order.id, orderItems)
      }
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Could not place the order')
      setIsSubmitting(false)
    }
  }

  const isStripeReady = Boolean(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  const isPayPalReady = Boolean(import.meta.env.VITE_PAYPAL_CLIENT_ID)
  const hasAnyPayment = isStripeReady || isPayPalReady

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        label="Full name"
        name="fullName"
        autoComplete="name"
        required
        value={values.fullName}
        onChange={(event) => updateField('fullName', event.target.value)}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={values.email}
        onChange={(event) => updateField('email', event.target.value)}
      />
      <TextField
        label="Phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        required
        value={values.phone}
        onChange={(event) => updateField('phone', event.target.value)}
      />
      <TextField
        label="Address"
        name="address"
        autoComplete="street-address"
        required
        value={values.address}
        onChange={(event) => updateField('address', event.target.value)}
      />
      <TextField
        label="City"
        name="city"
        autoComplete="address-level2"
        required
        value={values.city}
        onChange={(event) => updateField('city', event.target.value)}
      />
      <TextField
        label="Postal code"
        name="postalCode"
        autoComplete="postal-code"
        required
        value={values.postalCode}
        onChange={(event) => updateField('postalCode', event.target.value)}
      />
      <TextAreaField
        label="Order notes"
        name="notes"
        value={values.notes}
        onChange={(event) => updateField('notes', event.target.value)}
      />

      {/* Payment method selector */}
      {hasAnyPayment ? (
        <fieldset className={styles.paymentFieldset}>
          <legend className={styles.paymentLegend}>Payment method</legend>
          <div className={styles.paymentOptions}>
            {isStripeReady && (
              <label className={`${styles.paymentOption} ${paymentMethod === 'stripe' ? styles.paymentOptionActive : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={paymentMethod === 'stripe'}
                  onChange={() => setPaymentMethod('stripe')}
                  className={styles.paymentRadio}
                />
                <span className={styles.paymentLabel}>
                  <span className={styles.paymentIcon}>💳</span>
                  Card / Apple Pay / Google Pay
                </span>
              </label>
            )}
            {isPayPalReady && (
              <label className={`${styles.paymentOption} ${paymentMethod === 'paypal' ? styles.paymentOptionActive : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  className={styles.paymentRadio}
                />
                <span className={styles.paymentLabel}>
                  <span className={styles.paymentIcon}>🅿️</span>
                  PayPal
                </span>
              </label>
            )}
          </div>
        </fieldset>
      ) : (
        <p className={styles.paymentNotice}>
          Payment integration is being set up. Orders placed now will be confirmed manually.
        </p>
      )}

      {error ? <p className="fieldError" role="alert">{error}</p> : null}

      <Button type="submit" disabled={isSubmitting || items.length === 0}>
        {isSubmitting
          ? 'Redirecting to payment…'
          : hasAnyPayment
            ? `Pay with ${paymentMethod === 'stripe' ? 'Card' : 'PayPal'}`
            : 'Confirm order'}
      </Button>
    </form>
  )
}
