import logo from '@/assets/ui/logo.webp'
import { supportProject } from '@/data/supportProject'
import { SITE_NAME } from '@/utils/constants'
import styles from './SupportIntro.module.css'

export function SupportIntro() {
  return (
    <div className={styles.intro}>
      <img className={styles.logo} src={logo} alt={SITE_NAME} width={120} height={120} decoding="async" />
      <div className={styles.copy}>
        <h2 id="support-title" className={styles.title}>
          {supportProject.heading}
        </h2>
        {supportProject.paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.text}>
            {paragraph}
          </p>
        ))}
      </div>
      <p className={styles.thanks}>{supportProject.thanks}</p>
    </div>
  )
}
