import type { Product } from '@/types'

export function isPurchasable(product: Product): boolean {
  return product.status === 'available' && product.isAvailable && product.stock > 0
}

export function isComingSoon(product: Product): boolean {
  return product.status === 'coming-soon'
}

export function toVolumeLabel(volumeNumber: number): string {
  const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return `Volume ${numerals[volumeNumber - 1] ?? String(volumeNumber)}`
}

export function getProductHeadline(product: Pick<Product, 'title' | 'volumeNumber' | 'shortDescription'>): string {
  return `${product.title} Vol. ${product.volumeNumber} — ${product.shortDescription}`
}

export function getProductPageSlides(
  product: Pick<Product, 'pageGallery' | 'coverImage' | 'gallery'>,
): string[] {
  const pageSlides = (product.pageGallery ?? []).filter(Boolean)
  if (pageSlides.length > 0) {
    return pageSlides
  }

  return getProductCardSlides(product)
}

export function getProductCardSlides(product: Pick<Product, 'coverImage' | 'gallery'>): string[] {
  const slides: string[] = []

  for (const image of [product.coverImage, ...product.gallery]) {
    if (image && !slides.includes(image)) {
      slides.push(image)
    }
  }

  return slides.length > 0 ? slides : [product.coverImage]
}

export function padProductCardSlides(
  product: Pick<Product, 'coverImage' | 'gallery'>,
  count = 3,
): string[] {
  const slides = getProductCardSlides(product)
  const fill = slides[0] ?? product.coverImage

  if (!fill) {
    return slides
  }

  const padded = [...slides]
  while (padded.length < count) {
    padded.push(fill)
  }

  return padded
}
