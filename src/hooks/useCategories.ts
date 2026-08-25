import type { Category } from '@/types'
import { categoriesService } from '@/services/categoriesService'
import { useAsyncResource } from './useAsyncResource'
import { readCache, writeCache } from './resourceCache'

export function useCategories() {
  return useAsyncResource(() => categoriesService.getAll(), 'categories:all')
}

export function useCategoryBySlug(slug: string | undefined) {
  if (slug) {
    const match = readCache<Category[]>('categories:all')?.find((item) => item.slug === slug)
    if (match) {
      writeCache(`categories:slug:${slug}`, match)
    }
  }

  return useAsyncResource(
    () => (slug ? categoriesService.getBySlug(slug) : Promise.resolve(null)),
    `categories:slug:${slug ?? ''}`,
  )
}
