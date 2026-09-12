import type { Product } from '@/types'
import { usableCatalogImages } from '@/utils/catalogArtwork'
import { DISCOUNT_BUNDLE_CATEGORY_ID } from '@/utils/catalogGroups'

export function isPurchasable(product: Product): boolean {
  return product.status === 'available' && product.isAvailable && product.stock > 0
}

export function isComingSoon(product: Product): boolean {
  return product.status === 'coming-soon'
}

/** Multi-book combo / bundle SKUs — shown on Discounts only, not in series grids. */
export function isBundleProduct(product: Pick<Product, 'volumeNumber' | 'categoryId'>): boolean {
  return product.volumeNumber <= 0 || product.categoryId === DISCOUNT_BUNDLE_CATEGORY_ID
}

export function toVolumeLabel(volumeNumber: number): string {
  if (volumeNumber <= 0) {
    return 'Bundle'
  }
  const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  return `Volume ${numerals[volumeNumber - 1] ?? String(volumeNumber)}`
}

export function getProductHeadline(product: Pick<Product, 'title' | 'volumeNumber' | 'shortDescription'>): string {
  if (product.volumeNumber <= 0) {
    return `${product.title} — ${product.shortDescription}`
  }
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
  return usableCatalogImages([product.coverImage, ...product.gallery])
}
