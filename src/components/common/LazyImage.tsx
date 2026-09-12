import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import { useInView } from '@/hooks/useInView'
import { hasLoadedImage, rememberLoadedImage } from '@/media/imageLoadMemory'
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
  const known = hasLoadedImage(src)
  const inView = useInView(imageRef, { rootMargin, disabled: eager || known })
  const shouldLoad = eager || known || inView
  const [ready, setReady] = useState(known)
  onReadyRef.current = onReady

  useEffect(() => {
    if (hasLoadedImage(src)) {
      setReady(true)
      onReadyRef.current?.()
      return
    }
    setReady(false)
  }, [src])

  useEffect(() => {
    const image = imageRef.current
    if (!shouldLoad || !image || !image.complete || image.naturalWidth === 0) {
      return
    }

    rememberLoadedImage(src)
    setReady(true)
    onReadyRef.current?.()
  }, [shouldLoad, src])

  return (
    <img
      ref={imageRef}
      className={`${className} ${ready ? styles.ready : styles.pending} ${known && ready ? styles.cached : ''}`}
      src={shouldLoad ? src : undefined}
      alt={alt}
      decoding="async"
      fetchPriority={eager || known ? 'high' : 'low'}
      draggable={false}
      onError={() => {
        rememberLoadedImage(src)
        setReady(true)
        onReadyRef.current?.()
      }}
      onLoad={(event) => {
        rememberLoadedImage(src)
        setReady(true)
        onReadyRef.current?.()
        onLoad?.(event)
      }}
      {...props}
    />
  )
}
