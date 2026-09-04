import type { BookChapter } from '@/types'
import { isPageMetaChapter } from '@/utils/productPageMeta'
import styles from './InsideTheBook.module.css'

interface InsideTheBookProps {
  chapters: BookChapter[]
}

export function InsideTheBook({ chapters }: InsideTheBookProps) {
  const visible = chapters.filter((chapter) => !isPageMetaChapter(chapter))
  if (visible.length === 0) {
    return null
  }

  return (
    <section className={styles.section} aria-labelledby="inside-the-book">
      <h2 id="inside-the-book" className={styles.title}>
        Inside the Book
      </h2>
      <p className={styles.lead}>The volume contains {visible.length} richly illustrated chapters:</p>
      <ul className={styles.list}>
        {visible.map((chapter) => (
          <li key={chapter.title}>
            <strong>{chapter.title}</strong> — {chapter.description}
          </li>
        ))}
      </ul>
    </section>
  )
}
