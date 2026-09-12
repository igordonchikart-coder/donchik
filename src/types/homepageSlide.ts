export type HomepageSlideKind = 'hero' | 'cta'

export type HomepageSlideLinkType = 'product' | 'category' | 'discounts'

export interface HomepageSlide {
  id: string
  kind: HomepageSlideKind
  title: string
  label: string
  image: string
  linkType: HomepageSlideLinkType
  productId: string | null
  productSlug: string | null
  categoryId: string | null
  categorySlug: string | null
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface HomepageSlideInput {
  kind: HomepageSlideKind
  title: string
  label: string
  image: string
  linkType: HomepageSlideLinkType
  productId: string | null
  categoryId: string | null
  sortOrder: number
}
