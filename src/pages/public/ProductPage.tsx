import { useParams } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { DeferredMount } from '@/components/common/DeferredMount'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { InsideTheBook } from '@/components/product/InsideTheBook'
import { ProductBelowFold } from '@/components/product/ProductBelowFold'
import { ProductInfoColumns } from '@/components/product/ProductInfoColumns'
import { ProductStory } from '@/components/product/ProductStory'
import { ProductTop } from '@/components/product/ProductTop'
import { ProductVideo } from '@/components/product/ProductVideo'
import { useProductBySlug } from '@/hooks/useProducts'
import styles from '../Page.module.css'

export function ProductPage() {
  const { slug } = useParams()
  const { data, isLoading, error, reload } = useProductBySlug(slug)

  return (
    <div className={styles.page}>
      <Container>
        {isLoading && !data ? <LoadingState /> : null}
        {error ? <ErrorState description={error} onRetry={reload} /> : null}
        {!isLoading && !error && !data ? (
          <ErrorState title="Book not found" description="This volume is not in the store." />
        ) : null}
        {data ? (
          <div key={data.id}>
            <ProductTop product={data} />
            <ProductInfoColumns />
            <ProductStory product={data} />
            <InsideTheBook chapters={data.chapters} />
            <DeferredMount minHeight="28rem">
              <ProductVideo />
            </DeferredMount>
          </div>
        ) : null}
      </Container>
      {data ? <ProductBelowFold product={data} /> : null}
    </div>
  )
}
