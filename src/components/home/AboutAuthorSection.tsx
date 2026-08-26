import { Container } from '@/components/common/Container'
import { AboutAuthorCopy } from './AboutAuthorCopy'
import { AboutAuthorPortrait } from './AboutAuthorPortrait'
import { AboutAuthorSocials } from './AboutAuthorSocials'
import styles from './AboutAuthorSection.module.css'

interface AboutAuthorSectionProps {
  compact?: boolean
}

export function AboutAuthorSection({ compact = false }: AboutAuthorSectionProps) {
  return (
    <section
      className={`${styles.section} ${compact ? styles.compact : ''}`}
      aria-labelledby="about-author-title"
    >
      <Container className={styles.inner}>
        <AboutAuthorPortrait />
        <AboutAuthorCopy />
        <AboutAuthorSocials />
      </Container>
    </section>
  )
}
