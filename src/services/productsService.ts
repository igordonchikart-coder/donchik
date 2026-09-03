import { invalidateCache } from '@/hooks/resourceCache'
import { isSupabaseConfigured } from './config'
import * as mockProducts from './mock/products'
import * as supabaseProducts from './supabase/products'
import type { Product, ProductInput } from '@/types'

const source = isSupabaseConfigured() ? supabaseProducts : mockProducts

async function create(input: ProductInput): Promise<Product> {
  const product = await source.create(input)
  invalidateCache('products')
  return product
}

async function update(id: string, input: ProductInput): Promise<Product> {
  const product = await source.update(id, input)
  invalidateCache('products')
  return product
}

async function remove(id: string): Promise<void> {
  await source.remove(id)
  invalidateCache('products')
}

export const productsService = {
  getAll: source.getAll,
  getBySlug: source.getBySlug,
  getById: source.getById,
  getByCategorySlug: source.getByCategorySlug,
  getFeatured: source.getFeatured,
  create,
  update,
  remove,
}
