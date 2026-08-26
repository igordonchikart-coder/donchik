import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import { useInView } from '@/hooks/useInView'
import styles from './LazyImage.module.css'

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  eager?: boolean
  rootMargin?: string
  onReady?: () => void
}

export function LazyImage({
  src,
  alt = '',
  className = '',
  eager = false,
  rootMargin = '560px 0px',
  onReady,
  onLoad,
  ...props
}: LazyImageProps) {
  const imageRef = useRef<HTMLImageElement>(null)
  const onReadyRef = useRef(onReady)
  const inView = useInView(imageRef, { rootMargin, disabled: eager })
  const shouldLoad = eager || inView
  const [ready, setReady] = useState(false)
  onReadyRef.current = onReady

  useEffect(() => {
    setReady(false)
  }, [src])

  useEffect(() => {
    const image = imageRef.current
    if (!shouldLoad || !image || !image.complete || image.naturalWidth === 0) {
      return
    }

    setReady(true)
    onReadyRef.current?.()
  }, [shouldLoad, src])

  return (
    <img
      ref={imageRef}
      className={`${className} ${ready ? styles.ready : styles.pending}`}
      src={shouldLoad ? src : undefined}
      alt={alt}
      decoding="async"
      fetchPriority={eager ? 'high' : 'low'}
      draggable={false}
      onLoad={(event) => {
        setReady(true)
        onReadyRef.current?.()
        onLoad?.(event)
      }}
      {...props}
    />
  )
}
