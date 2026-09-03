import { useEffect, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { ProductCardDots } from '@/components/catalog/ProductCardDots'
import { LazyImage } from '@/components/common/LazyImage'
import type { Product } from '@/types'
import { getProductPageSlides } from '@/utils/product'
import styles from './ProductGallery.module.css'

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const slides = getProductPageSlides(product)
  const [activeIndex, setActiveIndex] = useState(0)
  const [loaded, setLoaded] = useState(() => new Set([0]))
  const slideCount = slides.length
  const label = `${product.title} ${product.volumeLabel}`

  function goTo(index: number) {
    const next = ((index % slideCount) + slideCount) % slideCount
    setActiveIndex(next)
  }

  useEffect(() => {
    setLoaded((current) => {
      const next = new Set(current)
      next.add(activeIndex)
      if (slideCount > 1) {
        next.add((activeIndex + 1) % slideCount)
      }
      return next
    })
  }, [activeIndex, slideCount])

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(activeIndex + 1)
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(activeIndex - 1)
    }
  }

  if (slideCount === 0) {
    return null
  }

  return (
    <div
      className={styles.frame}
      aria-roledescription="carousel"
      aria-label={`${label} images`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.viewport}>
        <div className={styles.track} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {slides.map((image, index) =>
            loaded.has(index) ? (
              <LazyImage
                key={`${image}-${index}`}
                className={styles.image}
                src={image}
                alt={index === activeIndex ? label : ''}
                aria-hidden={index !== activeIndex}
                eager={index === activeIndex}
              />
            ) : (
              <div key={`${image}-${index}`} className={styles.image} aria-hidden="true" />
            ),
          )}
        </div>
      </div>
      <div className={styles.dots}>
        <ProductCardDots
          count={slideCount}
          activeIndex={activeIndex}
          label={label}
          onSelect={goTo}
        />
      </div>
    </div>
  )
}
