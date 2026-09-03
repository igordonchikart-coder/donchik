import type { HomeStat } from '@/data/homeStats'
import starIcon from '@/assets/ui/star.png'
import styles from './HomeStatItem.module.css'

interface HomeStatItemProps {
  stat: HomeStat
}

function StatContent({ stat, isTrustpilot }: { stat: HomeStat; isTrustpilot: boolean }) {
  return (
    <>
      <p className={styles.valueRow}>
        {isTrustpilot ? (
          <img className={styles.star} src={starIcon} alt="" width={182} height={172} aria-hidden="true" />
        ) : null}
        <span className={styles.value}>{stat.value}</span>
      </p>
      <p className={styles.label}>{stat.label}</p>
    </>
  )
}

export function HomeStatItem({ stat }: HomeStatItemProps) {
  const isTrustpilot = stat.icon === 'star'
  const className = `${styles.item} ${isTrustpilot ? styles.trustpilot : styles.default}`

  return (
    <li className={className}>
      {stat.href ? (
        <a
          className={styles.link}
          href={stat.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${stat.value} ${stat.label}`}
        >
          <StatContent stat={stat} isTrustpilot={isTrustpilot} />
        </a>
      ) : (
        <StatContent stat={stat} isTrustpilot={isTrustpilot} />
      )}
    </li>
  )
}
