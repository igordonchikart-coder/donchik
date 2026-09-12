import { routes } from '@/app/routes'
import type { HomepageSlide, HomepageSlideLinkType } from '@/types'

export function resolveHomepageSlidePath(slide: {
  linkType: HomepageSlideLinkType
  productSlug: string | null
  categorySlug: string | null
}): string {
  if (slide.linkType === 'product' && slide.productSlug) {
    return routes.product(slide.productSlug)
  }
  if (slide.linkType === 'category' && slide.categorySlug) {
    return routes.category(slide.categorySlug)
  }
  return routes.discounts
}

export function toHeroSlideView(slide: HomepageSlide) {
  return {
    id: slide.id,
    title: slide.title,
    volumeLabel: slide.label,
    image: slide.image,
    to: resolveHomepageSlidePath(slide),
  }
}

export function toCtaSlideView(slide: HomepageSlide) {
  return {
    id: slide.id,
    title: slide.title,
    discountLabel: slide.label,
    image: slide.image,
    to: resolveHomepageSlidePath(slide),
  }
}
