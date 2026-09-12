import { invalidateCache } from '@/hooks/resourceCache'
import { isSupabaseConfigured } from './config'
import * as mockHomepageSlides from './mock/homepageSlides'
import * as supabaseHomepageSlides from './supabase/homepageSlides'
import type { HomepageSlide, HomepageSlideInput, HomepageSlideKind } from '@/types'

const source = isSupabaseConfigured() ? supabaseHomepageSlides : mockHomepageSlides

async function create(input: HomepageSlideInput): Promise<HomepageSlide> {
  const slide = await source.create(input)
  invalidateCache('homepageSlides')
  return slide
}

async function update(id: string, input: HomepageSlideInput): Promise<HomepageSlide> {
  const slide = await source.update(id, input)
  invalidateCache('homepageSlides')
  return slide
}

async function remove(id: string): Promise<void> {
  await source.remove(id)
  invalidateCache('homepageSlides')
}

async function reorder(kind: HomepageSlideKind, orderedIds: string[]): Promise<void> {
  await source.reorder(kind, orderedIds)
  invalidateCache('homepageSlides')
}

export const homepageSlidesService = {
  getAll: source.getAll,
  create,
  update,
  remove,
  reorder,
}
