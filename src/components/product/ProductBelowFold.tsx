import { CtaSlider } from '@/components/home/CtaSlider'
import { HomeCatalogSection } from '@/components/home/HomeCatalogSection'
import { RelatedProducts } from '@/components/product/RelatedProducts'
import type { Product } from '@/types'

interface ProductBelowFoldProps {
  product: Product
}

export function ProductBelowFold({ product }: ProductBelowFoldProps) {
  return (
    <>
      <RelatedProducts categoryId={product.categoryId} />
      <CtaSlider />
      <HomeCatalogSection excludeCategoryId={product.categoryId} />
    </>
  )
}
