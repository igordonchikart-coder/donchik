import { Container } from '@/components/common/Container'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { useProducts } from '@/hooks/useProducts'
import { routes } from '@/app/routes'
import styles from '../Page.module.css'

export function DiscountsPage() {
  const { data, isLoading, error, reload } = useProducts()
  const discounted = (data ?? []).filter((product) => product.isOnSale)

  return (
    <div className={styles.page}>
      <Container>
        <PageHeader title="Discounts" description="Sale copies and discounted collections." />
        {isLoading && !data ? <LoadingState /> : null}
        {error ? <ErrorState description={error} onRetry={reload} /> : null}
        {data && discounted.length === 0 ? (
          <EmptyState
            title="No discounted books right now"
            description="Sale volumes will appear here."
            actionLabel="Store"
            actionTo={routes.catalog}
          />
        ) : null}
        {data && discounted.length > 0 ? <ProductGrid products={discounted} /> : null}
      </Container>
    </div>
  )
}
