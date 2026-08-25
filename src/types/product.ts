import type { Category } from './category'

export type ProductStatus = 'available' | 'coming-soon'

export interface BookChapter {
  title: string
  description: string
}

export interface Product {
  id: string
  slug: string
  title: string
  volumeNumber: number
  volumeLabel: string
  shortDescription: string
  description: string
  features: string[]
  chapters: BookChapter[]
  price: number
  originalPrice?: number
  currency: string
  coverImage: string
  gallery: string[]
  categoryId: string
  category?: Category
  stock: number
  isAvailable: boolean
  isFeatured: boolean
  isOnSale: boolean
  saleLabel?: string
  deliveryNote?: string
  conditionNote?: string
  status: ProductStatus
  releaseYear?: number
  hasVideo: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductInput {
  slug: string
  title: string
  volumeNumber: number
  volumeLabel: string
  shortDescription: string
  description: string
  features: string[]
  chapters: BookChapter[]
  price: number
  originalPrice?: number
  currency: string
  coverImage: string
  gallery: string[]
  categoryId: string
  stock: number
  isAvailable: boolean
  isFeatured: boolean
  isOnSale: boolean
  saleLabel?: string
  deliveryNote?: string
  conditionNote?: string
  status: ProductStatus
  releaseYear?: number
  hasVideo: boolean
}
