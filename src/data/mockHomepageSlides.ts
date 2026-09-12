import type { HomepageSlide } from '@/types'
import { mockCategories } from './mockCategories'
import { mockProducts } from './mockProducts'
import { heroSlides as staticHeroSlides } from './heroSlides'
import { ctaSlides as staticCtaSlides } from './ctaSlides'

function productBySlug(slug: string) {
  return mockProducts.find((product) => product.slug === slug)
}

function categoryBySlug(slug: string) {
  return mockCategories.find((category) => category.slug === slug)
}

function parseProductSlugFromPath(path: string): string | null {
  const match = path.match(/^\/product\/([^/]+)/)
  return match?.[1] ?? null
}

function parseCategorySlugFromPath(path: string): string | null {
  const match = path.match(/^\/category\/([^/]+)/)
  return match?.[1] ?? null
}

function seedHeroSlides(): HomepageSlide[] {
  const timestamp = '2026-01-01T00:00:00.000Z'
  return staticHeroSlides.map((slide, index) => {
    const slug = parseProductSlugFromPath(slide.to)
    const product = slug ? productBySlug(slug) : undefined
    return {
      id: `mock-hero-${index + 1}`,
      kind: 'hero' as const,
      title: slide.title,
      label: slide.volumeLabel,
      image: product?.coverImage || slide.image,
      linkType: 'product' as const,
      productId: product?.id ?? null,
      productSlug: product?.slug ?? slug,
      categoryId: null,
      categorySlug: null,
      sortOrder: index,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
  })
}

function seedCtaSlides(): HomepageSlide[] {
  const timestamp = '2026-01-01T00:00:00.000Z'
  return staticCtaSlides.map((slide, index) => {
    const productSlug = parseProductSlugFromPath(slide.to)
    const categorySlug = parseCategorySlugFromPath(slide.to)
    const product = productSlug ? productBySlug(productSlug) : undefined
    const category = categorySlug ? categoryBySlug(categorySlug) : undefined
    const linkType = product
      ? ('product' as const)
      : category
        ? ('category' as const)
        : ('discounts' as const)

    return {
      id: `mock-cta-${index + 1}`,
      kind: 'cta' as const,
      title: slide.title,
      label: slide.discountLabel,
      image: product?.coverImage || category?.image || slide.image,
      linkType,
      productId: product?.id ?? null,
      productSlug: product?.slug ?? null,
      categoryId: category?.id ?? null,
      categorySlug: category?.slug ?? null,
      sortOrder: index,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
  })
}

export const mockHomepageSlides: HomepageSlide[] = [...seedHeroSlides(), ...seedCtaSlides()]
