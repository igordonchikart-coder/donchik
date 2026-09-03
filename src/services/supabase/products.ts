import type { Category } from '@/types'
import type { BookChapter, Product, ProductInput, ProductStatus } from '@/types/product'
import { toVolumeLabel } from '@/utils/product'
import { withCatalogArtwork } from '@/utils/catalogArtwork'
import { getSupabaseClient } from './client'

interface ProductRow {
  id: string
  slug: string
  title: string
  short_description: string
  description: string
  price: number
  original_price?: number | null
  currency: string
  cover_image: string
  gallery: string[] | null
  page_gallery?: string[] | null
  category_id: string
  stock: number
  is_available: boolean
  is_featured: boolean
  is_on_sale?: boolean | null
  sale_label?: string | null
  delivery_note?: string | null
  condition_note?: string | null
  status?: ProductStatus | null
  volume_number?: number | null
  features?: string[] | null
  chapters?: BookChapter[] | null
  release_year?: number | null
  has_video?: boolean | null
  created_at: string
  updated_at: string
  category?: Category | null
}

function mapProduct(row: ProductRow): Product {
  const volumeNumber = row.volume_number ?? 1
  return withCatalogArtwork({
    id: row.id,
    slug: row.slug,
    title: row.title,
    volumeNumber,
    volumeLabel: toVolumeLabel(volumeNumber),
    shortDescription: row.short_description,
    description: row.description,
    features: Array.isArray(row.features) ? row.features : [],
    chapters: Array.isArray(row.chapters) ? row.chapters : [],
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    currency: row.currency,
    coverImage: row.cover_image,
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    pageGallery: Array.isArray(row.page_gallery) ? row.page_gallery : [],
    categoryId: row.category_id,
    category: row.category ?? undefined,
    stock: row.stock,
    isAvailable: row.is_available,
    isFeatured: row.is_featured,
    isOnSale: row.is_on_sale ?? false,
    saleLabel: row.sale_label ?? undefined,
    deliveryNote: row.delivery_note ?? undefined,
    conditionNote: row.condition_note ?? undefined,
    status: row.status ?? 'available',
    releaseYear: row.release_year ?? undefined,
    hasVideo: row.has_video ?? false,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  })
}

function toRow(input: ProductInput) {
  return {
    slug: input.slug,
    title: input.title,
    short_description: input.shortDescription,
    description: input.description,
    price: input.price,
    original_price: input.originalPrice ?? null,
    currency: input.currency,
    cover_image: input.coverImage,
    gallery: input.gallery,
    page_gallery: input.pageGallery,
    category_id: input.categoryId,
    stock: input.stock,
    is_available: input.isAvailable,
    is_featured: input.isFeatured,
    is_on_sale: input.isOnSale,
    sale_label: input.saleLabel ?? null,
    delivery_note: input.deliveryNote ?? null,
    condition_note: input.conditionNote ?? null,
    status: input.status,
    volume_number: input.volumeNumber,
    features: input.features,
    chapters: input.chapters,
    release_year: input.releaseYear ?? null,
    has_video: input.hasVideo,
  }
}

const selectQuery = '*, category:categories(*)'

export async function getAll(): Promise<Product[]> {
  const { data, error } = await getSupabaseClient()
    .from('products')
    .select(selectQuery)
    .order('created_at', { ascending: false })
    .order('id', { ascending: true })

  if (error) {
    throw error
  }

  return (data as ProductRow[]).map(mapProduct)
}

export async function getBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await getSupabaseClient()
    .from('products')
    .select(selectQuery)
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data ? mapProduct(data as ProductRow) : null
}

export async function getById(id: string): Promise<Product | null> {
  const { data, error } = await getSupabaseClient()
    .from('products')
    .select(selectQuery)
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data ? mapProduct(data as ProductRow) : null
}

export async function getByCategorySlug(slug: string): Promise<Product[]> {
  const { data: category, error: categoryError } = await getSupabaseClient()
    .from('categories')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (categoryError) {
    throw categoryError
  }

  if (!category) {
    return []
  }

  const { data, error } = await getSupabaseClient()
    .from('products')
    .select(selectQuery)
    .eq('category_id', category.id)
    .order('volume_number', { ascending: true })
    .order('created_at', { ascending: true })
    .order('id', { ascending: true })

  if (error) {
    throw error
  }

  return (data as ProductRow[]).map(mapProduct)
}

export async function getFeatured(): Promise<Product[]> {
  const { data, error } = await getSupabaseClient()
    .from('products')
    .select(selectQuery)
    .eq('is_featured', true)
    .eq('is_available', true)
    .order('created_at', { ascending: false })
    .order('id', { ascending: true })

  if (error) {
    throw error
  }

  return (data as ProductRow[]).map(mapProduct)
}

export async function create(input: ProductInput): Promise<Product> {
  const { data, error } = await getSupabaseClient()
    .from('products')
    .insert(toRow(input))
    .select(selectQuery)
    .single()

  if (error) {
    throw error
  }

  return mapProduct(data as ProductRow)
}

export async function update(id: string, input: ProductInput): Promise<Product> {
  const { data, error } = await getSupabaseClient()
    .from('products')
    .update({ ...toRow(input), updated_at: new Date().toISOString() })
    .eq('id', id)
    .select(selectQuery)
    .single()

  if (error) {
    throw error
  }

  return mapProduct(data as ProductRow)
}

export async function remove(id: string): Promise<void> {
  const { error } = await getSupabaseClient().from('products').delete().eq('id', id)

  if (error) {
    throw error
  }
}
