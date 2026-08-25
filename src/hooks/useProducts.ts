import type { Product } from '@/types'
import { productsService } from '@/services/productsService'
import { useAsyncResource } from './useAsyncResource'
import { readCache, writeCache } from './resourceCache'

function rememberProduct(product: Product) {
  writeCache(`products:slug:${product.slug}`, product)
  writeCache(`products:id:${product.id}`, product)
}

export function useProducts() {
  return useAsyncResource(() => productsService.getAll(), 'products:all')
}

export function useProductBySlug(slug: string | undefined) {
  if (slug) {
    const match = readCache<Product[]>('products:all')?.find((item) => item.slug === slug)
    if (match) {
      rememberProduct(match)
    }
  }

  return useAsyncResource(
    () => (slug ? productsService.getBySlug(slug) : Promise.resolve(null)),
    `products:slug:${slug ?? ''}`,
  )
}

export function useProductById(id: string | undefined) {
  if (id) {
    const match = readCache<Product[]>('products:all')?.find((item) => item.id === id)
    if (match) {
      rememberProduct(match)
    }
  }

  return useAsyncResource(
    () => (id ? productsService.getById(id) : Promise.resolve(null)),
    `products:id:${id ?? ''}`,
  )
}

export function useProductsByCategory(slug: string | undefined) {
  if (slug) {
    const products = readCache<Product[]>('products:all')
    if (products) {
      writeCache(
        `products:category:${slug}`,
        products.filter((item) => item.category?.slug === slug),
      )
    }
  }

  return useAsyncResource(
    () => (slug ? productsService.getByCategorySlug(slug) : Promise.resolve([])),
    `products:category:${slug ?? ''}`,
  )
}
