import { attachCategories, getMockStore, updateMockStore } from '@/data/mockStore'
import { invalidateCache } from '@/hooks/resourceCache'
import type { Product, ProductInput } from '@/types'
import { createId, nowIso } from '@/utils/id'

function delay(ms = 180): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export async function getAll(): Promise<Product[]> {
  const store = getMockStore()
  return attachCategories(store.products, store.categories)
}

export async function getBySlug(slug: string): Promise<Product | null> {
  const store = getMockStore()
  const product = store.products.find((item) => item.slug === slug)
  return product ? attachCategories([product], store.categories)[0] : null
}

export async function getById(id: string): Promise<Product | null> {
  const store = getMockStore()
  const product = store.products.find((item) => item.id === id)
  return product ? attachCategories([product], store.categories)[0] : null
}

export async function getByCategorySlug(slug: string): Promise<Product[]> {
  const store = getMockStore()
  const category = store.categories.find((item) => item.slug === slug)
  if (!category) {
    return []
  }

  return attachCategories(
    store.products.filter((item) => item.categoryId === category.id),
    store.categories,
  )
}

export async function getFeatured(): Promise<Product[]> {
  const store = getMockStore()
  return attachCategories(
    store.products.filter((item) => item.isFeatured && item.isAvailable),
    store.categories,
  )
}

export async function create(input: ProductInput): Promise<Product> {
  await delay()
  const timestamp = nowIso()
  const product: Product = {
    ...input,
    id: createId(),
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  const store = updateMockStore((state) => ({
    ...state,
    products: [product, ...state.products],
  }))

  invalidateCache('products')
  return attachCategories([product], store.categories)[0]
}

export async function update(id: string, input: ProductInput): Promise<Product> {
  await delay()
  let updated: Product | undefined

  const store = updateMockStore((state) => {
    const products = state.products.map((product) => {
      if (product.id !== id) {
        return product
      }
      updated = {
        ...product,
        ...input,
        id,
        updatedAt: nowIso(),
      }
      return updated
    })

    return { ...state, products }
  })

  if (!updated) {
    throw new Error('Book not found')
  }

  invalidateCache('products')
  return attachCategories([updated], store.categories)[0]
}

export async function remove(id: string): Promise<void> {
  await delay()
  updateMockStore((state) => ({
    ...state,
    products: state.products.filter((product) => product.id !== id),
  }))
  invalidateCache('products')
}
