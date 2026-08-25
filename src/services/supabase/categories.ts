import type { Category, CategoryInput } from '@/types'
import { getSupabaseClient } from './client'

interface CategoryRow {
  id: string
  slug: string
  title: string
  description: string
  image: string
  created_at: string
  updated_at: string
}

function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    image: row.image,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function getAll(): Promise<Category[]> {
  const { data, error } = await getSupabaseClient()
    .from('categories')
    .select('*')
    .order('title')

  if (error) {
    throw error
  }

  return (data as CategoryRow[]).map(mapCategory)
}

export async function getBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await getSupabaseClient()
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data ? mapCategory(data as CategoryRow) : null
}

export async function create(input: CategoryInput): Promise<Category> {
  const { data, error } = await getSupabaseClient()
    .from('categories')
    .insert(input)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return mapCategory(data as CategoryRow)
}

export async function update(id: string, input: CategoryInput): Promise<Category> {
  const { data, error } = await getSupabaseClient()
    .from('categories')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return mapCategory(data as CategoryRow)
}

export async function remove(id: string): Promise<void> {
  const { error } = await getSupabaseClient().from('categories').delete().eq('id', id)

  if (error) {
    throw error
  }
}
