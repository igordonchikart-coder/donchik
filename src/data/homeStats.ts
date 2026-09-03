import { TRUSTPILOT_FALLBACK, TRUSTPILOT_URL } from './trustpilot'

export { TRUSTPILOT_URL }

export interface HomeStat {
  id: string
  value: string
  label: string
  icon?: 'star'
  href?: string
}

export const homeStats: HomeStat[] = [
  { id: 'customers', value: '3,336', label: 'Satisfied Customers' },
  {
    id: 'trustpilot',
    value: TRUSTPILOT_FALLBACK.ratingLabel,
    label: 'Trustpilot Rating',
    icon: 'star',
    href: TRUSTPILOT_URL,
  },
  { id: 'books', value: '7', label: 'Published Books' },
]
