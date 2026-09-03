import { useState, type ChangeEvent } from 'react'
import styles from './PhotoStrip.module.css'

interface PhotoStripProps {
  photos: string[]
  uploading?: boolean
  coverLabel?: string
  emptyLabel?: string
  onAdd: (files: FileList) => void
  onMove: (index: number, direction: -1 | 1) => void
  onMoveTo: (from: number, to: number) => void
  onRemove: (index: number) => void
}

export function PhotoStrip({
  photos,
  uploading = false,
  coverLabel,
  emptyLabel = 'Add photos',
  onAdd,
  onMove,
  onMoveTo,
  onRemove,
}: PhotoStripProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  function handleAdd(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files && files.length > 0) {
      onAdd(files)
    }
    event.target.value = ''
  }

  return (
    <div className={styles.strip}>
      {photos.map((image, index) => {
        const isCover = Boolean(coverLabel) && index === 0
        return (
          <div
            className={`${styles.tile} ${isCover ? styles.tileCover : ''} ${dragIndex === index ? styles.tileDragging : ''}`}
            key={`${image}-${index}`}
            draggable
            onDragStart={(event) => {
              setDragIndex(index)
              event.dataTransfer.effectAllowed = 'move'
              event.dataTransfer.setData('text/plain', String(index))
            }}
            onDragEnd={() => setDragIndex(null)}
            onDragOver={(event) => {
              event.preventDefault()
              event.dataTransfer.dropEffect = 'move'
            }}
            onDrop={(event) => {
              event.preventDefault()
              if (dragIndex !== null) {
                onMoveTo(dragIndex, index)
              }
              setDragIndex(null)
            }}
          >
            <img src={image} alt={isCover ? coverLabel : `Photo ${index + 1}`} />
            {isCover ? <span className={styles.badge}>{coverLabel}</span> : null}
            <div className={styles.actions} onPointerDown={(event) => event.stopPropagation()}>
              <button
                className={styles.action}
                type="button"
                aria-label="Move left"
                disabled={index === 0}
                onClick={() => onMove(index, -1)}
              >
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M7.5 2.5 4 6l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              <button
                className={styles.action}
                type="button"
                aria-label="Move right"
                disabled={index === photos.length - 1}
                onClick={() => onMove(index, 1)}
              >
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M4.5 2.5 8 6 4.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              <button
                className={`${styles.action} ${styles.actionRemove}`}
                type="button"
                aria-label="Remove photo"
                onClick={() => onRemove(index)}
              >
                <svg viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M3 3l6 6M9 3l-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>
          </div>
        )
      })}
      <label className={`${styles.add} ${photos.length === 0 ? styles.addEmpty : ''} ${uploading ? styles.addBusy : ''}`}>
        <span>{uploading ? '…' : '+'}</span>
        <span>{uploading ? 'Wait' : photos.length === 0 ? emptyLabel : 'Add'}</span>
        <input type="file" accept="image/*" multiple disabled={uploading} onChange={handleAdd} />
      </label>
    </div>
  )
}
