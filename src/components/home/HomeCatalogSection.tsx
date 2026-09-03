import { ErrorState } from '@/components/common/ErrorState'
import { catalogSeriesOrder } from '@/data/catalogSeriesOrder'
import { getCategoryCopyBySlug } from '@/data/categoryPageCopy'
import { useCategories } from '@/hooks/useCategories'
import { useProducts } from '@/hooks/useProducts'
import type { Category } from '@/types'
import { BookSeriesSection } from './BookSeriesSection'

interface HomeCatalogSectionProps {
  onlyCategoryId?: string
  excludeCategoryId?: string
  showTitle?: boolean
}

function placeholderSeries(slug: string): Category {
  const copy = getCategoryCopyBySlug(slug)
  return {
    id: `pending:${slug}`,
    slug,
    title: copy?.title ?? slug,
    description: copy?.lead ?? '',
    image: '',
    createdAt: '',
    updatedAt: '',
  }
}

export function HomeCatalogSection({
  onlyCategoryId,
  excludeCategoryId,
  showTitle = true,
}: HomeCatalogSectionProps) {
  const series = useCategories()
  const products = useProducts()

  if (series.error || products.error) {
    return (
      <ErrorState
        description={series.error || products.error || 'Unable to load store'}
        onRetry={() => {
          series.reload()
          products.reload()
        }}
      />
    )
  }

  const seriesList = series.data
  const productList = products.data
  const pending = !seriesList || !productList

  if (pending) {
    return (
      <>
        {catalogSeriesOrder.map((slug) => (
          <BookSeriesSection
            key={slug}
            series={placeholderSeries(slug)}
            products={[]}
            showTitle={showTitle}
            pending
          />
        ))}
      </>
    )
  }

  const orderedSeries = catalogSeriesOrder
    .map((slug) => seriesList.find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .filter((item) => (onlyCategoryId ? item.id === onlyCategoryId : true))
    .filter((item) => (excludeCategoryId ? item.id !== excludeCategoryId : true))

  return (
    <>
      {orderedSeries.map((item) => (
        <BookSeriesSection
          key={item.id}
          series={item}
          products={productList.filter((product) => product.categoryId === item.id)}
          showTitle={showTitle}
        />
      ))}
    </>
  )
}
