import { isSupabaseConfigured } from './config'
import * as mockCategories from './mock/categories'
import * as supabaseCategories from './supabase/categories'

const source = isSupabaseConfigured() ? supabaseCategories : mockCategories

export const categoriesService = {
  getAll: source.getAll,
  getBySlug: source.getBySlug,
  create: source.create,
  update: source.update,
  remove: source.remove,
}
