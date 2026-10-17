import { Container } from '@/components/common/Container'
import { FooterContact } from './FooterContact'
import { FooterLegal } from './FooterLegal'
import { FooterSeller } from './FooterSeller'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <FooterSeller />
        <div className={styles.column}>
          <p className={styles.heading}>Contact</p>
          <FooterContact />
        </div>
        <FooterLegal />
      </Container>
    </footer>
  )
}
