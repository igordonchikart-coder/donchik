export interface Category {
  id: string
  slug: string
  title: string
  description: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface CategoryInput {
  slug: string
  title: string
  description: string
  image: string
}
