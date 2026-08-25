import { productNotices } from '@/data/productNotices'
import { ProductNoticeIcon } from './ProductNoticeIcon'
import styles from './ProductNotices.module.css'

export function ProductNotices() {
  return (
    <div className={styles.block}>
      <h2 className={styles.heading}>Important information:</h2>
      <ul className={styles.list}>
        {productNotices.map((notice) => (
          <li key={notice.id} className={styles.item}>
            <ProductNoticeIcon icon={notice.icon} />
            <span>{notice.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
