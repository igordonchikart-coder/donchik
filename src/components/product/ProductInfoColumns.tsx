import { ProductNotices } from './ProductNotices'
import { ProductShippingNotes } from './ProductShippingNotes'
import styles from './ProductInfoColumns.module.css'

export function ProductInfoColumns() {
  return (
    <section className={styles.row} aria-label="Shipping and order information">
      <ProductShippingNotes />
      <ProductNotices />
    </section>
  )
}
