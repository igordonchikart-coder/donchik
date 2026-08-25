export interface HomeStat {
  id: string
  value: string
  label: string
  icon?: 'star'
}

export const homeStats: HomeStat[] = [
  { id: 'customers', value: '3,336', label: 'Satisfied Customers' },
  { id: 'trustpilot', value: '4,8', label: 'Trustpilot Rating', icon: 'star' },
  { id: 'books', value: '7', label: 'Published Books' },
]
