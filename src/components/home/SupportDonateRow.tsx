import { SupportDonateButton } from './SupportDonateButton'
import { SupportProgress } from './SupportProgress'
import styles from './SupportDonateRow.module.css'

export function SupportDonateRow() {
  return (
    <div className={styles.row}>
      <SupportDonateButton />
      <SupportProgress />
    </div>
  )
}
