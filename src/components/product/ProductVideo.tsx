import { VideoPlayer } from '@/components/home/VideoPlayer'
import styles from './ProductVideo.module.css'

export function ProductVideo() {
  return (
    <section className={styles.section} aria-label="Video">
      <VideoPlayer />
    </section>
  )
}
