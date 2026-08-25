import { homeVideo } from '@/data/homeVideo'
import { VideoPlayButton } from './VideoPlayButton'
import styles from './VideoPlayer.module.css'

export function VideoPlayer() {
  return (
    <div className={styles.player}>
      <img className={styles.poster} src={homeVideo.poster} alt="" />
      <VideoPlayButton label={homeVideo.label} />
    </div>
  )
}
