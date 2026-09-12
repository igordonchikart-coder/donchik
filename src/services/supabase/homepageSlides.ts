import type { HomepageSlide, HomepageSlideInput } from '@/types'
import { getSupabaseClient } from './client'

interface ProductJoin {
  id: string
  slug: string
}

interface CategoryJoin {
  id: string
  slug: string
}

interface HomepageSlideRow {
  id: string
  kind: 'hero' | 'cta'
  title: string
  label: string
  image: string
  link_type: 'product' | 'category' | 'discounts'
  product_id: string | null
  category_id: string | null
  sort_order: number
  created_at: string
  updated_at: string
  product: ProductJoin | ProductJoin[] | null
  category: CategoryJoin | CategoryJoin[] | null
}

function firstJoin<T>(value: T | T[] | null): T | null {
  if (!value) {
    return null
  }
  return Array.isArray(value) ? (value[0] ?? null) : value
}

function mapSlide(row: HomepageSlideRow): HomepageSlide {
  const product = firstJoin(row.product)
  const category = firstJoin(row.category)
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    label: row.label,
    image: row.image,
    linkType: row.link_type,
    productId: row.product_id,
    productSlug: product?.slug ?? null,
    categoryId: row.category_id,
    categorySlug: category?.slug ?? null,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

const selectQuery = '*, product:products(id, slug), category:categories(id, slug)'

export async function getAll(kind?: HomepageSlide['kind']): Promise<HomepageSlide[]> {
  let query = getSupabaseClient().from('homepage_slides').select(selectQuery).order('sort_order')

  if (kind) {
    query = query.eq('kind', kind)
  }

  const { data, error } = await query

  if (error) {
    // Table not migrated yet — storefront falls back to static slides.
    if (error.code === 'PGRST205' || /homepage_slides/i.test(error.message)) {
      return []
    }
    throw error
  }

  return (data as HomepageSlideRow[]).map(mapSlide)
}

export async function create(input: HomepageSlideInput): Promise<HomepageSlide> {
  const { data, error } = await getSupabaseClient()
    .from('homepage_slides')
    .insert({
      kind: input.kind,
      title: input.title,
      label: input.label,
      image: input.image,
      link_type: input.linkType,
      product_id: input.productId,
      category_id: input.categoryId,
      sort_order: input.sortOrder,
    })
    .select(selectQuery)
    .single()

  if (error) {
    throw error
  }

  return mapSlide(data as HomepageSlideRow)
}

export async function update(id: string, input: HomepageSlideInput): Promise<HomepageSlide> {
  const { data, error } = await getSupabaseClient()
    .from('homepage_slides')
    .update({
      kind: input.kind,
      title: input.title,
      label: input.label,
      image: input.image,
      link_type: input.linkType,
      product_id: input.productId,
      category_id: input.categoryId,
      sort_order: input.sortOrder,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select(selectQuery)
    .single()

  if (error) {
    throw error
  }

  return mapSlide(data as HomepageSlideRow)
}

export async function remove(id: string): Promise<void> {
  const { error } = await getSupabaseClient().from('homepage_slides').delete().eq('id', id)

  if (error) {
    throw error
  }
}

export async function reorder(kind: HomepageSlide['kind'], orderedIds: string[]): Promise<void> {
  const client = getSupabaseClient()
  const updates = orderedIds.map((id, index) =>
    client
      .from('homepage_slides')
      .update({ sort_order: index, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('kind', kind),
  )

  const results = await Promise.all(updates)
  const failed = results.find((result) => result.error)
  if (failed?.error) {
    throw failed.error
  }
}
