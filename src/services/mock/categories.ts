import { getMockStore, updateMockStore } from '@/data/mockStore'
import { invalidateCache } from '@/hooks/resourceCache'
import type { Category, CategoryInput } from '@/types'
import { createId, nowIso } from '@/utils/id'

function delay(ms = 160): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export async function getAll(): Promise<Category[]> {
  return getMockStore().categories
}

export async function getBySlug(slug: string): Promise<Category | null> {
  return getMockStore().categories.find((category) => category.slug === slug) ?? null
}

export async function create(input: CategoryInput): Promise<Category> {
  await delay()
  const timestamp = nowIso()
  const category: Category = {
    ...input,
    id: createId(),
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  updateMockStore((state) => ({
    ...state,
    categories: [...state.categories, category],
  }))

  invalidateCache('categories')
  return category
}

export async function update(id: string, input: CategoryInput): Promise<Category> {
  await delay()
  let updated: Category | undefined

  updateMockStore((state) => ({
    ...state,
    categories: state.categories.map((category) => {
      if (category.id !== id) {
        return category
      }
      updated = { ...category, ...input, id, updatedAt: nowIso() }
      return updated
    }),
  }))

  if (!updated) {
    throw new Error('Series not found')
  }

  invalidateCache('categories')
  return updated
}

export async function remove(id: string): Promise<void> {
  await delay()
  updateMockStore((state) => ({
    ...state,
    categories: state.categories.filter((category) => category.id !== id),
  }))
  invalidateCache('categories')
}
