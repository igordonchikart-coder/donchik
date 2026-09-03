import { symbolsCardSources } from '@/assets/books/military-symbols'
import { panzerVolumeSources } from '@/assets/books/panzer-camouflage'
import { insigniaCardSources } from '@/assets/books/unit-insignia'
import type { Product } from '@/types'

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
  if (!artwork) {
    return product
  }

  if (product.coverImage && product.gallery.length > 0) {
    return product
  }

  return {
    ...product,
    coverImage: product.coverImage || artwork,
    gallery: product.gallery.length > 0 ? product.gallery : [artwork],
  }
}
