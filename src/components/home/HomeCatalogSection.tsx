import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { catalogSeriesOrder } from '@/data/catalogSeriesOrder'
import { useCategories } from '@/hooks/useCategories'
import { useProducts } from '@/hooks/useProducts'
import { BookSeriesSection } from './BookSeriesSection'

interface HomeCatalogSectionProps {
  onlyCategoryId?: string
  excludeCategoryId?: string
}

export function HomeCatalogSection({ onlyCategoryId, excludeCategoryId }: HomeCatalogSectionProps) {
  const series = useCategories()
  const products = useProducts()

  if ((series.isLoading || products.isLoading) && !series.data && !products.data) {
    return <LoadingState label="Loading store..." />
  }

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

  if (!seriesList || !productList) {
    return null
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
        />
      ))}
    </>
  )
}
