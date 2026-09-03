import { invalidateCache } from '@/hooks/resourceCache'
import { isSupabaseConfigured } from './config'
import * as mockCategories from './mock/categories'
import * as supabaseCategories from './supabase/categories'
import type { Category, CategoryInput } from '@/types'

const source = isSupabaseConfigured() ? supabaseCategories : mockCategories

async function create(input: CategoryInput): Promise<Category> {
  const category = await source.create(input)
  invalidateCache('categories')
  invalidateCache('products')
  return category
}

async function update(id: string, input: CategoryInput): Promise<Category> {
  const category = await source.update(id, input)
  invalidateCache('categories')
  invalidateCache('products')
  return category
}

async function remove(id: string): Promise<void> {
  await source.remove(id)
  invalidateCache('categories')
  invalidateCache('products')
}

export const categoriesService = {
  getAll: source.getAll,
  getBySlug: source.getBySlug,
  create,
  update,
  remove,
}
