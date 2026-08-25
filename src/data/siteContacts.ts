import { SITE_NAME } from '@/utils/constants'

export interface SiteContact {
  id: string
  icon: 'location' | 'phone' | 'email'
  label: string
  value: string
  href?: string
}

export const siteContacts: SiteContact[] = [
  {
    id: 'address',
    icon: 'location',
    label: 'Address',
    value: 'Pääsusilma tee 28, Uusküla, Estonia',
  },
  {
    id: 'phone',
    icon: 'phone',
    label: 'Phone',
    value: '+372 5518393',
    href: 'tel:+3725518393',
  },
  {
    id: 'email-sales',
    icon: 'email',
    label: 'Email',
    value: 'sales@not-toys.com',
    href: 'mailto:sales@not-toys.com',
  },
  {
    id: 'email-igor',
    icon: 'email',
    label: 'Email',
    value: 'igorkoval366@gmail.com',
    href: 'mailto:igorkoval366@gmail.com',
  },
]

export const siteLegal = {
  copyright: `Copyright © 2026 ${SITE_NAME}`,
  trademark: 'Official trademark № 102949 (KZ)',
}
