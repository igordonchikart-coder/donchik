import { aboutAuthorHeading, aboutAuthorParagraphs } from '@/data/aboutAuthor'
import styles from './AboutAuthorCopy.module.css'

export function AboutAuthorCopy() {
  return (
    <>
      <h2 id="about-author-title" className={styles.title}>
        {aboutAuthorHeading}
      </h2>
      {aboutAuthorParagraphs.map((paragraph) => (
        <p key={paragraph} className={styles.text}>
          {paragraph}
        </p>
      ))}
    </>
  )
}
