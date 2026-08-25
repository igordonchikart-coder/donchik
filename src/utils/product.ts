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

export function getProductCardSlides(product: Pick<Product, 'coverImage' | 'gallery'>): string[] {
  const slides: string[] = []

  for (const image of [product.coverImage, ...product.gallery]) {
    if (image && !slides.includes(image)) {
      slides.push(image)
    }
  }

  return slides.length > 0 ? slides : [product.coverImage]
}
