import { Container } from '@/components/common/Container'
import { FooterContact } from './FooterContact'
import { FooterLegal } from './FooterLegal'
import { FooterSeller } from './FooterSeller'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.left}>
          <FooterSeller />
          <FooterContact />
        </div>
        <FooterLegal />
      </Container>
    </footer>
  )
}
