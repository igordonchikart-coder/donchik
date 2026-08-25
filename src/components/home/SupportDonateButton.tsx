import { supportProject } from '@/data/supportProject'
import styles from './SupportDonateButton.module.css'

export function SupportDonateButton() {
  return (
    <button className={styles.button} type="button" disabled aria-label="Donate, payments are not connected yet">
      {supportProject.donateLabel}
    </button>
  )
}
