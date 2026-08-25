import { placeholders } from '@/data/placeholders'
import { supportProject } from '@/data/supportProject'
import styles from './SupportIntro.module.css'

export function SupportIntro() {
  return (
    <div className={styles.intro}>
      <img className={styles.logo} src={placeholders.logo} alt="" />
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
