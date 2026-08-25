import { Container } from '@/components/common/Container'
import { FooterContact } from './FooterContact'
import { FooterLegal } from './FooterLegal'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <FooterContact />
        <FooterLegal />
      </Container>
    </footer>
  )
}
