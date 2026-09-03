import { Container } from '@/components/common/Container'
import { homeStats } from '@/data/homeStats'
import { useTrustpilot } from '@/hooks/useTrustpilot'
import { HomeStatItem } from './HomeStatItem'
import styles from './HomeStatsSection.module.css'

export function HomeStatsSection() {
  const trustpilot = useTrustpilot()
  const stats = homeStats.map((stat) =>
    stat.id === 'trustpilot' ? { ...stat, value: trustpilot.ratingLabel } : stat,
  )

  return (
    <section className={styles.section} aria-label="Site statistics">
      <Container>
        <ul className={styles.list}>
          {stats.map((stat) => (
            <HomeStatItem key={stat.id} stat={stat} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
