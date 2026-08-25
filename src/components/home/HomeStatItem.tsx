import type { HomeStat } from '@/data/homeStats'
import styles from './HomeStatItem.module.css'

interface HomeStatItemProps {
  stat: HomeStat
}

export function HomeStatItem({ stat }: HomeStatItemProps) {
  return (
    <li className={styles.item}>
      <p className={styles.valueRow}>
        {stat.icon === 'star' ? (
          <span className={styles.icon} aria-hidden="true">
            ★
          </span>
        ) : null}
        <span className={styles.value}>{stat.value}</span>
      </p>
      <p className={styles.label}>{stat.label}</p>
    </li>
  )
}
