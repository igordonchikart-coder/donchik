import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/utils/constants'
import { TRUSTPILOT_URL } from './trustpilot'
import { siteContacts } from './siteContacts'

export const DEFAULT_SEO_TITLE = `${SITE_NAME} | Official WWII Reference Books`
export const DEFAULT_SEO_DESCRIPTION =
  'Official website of artist Igor Donchik. Hand-drawn WWII reference books on panzer camouflage, German unit insignia, and tactical symbols. Printed in limited batches and shipped from Estonia.'

export const OG_IMAGE_PATH = '/og-image.webp'

export function withSiteName(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
}

export function toAbsoluteUrl(path: string, origin = SITE_URL): string {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${origin}${normalized}`
}

export function organizationJsonLd(origin: string) {
  const email = siteContacts.find((item) => item.id === 'email-sales')?.value
  const telephone = siteContacts.find((item) => item.id === 'phone')?.value

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: SITE_TAGLINE,
    url: origin,
    description: DEFAULT_SEO_DESCRIPTION,
    email,
    telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pääsusilma tee 28',
      addressLocality: 'Uusküla',
      addressCountry: 'EE',
    },
    sameAs: [TRUSTPILOT_URL],
  }
}

export function personJsonLd(origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Igor Donchik',
    jobTitle: 'Military illustrator and historical researcher',
    url: `${origin}/about`,
    worksFor: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: origin,
    },
    sameAs: [TRUSTPILOT_URL],
  }
}

interface BookJsonLdInput {
  origin: string
  name: string
  description: string
  url: string
  image?: string
  price: number
  currency: string
  available: boolean
  comingSoon: boolean
  isbn?: string
}

export function bookJsonLd({
  origin,
  name,
  description,
  url,
  image,
  price,
  currency,
  available,
  comingSoon,
  isbn,
}: BookJsonLdInput) {
  const availability = comingSoon
    ? 'https://schema.org/PreOrder'
    : available
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock'

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name,
    description,
    url,
    image,
    inLanguage: 'en',
    isbn,
    author: {
      '@type': 'Person',
      name: 'Igor Donchik',
      url: `${origin}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: origin,
    },
    offers: {
      '@type': 'Offer',
      url,
      price: price.toFixed(2),
      priceCurrency: currency,
      availability,
      itemCondition: 'https://schema.org/NewCondition',
    },
  }
}

export function breadcrumbJsonLd(origin: string, items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path, origin),
    })),
  }
}
