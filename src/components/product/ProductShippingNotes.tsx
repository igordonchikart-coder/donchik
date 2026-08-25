import { productShippingNotes } from '@/data/productShippingNotes'
import styles from './ProductShippingNotes.module.css'

export function ProductShippingNotes() {
  return (
    <div className={styles.block}>
      <h2 className={styles.heading}>Shipping features:</h2>
      <ul className={styles.list}>
        {productShippingNotes.map((note) => {
          const omniva = note.includes('Omniva Post')

          return (
            <li key={note}>
              {omniva ? (
                <>
                  Sending by Estonian <span className={styles.accent}>Omniva Post</span>.
                </>
              ) : (
                note
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
