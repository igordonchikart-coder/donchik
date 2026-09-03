import { symbolsCardSources } from '@/assets/books/military-symbols'
import { panzerVolumeSources } from '@/assets/books/panzer-camouflage'
import { insigniaCardSources } from '@/assets/books/unit-insignia'
import type { Product } from '@/types'

export function isUsableCatalogImage(url: string | undefined | null): boolean {
  const value = url?.trim() ?? ''
  if (!value) {
    return false
  }

  // Vite-dev paths saved from the admin while the site is running locally.
  // They 404 on Vercel because production assets are hashed under /assets/.
  if (/\/src\/assets\//.test(value) || /\/@fs\//.test(value)) {
    return false
  }

  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//i.test(value)) {
    return false
  }

  return true
}

export function usableCatalogImages(urls: Array<string | undefined | null>): string[] {
  const unique: string[] = []

  for (const url of urls) {
    if (!isUsableCatalogImage(url) || unique.includes(url as string)) {
      continue
    }
    unique.push(url as string)
  }

  return unique
}

export function getFramedArtwork(product: Pick<Product, 'categoryId' | 'volumeNumber' | 'isOnSale'>): string | undefined {
  if (product.categoryId === 'series-panzer-camouflage') {
    return panzerVolumeSources[product.volumeNumber as keyof typeof panzerVolumeSources]
  }

  if (product.categoryId === 'series-military-symbols') {
    if (product.isOnSale) {
      return symbolsCardSources.sale
    }
    return symbolsCardSources[product.volumeNumber as keyof typeof symbolsCardSources]
  }

  if (product.categoryId === 'series-unit-insignia') {
    return insigniaCardSources[product.volumeNumber as keyof typeof insigniaCardSources]
  }
}

export function withCatalogArtwork<T extends Product>(product: T): T {
  const artwork = getFramedArtwork(product)
  const gallery = usableCatalogImages(product.gallery)
  const coverImage = isUsableCatalogImage(product.coverImage)
    ? product.coverImage
    : (gallery[0] ?? '')

  if (!artwork) {
    return {
      ...product,
      coverImage,
      gallery,
    }
  }

  if (coverImage && gallery.length > 0) {
    return {
      ...product,
      coverImage,
      gallery,
    }
  }

  return {
    ...product,
    coverImage: coverImage || artwork,
    gallery: gallery.length > 0 ? gallery : [artwork],
  }
}
