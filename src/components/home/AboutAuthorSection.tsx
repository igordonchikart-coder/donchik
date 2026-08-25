import { Container } from '@/components/common/Container'
import { AboutAuthorCopy } from './AboutAuthorCopy'
import { AboutAuthorPortrait } from './AboutAuthorPortrait'
import { AboutAuthorSocials } from './AboutAuthorSocials'
import styles from './AboutAuthorSection.module.css'

export function AboutAuthorSection() {
  return (
    <section className={styles.section} aria-labelledby="about-author-title">
      <Container className={styles.inner}>
        <AboutAuthorPortrait />
        <AboutAuthorCopy />
        <AboutAuthorSocials />
      </Container>
    </section>
  )
}
