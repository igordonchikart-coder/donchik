import { Container } from '@/components/common/Container'
import { HomeCatalogSection } from '@/components/home/HomeCatalogSection'
import styles from './RelatedProducts.module.css'

interface RelatedProductsProps {
  categoryId: string
}

export function RelatedProducts({ categoryId }: RelatedProductsProps) {
  return (
    <section className={styles.section} aria-labelledby="related-products">
      <Container>
        <h2 id="related-products" className={styles.title}>
          Related products:
        </h2>
      </Container>
      <HomeCatalogSection onlyCategoryId={categoryId} showTitle={false} />
    </section>
  )
}
