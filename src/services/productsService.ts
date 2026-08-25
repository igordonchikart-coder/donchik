import { isSupabaseConfigured } from './config'
import * as mockProducts from './mock/products'
import * as supabaseProducts from './supabase/products'

const source = isSupabaseConfigured() ? supabaseProducts : mockProducts

export const productsService = {
  getAll: source.getAll,
  getBySlug: source.getBySlug,
  getById: source.getById,
  getByCategorySlug: source.getByCategorySlug,
  getFeatured: source.getFeatured,
  create: source.create,
  update: source.update,
  remove: source.remove,
}
