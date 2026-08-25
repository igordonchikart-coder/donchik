import { useParams } from 'react-router-dom'
import { routes } from '@/app/routes'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Container } from '@/components/common/Container'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { useCategoryBySlug } from '@/hooks/useCategories'
import { useProductsByCategory } from '@/hooks/useProducts'
import styles from '../Page.module.css'

export function CategoryPage() {
  const { slug } = useParams()
  const category = useCategoryBySlug(slug)
  const products = useProductsByCategory(slug)

  const isLoading = category.isLoading || products.isLoading
  const error = category.error || products.error

  return (
    <div className={styles.page}>
      <Container>
        {isLoading && !category.data ? <LoadingState /> : null}
        {error ? (
          <ErrorState
            description={error}
            onRetry={() => {
              category.reload()
              products.reload()
            }}
          />
        ) : null}
        {!isLoading && !error && !category.data ? (
          <ErrorState title="Series not found" description="Check the page address." />
        ) : null}
        {category.data ? (
          <>
            <Breadcrumbs
              items={[
                { label: 'Home', to: routes.home },
                { label: 'Store', to: routes.catalog },
                { label: category.data.title },
              ]}
            />
            <PageHeader
              title={`«${category.data.title}» book series`}
              description={category.data.description}
            />
            {products.data ? (
              <ProductGrid
                products={products.data}
                emptyTitle="No volumes in this series yet"
                emptyDescription="Books for this series will appear here."
              />
            ) : null}
          </>
        ) : null}
      </Container>
    </div>
  )
}
