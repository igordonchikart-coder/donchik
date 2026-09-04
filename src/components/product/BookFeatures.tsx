import type { ProductSpec } from '@/types'
import styles from './BookFeatures.module.css'

interface BookFeaturesProps {
  features: string[]
  specs: ProductSpec[]
}

export function BookFeatures({ features, specs }: BookFeaturesProps) {
  if (features.length === 0 && specs.length === 0) {
    return null
  }

  return (
    <section className={styles.section} aria-labelledby="book-features">
      <h2 id="book-features" className={styles.title}>
        Book features
      </h2>
      {specs.length > 0 ? (
        <dl className={styles.specs}>
          {specs.map((spec) => (
            <div key={`${spec.label}-${spec.value}`} className={styles.spec}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {features.length > 0 ? (
        <ul className={styles.list}>
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
