import { getMockStore, updateMockStore } from '@/data/mockStore'
import { invalidateCache } from '@/hooks/resourceCache'
import type { HomepageSlide, HomepageSlideInput } from '@/types'
import { createId, nowIso } from '@/utils/id'

function delay(ms = 120): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function withSlugs(slide: HomepageSlide): HomepageSlide {
  const store = getMockStore()
  const product = slide.productId
    ? store.products.find((item) => item.id === slide.productId)
    : undefined
  const category = slide.categoryId
    ? store.categories.find((item) => item.id === slide.categoryId)
    : undefined

  return {
    ...slide,
    productSlug: product?.slug ?? null,
    categorySlug: category?.slug ?? null,
  }
}

export async function getAll(kind?: HomepageSlide['kind']): Promise<HomepageSlide[]> {
  const slides = getMockStore().homepageSlides ?? []
  const filtered = kind ? slides.filter((slide) => slide.kind === kind) : slides
  return filtered
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(withSlugs)
}

export async function create(input: HomepageSlideInput): Promise<HomepageSlide> {
  await delay()
  const timestamp = nowIso()
  const slide: HomepageSlide = withSlugs({
    id: createId(),
    ...input,
    productSlug: null,
    categorySlug: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  })

  updateMockStore((state) => ({
    ...state,
    homepageSlides: [...(state.homepageSlides ?? []), slide],
  }))

  invalidateCache('homepageSlides')
  return withSlugs(slide)
}

export async function update(id: string, input: HomepageSlideInput): Promise<HomepageSlide> {
  await delay()
  let updated: HomepageSlide | undefined

  updateMockStore((state) => ({
    ...state,
    homepageSlides: (state.homepageSlides ?? []).map((slide) => {
      if (slide.id !== id) {
        return slide
      }
      updated = withSlugs({
        ...slide,
        ...input,
        id,
        updatedAt: nowIso(),
      })
      return updated
    }),
  }))

  if (!updated) {
    throw new Error('Slide not found')
  }

  invalidateCache('homepageSlides')
  return updated
}

export async function remove(id: string): Promise<void> {
  await delay()
  updateMockStore((state) => ({
    ...state,
    homepageSlides: (state.homepageSlides ?? []).filter((slide) => slide.id !== id),
  }))
  invalidateCache('homepageSlides')
}

export async function reorder(kind: HomepageSlide['kind'], orderedIds: string[]): Promise<void> {
  await delay()
  const order = new Map(orderedIds.map((id, index) => [id, index]))

  updateMockStore((state) => ({
    ...state,
    homepageSlides: (state.homepageSlides ?? []).map((slide) => {
      if (slide.kind !== kind || !order.has(slide.id)) {
        return slide
      }
      return {
        ...slide,
        sortOrder: order.get(slide.id) ?? slide.sortOrder,
        updatedAt: nowIso(),
      }
    }),
  }))

  invalidateCache('homepageSlides')
}
