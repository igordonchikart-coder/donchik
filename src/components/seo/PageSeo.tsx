import { useEffect } from 'react'
import { SITE_NAME } from '@/utils/constants'
import { DEFAULT_SEO_DESCRIPTION, DEFAULT_SEO_TITLE, OG_IMAGE_PATH, toAbsoluteUrl, withSiteName } from '@/data/siteSeo'

interface PageSeoProps {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'product'
  jsonLd?: unknown
  noIndex?: boolean
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector(selector) as HTMLMetaElement | null

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null

  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }

  element.href = href
}

function upsertJsonLd(id: string, serialized: string | undefined) {
  const existing = document.getElementById(id)

  if (!serialized) {
    existing?.remove()
    return
  }

  let element = existing as HTMLScriptElement | null

  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = serialized
}

function stripContext(node: unknown) {
  if (node && typeof node === 'object' && !Array.isArray(node) && '@context' in node) {
    const rest = { ...(node as Record<string, unknown>) }
    delete rest['@context']
    return rest
  }

  return node
}

function serializeJsonLd(data: unknown): string | undefined {
  if (data == null) {
    return undefined
  }

  if (Array.isArray(data)) {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': data.map(stripContext),
    })
  }

  return JSON.stringify(data)
}

export function PageSeo({
  title,
  description,
  path,
  image,
  type = 'website',
  jsonLd,
  noIndex = false,
}: PageSeoProps) {
  const serialized = serializeJsonLd(jsonLd)

  useEffect(() => {
    const origin = window.location.origin
    const url = toAbsoluteUrl(path, origin)
    const fullTitle = withSiteName(title)
    const imageUrl = toAbsoluteUrl(image || OG_IMAGE_PATH, origin)

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow')
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:type', type === 'product' ? 'product' : 'website')
    upsertMeta('property', 'og:image', imageUrl)
    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', imageUrl)
    upsertLink('canonical', url)
    upsertJsonLd('page-jsonld', serialized)

    return () => {
      document.title = DEFAULT_SEO_TITLE
      upsertMeta('name', 'description', DEFAULT_SEO_DESCRIPTION)
    }
  }, [title, description, path, image, type, serialized, noIndex])

  return null
}
