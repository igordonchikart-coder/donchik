import type { Product } from '@/types'
import { usableCatalogImages } from '@/utils/catalogArtwork'

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
  const pageSlides = usableCatalogImages(product.pageGallery ?? [])
  if (pageSlides.length > 0) {
    return pageSlides
  }

  return getProductCardSlides(product)
}

export function getProductCardSlides(product: Pick<Product, 'coverImage' | 'gallery'>): string[] {
  const all = usableCatalogImages([product.coverImage, ...product.gallery])
  const uploaded = all.filter((url) => /\/storage\/v1\/object\/public\//.test(url) || /supabase\.co\/storage\//.test(url))
  return uploaded.length > 0 ? uploaded : all
}
