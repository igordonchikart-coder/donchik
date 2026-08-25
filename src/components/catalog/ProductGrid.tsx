import type { Product } from '@/types'
import { routes } from '@/app/routes'
import { EmptyState } from '@/components/common/EmptyState'
import { ProductCard } from './ProductCard'
import styles from './ProductGrid.module.css'

interface ProductGridProps {
  products: Product[]
  emptyTitle?: string
  emptyDescription?: string
}

export function ProductGrid({
  products,
  emptyTitle = 'No books yet',
  emptyDescription = 'There are no volumes in this selection.',
}: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} actionLabel="Store" actionTo={routes.catalog} />
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
