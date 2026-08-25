import { Container } from '@/components/common/Container'
import { PageHeader } from '@/components/common/PageHeader'
import { AboutAuthorSection } from '@/components/home/AboutAuthorSection'
import styles from '../Page.module.css'

export function AboutPage() {
  return (
    <div className={styles.page}>
      <Container>
        <PageHeader title="About us" />
      </Container>
      <AboutAuthorSection />
    </div>
  )
}
