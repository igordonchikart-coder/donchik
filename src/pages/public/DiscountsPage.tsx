import { Container } from '@/components/common/Container'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { PageProse } from '@/components/content/PageProse'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { PageSeo } from '@/components/seo/PageSeo'
import { catalogSeriesOrder } from '@/data/catalogSeriesOrder'
import { discountsPageCopy } from '@/data/staticPageCopy'
import { useProducts } from '@/hooks/useProducts'
import { routes } from '@/app/routes'
import styles from '../Page.module.css'

export function DiscountsPage() {
  const { data, isLoading, error, reload } = useProducts()
  const seriesRank = new Map(catalogSeriesOrder.map((slug, index) => [slug, index]))
  const discounted = (data ?? [])
    .filter((product) => product.isOnSale)
    .slice()
    .sort((left, right) => {
      const leftRank = seriesRank.get(left.category?.slug ?? '') ?? catalogSeriesOrder.length
      const rightRank = seriesRank.get(right.category?.slug ?? '') ?? catalogSeriesOrder.length
      return leftRank - rightRank || left.volumeNumber - right.volumeNumber || left.title.localeCompare(right.title)
    })

  return (
    <div className={styles.page}>
      <PageSeo
        title={discountsPageCopy.seoTitle}
        description={discountsPageCopy.seoDescription}
        path={routes.discounts}
      />
      <Container>
        <PageHeader title={discountsPageCopy.title} description={discountsPageCopy.description} />
        <PageProse>
          {discountsPageCopy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </PageProse>
        {isLoading && !data ? <LoadingState /> : null}
        {error ? <ErrorState description={error} onRetry={reload} /> : null}
        {data && discounted.length === 0 ? (
          <EmptyState
            title="No discounted books right now"
            description="Sale volumes will appear here when a cover is marked down."
            actionLabel="Store"
            actionTo={routes.catalog}
          />
        ) : null}
        {data && discounted.length > 0 ? <ProductGrid products={discounted} /> : null}
      </Container>
    </div>
  )
}
