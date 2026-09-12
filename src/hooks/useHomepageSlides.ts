import type { HomepageSlide, HomepageSlideKind } from '@/types'
import { homepageSlidesService } from '@/services/homepageSlidesService'
import { useAsyncResource } from './useAsyncResource'

export function useHomepageSlides(kind?: HomepageSlideKind) {
  return useAsyncResource(
    () => homepageSlidesService.getAll(kind),
    kind ? `homepageSlides:${kind}` : 'homepageSlides:all',
  )
}

export type { HomepageSlide }
