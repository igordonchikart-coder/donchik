import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '@/app/routes'
import { symbolsCardSources } from '@/assets/books/military-symbols'
import { panzerCardAssets, panzerVolumeSources, panzerVolumeYears } from '@/assets/books/panzer-camouflage'
import { insigniaCardSources } from '@/assets/books/unit-insignia'
import { LazyImage } from '@/components/common/LazyImage'
import { useInView } from '@/hooks/useInView'
import type { Product } from '@/types'
import { getProductCardSlides, isComingSoon } from '@/utils/product'
import sliderDots from '@/styles/sliderDots.module.css'
import { ProductCardFooter } from './ProductCardFooter'
import styles from './PanzerSeriesCard.module.css'

interface PanzerSeriesCardProps {
  product: Product
}

function getFramedArtwork(product: Product): string | undefined {
  if (product.categoryId === 'series-panzer-camouflage') {
    return panzerVolumeSources[product.volumeNumber as keyof typeof panzerVolumeSources]
  }

  if (product.categoryId === 'series-military-symbols') {
    return symbolsCardSources[product.id as keyof typeof symbolsCardSources]
  }

  if (product.categoryId === 'series-unit-insignia') {
    return insigniaCardSources[product.volumeNumber as keyof typeof insigniaCardSources]
  }
}

function getYearBadge(product: Product): string | undefined {
  if (product.categoryId === 'series-panzer-camouflage') {
    return panzerVolumeYears[product.volumeNumber as keyof typeof panzerVolumeYears]
  }

  if (product.categoryId === 'series-unit-insignia') {
    if (product.volumeNumber === 2) {
      return panzerVolumeYears[5]
    }
    if (product.volumeNumber === 3) {
      return panzerVolumeYears[6]
    }
  }
}

function isDevelopmentCaption(text: string): boolean {
  return text.trim().replace(/\.$/, '').toLowerCase() === 'book in development'
}

export function PanzerSeriesCard({ product }: PanzerSeriesCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const nearViewport = useInView(cardRef, { rootMargin: '640px 0px' })
  const productTo = routes.product(product.slug)
  const artwork = getFramedArtwork(product)
  const slides = getProductCardSlides({
    coverImage: artwork ?? product.coverImage,
    gallery: artwork ? [artwork] : product.gallery,
  })
  const [activeIndex, setActiveIndex] = useState(0)
  const [artReady, setArtReady] = useState(false)
  const safeIndex = Math.min(activeIndex, Math.max(slides.length - 1, 0))
  const comingSoon = isComingSoon(product)
  const yearBadge = getYearBadge(product)
  const cropLeft = product.categoryId === 'series-panzer-camouflage' && product.volumeNumber === 6
  const developmentCaption = isDevelopmentCaption(product.description)
  const dotCount = Math.max(slides.length, 3)

  if (!artwork) {
    return null
  }

  return (
    <article ref={cardRef} className={`${styles.card} ${artReady ? styles.cardReady : ''}`}>
      <div className={styles.frameWrap}>
        {nearViewport ? (
          <img className={styles.frameImage} src={panzerCardAssets.cardFrame} alt="" aria-hidden="true" />
        ) : null}

        <div className={styles.inner}>
          <div className={styles.media}>
            {nearViewport ? (
              <img className={styles.underlay} src={panzerCardAssets.cardUnderlay} alt="" aria-hidden="true" />
            ) : null}
            <Link className={styles.mediaLink} to={productTo} aria-label={`${product.title} ${product.volumeLabel}`}>
              {nearViewport ? (
                <LazyImage
                  className={`${styles.artwork} ${cropLeft ? styles.artworkCropLeft : ''}`}
                  src={slides[safeIndex]}
                  alt=""
                  eager
                  onReady={() => setArtReady(true)}
                />
              ) : null}
            </Link>
            {yearBadge && nearViewport ? (
              <img className={styles.yearBadge} src={yearBadge} alt="" aria-hidden="true" />
            ) : null}
          </div>

          <div className={styles.bottom}>
            <div className={sliderDots.dots} role="tablist" aria-label={`${product.title} images`}>
              {Array.from({ length: dotCount }, (_, index) => {
                const isActive = index === safeIndex

                return (
                  <button
                    key={index}
                    className={`${sliderDots.dot} ${isActive ? sliderDots.dotActive : ''}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Image ${index + 1}`}
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      if (index < slides.length) {
                        setActiveIndex(index)
                      }
                    }}
                  />
                )
              })}
            </div>

            <img className={styles.divider} src={panzerCardAssets.cardDivider} alt="" aria-hidden="true" />

            <p className={`${styles.description} ${developmentCaption ? styles.descriptionLarge : ''}`}>
              {developmentCaption ? 'Book in development' : product.description}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.footerSlot}>
        {comingSoon ? null : <ProductCardFooter product={product} />}
      </div>
    </article>
  )
}
