import { useParams } from 'react-router-dom'
import { routes } from '@/app/routes'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Container } from '@/components/common/Container'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { PageProse } from '@/components/content/PageProse'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { PageSeo } from '@/components/seo/PageSeo'
import { getCategoryPageCopy } from '@/data/categoryPageCopy'
import { breadcrumbJsonLd, organizationJsonLd } from '@/data/siteSeo'
import { useCategoryBySlug } from '@/hooks/useCategories'
import { useProductsByCategory } from '@/hooks/useProducts'
import { SITE_URL } from '@/utils/constants'
import styles from '../Page.module.css'

export function CategoryPage() {
  const { slug } = useParams()
  const category = useCategoryBySlug(slug)
  const products = useProductsByCategory(slug)
  const origin = typeof window === 'undefined' ? SITE_URL : window.location.origin

  const isLoading = category.isLoading || products.isLoading
  const error = category.error || products.error
  const copy = category.data ? getCategoryPageCopy(category.data) : null

  return (
    <div className={styles.page}>
      {copy && category.data ? (
        <PageSeo
          title={copy.seoTitle}
          description={copy.seoDescription}
          path={routes.category(category.data.slug)}
          jsonLd={[
            organizationJsonLd(origin),
            breadcrumbJsonLd(origin, [
              { name: 'Home', path: routes.home },
              { name: 'Store', path: routes.catalog },
              { name: category.data.title, path: routes.category(category.data.slug) },
            ]),
          ]}
        />
      ) : null}
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
        {category.data && copy ? (
          <>
            <Breadcrumbs
              items={[
                { label: 'Home', to: routes.home },
                { label: 'Store', to: routes.catalog },
                { label: category.data.title },
              ]}
            />
            <PageHeader title={copy.title} description={copy.lead} />
            {copy.paragraphs.length > 0 ? (
              <PageProse>
                {copy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </PageProse>
            ) : null}
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
