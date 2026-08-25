import type { Product } from '@/types'
import { getProductHeadline } from '@/utils/product'

export interface ProductPageCopy {
  headline: string
  intro: string[]
  storyTitle: string
  story: string[]
}

const volumeOneCopy: ProductPageCopy = {
  headline: 'Panzer Camouflage Vol. 1 — Wehrmacht Divisions | WWII Reference Art Book.',
  intro: [
    'Start your Panzer Camouflage collection — enjoy €1 collector shipping.',
    'Discover the first Panzer Camouflage volume by Igor Donchik — a globally trusted WWII reference with 180 hand-drawn tank profiles and a 4,8 Trustpilot rating.',
  ],
  storyTitle: 'The Beginning of the Legendary Series',
  story: [
    'Panzer Camouflage Vol. I by Igor Donchik is based on archival research, wartime photographs, and documentary sources. Each plate reconstructs authentic paint patterns, divisional emblems, and field-applied markings for modelers and historians.',
    'The series is built as a long-term reference, drawn by hand, and is trusted by readers worldwide — with a 4,8 Trustpilot rating.',
  ],
}

export function getProductPageCopy(product: Product): ProductPageCopy {
  if (product.slug === 'panzer-camouflage-volume-i') {
    return volumeOneCopy
  }

  const story = product.description
    .split(/(?<=\.)\s+/)
    .map((part) => part.trim())
    .filter(Boolean)

  return {
    headline: getProductHeadline(product),
    intro: [
      product.shortDescription,
      `Discover this volume by Igor Donchik — a WWII reference drawn by hand, with a 4,8 Trustpilot rating.`,
    ],
    storyTitle: `${product.title} ${product.volumeLabel}`,
    story: story.length > 0 ? story : [product.shortDescription],
  }
}
