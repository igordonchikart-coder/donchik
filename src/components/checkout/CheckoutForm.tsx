import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/app/routes'
import { Button } from '@/components/common/Button'
import { TextAreaField, TextField } from '@/components/common/Field'
import { useCart } from '@/hooks/useCart'
import { ordersService } from '@/services/ordersService'
import { DEFAULT_CURRENCY } from '@/utils/constants'
import styles from './CheckoutForm.module.css'

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

export function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
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

      clearCart()
      navigate(routes.orderSuccess, { state: { orderId: order.id } })
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Could not place the order')
    } finally {
      setIsSubmitting(false)
    }
  }

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
      {error ? <p className="fieldError" role="alert">{error}</p> : null}
      <Button type="submit" disabled={isSubmitting || items.length === 0}>
        {isSubmitting ? 'Placing order...' : 'Confirm order'}
      </Button>
    </form>
  )
}
