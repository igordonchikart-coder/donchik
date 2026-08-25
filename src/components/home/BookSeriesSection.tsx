import { Container } from '@/components/common/Container'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import type { Category, Product } from '@/types'
import styles from './BookSeriesSection.module.css'

interface BookSeriesSectionProps {
  series: Category
  products: Product[]
}

export function BookSeriesSection({ series, products }: BookSeriesSectionProps) {
  const ordered = [...products].sort(
    (left, right) => Number(left.isOnSale) - Number(right.isOnSale) || left.volumeNumber - right.volumeNumber,
  )

  return (
    <section className={styles.section} aria-labelledby={`series-${series.id}`}>
      <Container>
        <h2 id={`series-${series.id}`} className={styles.title}>
          «{series.title}» book series
        </h2>
        <ProductGrid
          products={ordered}
          emptyTitle="No volumes yet"
          emptyDescription="Volumes for this series will appear here."
        />
      </Container>
    </section>
  )
}
