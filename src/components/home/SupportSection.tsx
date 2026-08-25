import { SupportDonateRow } from './SupportDonateRow'
import { SupportIntro } from './SupportIntro'
import { Container } from '@/components/common/Container'
import styles from './SupportSection.module.css'

export function SupportSection() {
  return (
    <section className={styles.section} aria-labelledby="support-title">
      <Container>
        <SupportIntro />
        <SupportDonateRow />
      </Container>
    </section>
  )
}
