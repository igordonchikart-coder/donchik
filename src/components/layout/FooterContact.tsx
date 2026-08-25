import { siteContacts } from '@/data/siteContacts'
import { FooterContactIcon } from './FooterContactIcon'
import styles from './FooterContact.module.css'

export function FooterContact() {
  return (
    <ul className={styles.list}>
      {siteContacts.map((item) => (
        <li key={item.id} className={styles.item}>
          <FooterContactIcon icon={item.icon} />
          {item.href ? (
            <a className={styles.value} href={item.href}>
              {item.icon === 'location' ? item.value : `${item.label}: ${item.value}`}
            </a>
          ) : (
            <span className={styles.value}>{item.value}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
