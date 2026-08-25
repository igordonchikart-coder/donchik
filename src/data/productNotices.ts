export interface ProductNotice {
  id: string
  icon: 'box' | 'phone' | 'globe'
  text: string
}

export const productNotices: ProductNotice[] = [
  {
    id: 'dispatch',
    icon: 'box',
    text: 'Due to high demand, orders are dispatched once per week.',
  },
  {
    id: 'phone',
    icon: 'phone',
    text: 'Please provide your phone number in international format (+country code).',
  },
  {
    id: 'vat',
    icon: 'globe',
    text: 'EU VAT applies at checkout. For all other countries, the listed price is final.',
  },
]
