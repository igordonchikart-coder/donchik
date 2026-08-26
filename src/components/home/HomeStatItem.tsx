import type { HomeStat } from '@/data/homeStats'
import starIcon from '@/assets/ui/star.png'
import styles from './HomeStatItem.module.css'

interface HomeStatItemProps {
  stat: HomeStat
}

export function HomeStatItem({ stat }: HomeStatItemProps) {
  const isTrustpilot = stat.icon === 'star'

  return (
    <li className={`${styles.item} ${isTrustpilot ? styles.trustpilot : styles.default}`}>
      <p className={styles.valueRow}>
        {isTrustpilot ? (
          <img className={styles.star} src={starIcon} alt="" width={182} height={172} aria-hidden="true" />
        ) : null}
        <span className={styles.value}>{stat.value}</span>
      </p>
      <p className={styles.label}>{stat.label}</p>
    </li>
  )
}
