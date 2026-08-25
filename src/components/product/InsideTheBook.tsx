import type { BookChapter } from '@/types'
import styles from './InsideTheBook.module.css'

interface InsideTheBookProps {
  chapters: BookChapter[]
}

export function InsideTheBook({ chapters }: InsideTheBookProps) {
  if (chapters.length === 0) {
    return null
  }

  return (
    <section className={styles.section} aria-labelledby="inside-the-book">
      <h2 id="inside-the-book" className={styles.title}>
        Inside the Book
      </h2>
      <p className={styles.lead}>The volume contains {chapters.length} richly illustrated chapters:</p>
      <ul className={styles.list}>
        {chapters.map((chapter) => (
          <li key={chapter.title}>
            <strong>{chapter.title}</strong> — {chapter.description}
          </li>
        ))}
      </ul>
    </section>
  )
}
