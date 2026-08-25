import { Container } from '@/components/common/Container'
import { PageHeader } from '@/components/common/PageHeader'
import { FooterContact } from '@/components/layout/FooterContact'
import { SITE_NAME } from '@/utils/constants'
import styles from '../Page.module.css'

export function ContactPage() {
  return (
    <div className={styles.page}>
      <Container>
        <PageHeader title="Contact us" description={`Reach ${SITE_NAME} using the details below.`} />
        <address>
          <FooterContact />
        </address>
      </Container>
    </div>
  )
}
