import { supportProject } from '@/data/supportProject'
import styles from './SupportProgress.module.css'

export function SupportProgress() {
  const { raised, goal } = supportProject
  const percent = Math.min(100, Math.max(0, (raised / goal) * 100))

  return (
    <div className={styles.wrap}>
      <div
        className={styles.bar}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={raised}
        aria-label="Donation progress"
      >
        <span className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
      <p className={styles.amount}>
        {raised}$ / {goal}$
      </p>
    </div>
  )
}
