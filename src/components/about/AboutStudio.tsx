import { Link } from 'react-router-dom'
import { routes } from '@/app/routes'
import { PageProse } from '@/components/content/PageProse'
import prose from '@/components/content/PageProse.module.css'
import { aboutPageCopy } from '@/data/staticPageCopy'
import { getCategoryPageCopy } from '@/data/categoryPageCopy'
import { catalogSeriesOrder } from '@/data/catalogSeriesOrder'
import { mockCategories } from '@/data/mockCategories'
import { useCategories } from '@/hooks/useCategories'
import styles from './AboutStudio.module.css'

export function AboutStudio() {
  const categories = useCategories()
  const series = catalogSeriesOrder
    .map((slug) => (categories.data ?? mockCategories).find((item) => item.slug === slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <div className={styles.wrap}>
      <PageProse>
        <h2 className={prose.title}>{aboutPageCopy.studioTitle}</h2>
        {aboutPageCopy.studioParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PageProse>

      <section className={styles.series} aria-labelledby="about-series-title">
        <h2 id="about-series-title" className={styles.heading}>
          {aboutPageCopy.seriesTitle}
        </h2>
        <div className={styles.grid}>
          {series.map((item) => {
            const copy = getCategoryPageCopy(item)

            return (
              <Link key={item.id} className={styles.card} to={routes.category(item.slug)}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardText}>{copy.lead}</p>
                <span className={styles.cardLink}>Open the series</span>
              </Link>
            )
          })}
        </div>
      </section>

      <PageProse>
        <h2 className={prose.title}>{aboutPageCopy.methodTitle}</h2>
        {aboutPageCopy.methodParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PageProse>
    </div>
  )
}
