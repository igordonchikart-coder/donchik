import { aboutAuthorSocials } from '@/data/aboutAuthor'
import facebookIcon from '@/assets/about/facebook.png'
import instagramIcon from '@/assets/about/instagram.png'
import youtubeIcon from '@/assets/about/youtube.png'
import styles from './AboutAuthorSocials.module.css'

const socialIcons = {
  instagram: instagramIcon,
  facebook: facebookIcon,
  youtube: youtubeIcon,
} as const

export function AboutAuthorSocials() {
  return (
    <ul className={styles.list}>
      {aboutAuthorSocials.map((item) => (
        <li key={item.id}>
          <a
            className={styles.link}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
          >
            <img className={styles.icon} src={socialIcons[item.icon]} alt="" draggable={false} />
          </a>
        </li>
      ))}
    </ul>
  )
}
