import { useParams } from 'react-router-dom'
import { routes } from '@/app/routes'
import { Container } from '@/components/common/Container'
import { DeferredMount } from '@/components/common/DeferredMount'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { BookFeatures } from '@/components/product/BookFeatures'
import { InsideTheBook } from '@/components/product/InsideTheBook'
import { ProductBelowFold } from '@/components/product/ProductBelowFold'
import { ProductInfoColumns } from '@/components/product/ProductInfoColumns'
import { ProductStory } from '@/components/product/ProductStory'
import { ProductTop } from '@/components/product/ProductTop'
import { ProductVideo } from '@/components/product/ProductVideo'
import { PageSeo } from '@/components/seo/PageSeo'
import { getProductPageCopy } from '@/data/productPageCopy'
import { bookJsonLd, breadcrumbJsonLd, organizationJsonLd, toAbsoluteUrl } from '@/data/siteSeo'
import { useProductBySlug } from '@/hooks/useProducts'
import { SITE_URL } from '@/utils/constants'
import { isComingSoon, isPurchasable } from '@/utils/product'
import styles from '../Page.module.css'

export function ProductPage() {
  const { slug } = useParams()
  const { data, isLoading, error, reload } = useProductBySlug(slug)

  if (!data) {
    return (
      <div className={styles.page}>
        {!isLoading ? (
          <PageSeo
            title="Book not found"
            description="Look up a Panzer Camouflage, Unit Insignia, or Military Symbols volume on the official Igor Donchik Art site."
            path={slug ? routes.product(slug) : routes.catalog}
            noIndex
          />
        ) : null}
        <Container>
          {isLoading ? <LoadingState /> : null}
          {error ? <ErrorState description={error} onRetry={reload} /> : null}
          {!isLoading && !error ? (
            <ErrorState title="Book not found" description="This volume is not in the store." />
          ) : null}
        </Container>
      </div>
    )
  }

  const copy = getProductPageCopy(data)
  const origin = typeof window === 'undefined' ? SITE_URL : window.location.origin
  const path = routes.product(data.slug)
  const categoryPath = data.category ? routes.category(data.category.slug) : routes.catalog

  return (
    <div className={styles.page}>
      <PageSeo
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={path}
        image={data.coverImage}
        type="product"
        jsonLd={[
          organizationJsonLd(origin),
          bookJsonLd({
            origin,
            name: copy.headline,
            description: copy.seoDescription,
            url: toAbsoluteUrl(path, origin),
            image: toAbsoluteUrl(data.coverImage, origin),
            price: data.price,
            currency: data.currency,
            available: isPurchasable(data),
            comingSoon: isComingSoon(data),
            isbn: copy.isbn,
          }),
          breadcrumbJsonLd(origin, [
            { name: 'Home', path: routes.home },
            { name: 'Store', path: routes.catalog },
            { name: data.category?.title ?? 'Series', path: categoryPath },
            { name: `${data.title} ${data.volumeLabel}`, path },
          ]),
        ]}
      />
      <Container>
        <div key={data.id}>
          <ProductTop product={data} />
          <BookFeatures features={copy.features} specs={copy.specs} />
          <ProductInfoColumns />
          <ProductStory product={data} />
          <InsideTheBook chapters={copy.chapters} />
          <DeferredMount minHeight="28rem">
            <ProductVideo />
          </DeferredMount>
        </div>
      </Container>
      <ProductBelowFold product={data} />
    </div>
  )
}
