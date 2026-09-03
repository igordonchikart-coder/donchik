import { Container } from '@/components/common/Container'
import { ProductGrid } from '@/components/catalog/ProductGrid'
import { getCategoryPageCopy } from '@/data/categoryPageCopy'
import type { Category, Product } from '@/types'
import styles from './BookSeriesSection.module.css'

interface BookSeriesSectionProps {
  series: Category
  products: Product[]
  showTitle?: boolean
  pending?: boolean
}

export function BookSeriesSection({
  series,
  products,
  showTitle = true,
  pending = false,
}: BookSeriesSectionProps) {
  const ordered = [...products].sort(
    (left, right) => Number(left.isOnSale) - Number(right.isOnSale) || left.volumeNumber - right.volumeNumber,
  )
  const copy = getCategoryPageCopy(series)

  return (
    <section
      className={`${styles.section} ${showTitle ? '' : styles.sectionFlush}`}
      aria-labelledby={showTitle ? `series-${series.id}` : undefined}
      aria-busy={pending || undefined}
    >
      <Container>
        {showTitle ? (
          <header className={styles.header}>
            <h2 id={`series-${series.id}`} className={styles.title}>
              {copy.title}
            </h2>
            <p className={styles.lead}>{copy.lead}</p>
          </header>
        ) : null}
        {pending ? (
          <div className={styles.pendingGrid} aria-hidden="true">
            <div className={styles.pendingCard} />
            <div className={styles.pendingCard} />
            <div className={styles.pendingCard} />
          </div>
        ) : (
          <ProductGrid
            products={ordered}
            emptyTitle="No volumes yet"
            emptyDescription="Volumes for this series will appear here."
          />
        )}
      </Container>
    </section>
  )
}
