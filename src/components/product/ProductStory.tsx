import { getProductPageCopy } from '@/data/productPageCopy'
import { useTrustpilot } from '@/hooks/useTrustpilot'
import { ProductIntroText } from './ProductIntroText'
import type { Product } from '@/types'
import styles from './ProductStory.module.css'

interface ProductStoryProps {
  product: Product
}

export function ProductStory({ product }: ProductStoryProps) {
  const copy = getProductPageCopy(product)
  const trustpilot = useTrustpilot()

  if (copy.story.length === 0) {
    return null
  }

  return (
    <section className={styles.section} aria-labelledby="product-story-title">
      <h2 id="product-story-title" className={styles.title}>
        {copy.storyTitle}
      </h2>
      {copy.story.map((paragraph) => (
        <ProductIntroText
          key={paragraph}
          text={paragraph}
          ratingLabel={trustpilot.ratingLabel}
        />
      ))}
      {copy.audience.length > 0 ? (
        <div className={styles.audience}>
          <h3 className={styles.audienceTitle}>{copy.audienceTitle}</h3>
          <ul className={styles.audienceList}>
            {copy.audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
