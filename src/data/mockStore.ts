import type { Category, Order, Product } from '@/types'
import { STORAGE_KEYS } from '@/utils/constants'
import { readJson, writeJson } from '@/utils/storage'
import { mockCategories } from './mockCategories'
import { mockOrders } from './mockOrders'
import { mockProducts } from './mockProducts'

export interface MockStoreState {
  products: Product[]
  categories: Category[]
  orders: Order[]
}

function createSeedState(): MockStoreState {
  return {
    products: mockProducts.map((product) => ({ ...product })),
    categories: mockCategories.map((category) => ({ ...category })),
    orders: mockOrders.map((order) => ({
      ...order,
      customer: { ...order.customer },
      items: order.items.map((item) => ({ ...item })),
    })),
  }
}

function loadState(): MockStoreState {
  const seed = createSeedState()
  const stored = readJson<MockStoreState | null>(STORAGE_KEYS.mockStore, null)
  if (!stored?.products || !stored.categories || !stored.orders) {
    writeJson(STORAGE_KEYS.mockStore, seed)
    return seed
  }

  const imagesById = new Map(seed.products.map((product) => [product.id, product]))
  const storedIds = new Set(stored.products.map((product) => product.id))
  const products = [
    ...stored.products.map((product) => {
      const fresh = imagesById.get(product.id)
      if (!fresh) {
        return product
      }
      return {
        ...product,
        coverImage: fresh.coverImage,
        gallery: fresh.gallery,
        description: fresh.description,
        shortDescription: fresh.shortDescription,
        chapters: fresh.chapters,
        hasVideo: fresh.hasVideo,
        features: fresh.features,
      }
    }),
    ...seed.products.filter((product) => !storedIds.has(product.id)),
  ]

  const productsChanged =
    products.length !== stored.products.length ||
    products.some((product, index) => {
      const previous = stored.products[index]
      return (
        !previous ||
        previous.coverImage !== product.coverImage ||
        previous.gallery.join() !== product.gallery.join() ||
        previous.hasVideo !== product.hasVideo ||
        previous.chapters.length !== product.chapters.length ||
        previous.description !== product.description
      )
    })

  const nextState = { ...stored, products }
  if (productsChanged) {
    writeJson(STORAGE_KEYS.mockStore, nextState)
  }
  return nextState
}

export function getMockStore(): MockStoreState {
  return loadState()
}

export function updateMockStore(
  updater: (state: MockStoreState) => MockStoreState,
): MockStoreState {
  const nextState = updater(loadState())
  writeJson(STORAGE_KEYS.mockStore, nextState)
  return nextState
}

export function attachCategories(products: Product[], categories: Category[]): Product[] {
  return products.map((product) => ({
    ...product,
    category: categories.find((category) => category.id === product.categoryId),
  }))
}
