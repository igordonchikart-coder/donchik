import { Container } from '@/components/common/Container'
import { homeStats } from '@/data/homeStats'
import { HomeStatItem } from './HomeStatItem'
import styles from './HomeStatsSection.module.css'

export function HomeStatsSection() {
  return (
    <section className={styles.section} aria-label="Site statistics">
      <Container>
        <ul className={styles.list}>
          {homeStats.map((stat) => (
            <HomeStatItem key={stat.id} stat={stat} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
