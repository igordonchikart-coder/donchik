import { Container } from '@/components/common/Container'
import { VideoPlayer } from './VideoPlayer'
import styles from './VideoSection.module.css'

export function VideoSection() {
  return (
    <section className={styles.section} aria-label="Video">
      <Container>
        <VideoPlayer />
      </Container>
    </section>
  )
}
