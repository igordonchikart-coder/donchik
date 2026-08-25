import { homeStats } from '@/data/homeStats'
import { getProductPageCopy } from '@/data/productPageCopy'
import { ProductIntroText } from './ProductIntroText'
import type { Product } from '@/types'
import styles from './ProductStory.module.css'

interface ProductStoryProps {
  product: Product
}

export function ProductStory({ product }: ProductStoryProps) {
  const copy = getProductPageCopy(product)
  const trustpilot = homeStats.find((stat) => stat.id === 'trustpilot')

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
          trustpilotLabel={trustpilot ? `${trustpilot.value} Trustpilot rating` : null}
        />
      ))}
    </section>
  )
}
