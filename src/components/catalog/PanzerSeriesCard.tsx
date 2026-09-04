import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '@/app/routes'
import { panzerCardAssets, panzerVolumeYears } from '@/assets/books/panzer-camouflage'
import { LazyImage } from '@/components/common/LazyImage'
import { getProductCardDescription } from '@/data/productCardCopy'
import { useCardTilt, scheduleCardNavigation } from '@/hooks/useCardTilt'
import { useCardSlideshow } from '@/hooks/useCardSlideshow'
import type { Product } from '@/types'
import { getProductCardSlides, isComingSoon } from '@/utils/product'
import sliderDots from '@/styles/sliderDots.module.css'
import { ProductCardFooter } from './ProductCardFooter'
import styles from './PanzerSeriesCard.module.css'

interface PanzerSeriesCardProps {
  product: Product
  preview?: boolean
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

// Shared chrome — warm the cache once so frames don't pop in per card
if (typeof window !== 'undefined') {
  for (const src of [panzerCardAssets.cardFrame, panzerCardAssets.cardUnderlay, panzerCardAssets.cardDivider]) {
    const preload = new Image()
    preload.decoding = 'async'
    preload.src = src
  }
}

export function PanzerSeriesCard({ product, preview = false }: PanzerSeriesCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const [artReady, setArtReady] = useState(false)
  const { tiltRef, onPointerEnter, onPointerMove, onPointerDown, onPointerUp, onPointerLeave, onDragStart } =
    useCardTilt<HTMLDivElement>({
      maxTilt: 10,
      disabled: !artReady,
      shineInsets: { top: 0.0315, right: 0.0635, bottom: 0.0455, left: 0.0655 },
    })
  const productTo = routes.product(product.slug)
  const slides = getProductCardSlides(product)
  const coverImage = slides[0]
  const { activeIndex: safeIndex, warmed, onHoverStart, onHoverEnd, selectSlide } = useCardSlideshow(slides)
  const comingSoon = isComingSoon(product)
  const yearBadge = getYearBadge(product)
  const cropLeft = product.categoryId === 'series-panzer-camouflage' && product.volumeNumber === 6
  const cardDescription = getProductCardDescription(product)
  const developmentCaption =
    isDevelopmentCaption(cardDescription) ||
    isDevelopmentCaption(product.shortDescription) ||
    isDevelopmentCaption(product.description)

  if (!coverImage) {
    return null
  }

  function handlePointerEnter(event: ReactPointerEvent<HTMLDivElement>) {
    onHoverStart()
    onPointerEnter(event)
  }

  function handlePointerLeave(event: ReactPointerEvent<HTMLDivElement>) {
    onHoverEnd()
    onPointerLeave(event)
  }

  return (
    <article ref={cardRef} className={`${styles.card} ${artReady ? styles.cardReady : ''}`}>
      <div
        className={styles.frameWrap}
        onPointerEnter={handlePointerEnter}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={handlePointerLeave}
        onDragStart={onDragStart}
        onClick={(event) => {
          if (preview || !artReady || (event.target as HTMLElement).closest('button')) {
            return
          }

          const link = (event.target as HTMLElement).closest('a')
          if (link) {
            event.preventDefault()
          }

          scheduleCardNavigation(() => navigate(productTo))
        }}
      >
        <div ref={tiltRef} className={styles.tiltPlane}>
          <div className={styles.inner}>
            <div className={styles.media}>
              <img
                className={styles.underlay}
                src={panzerCardAssets.cardUnderlay}
                alt=""
                aria-hidden="true"
                decoding="async"
                fetchPriority="high"
              />
              <Link className={styles.mediaLink} to={productTo} aria-label={`${product.title} ${product.volumeLabel}`}>
                <div className={styles.track} style={{ transform: `translateX(-${safeIndex * 100}%)` }}>
                  {slides.map((src, index) => (
                    <div className={styles.slide} key={`${src}-${index}`}>
                      <LazyImage
                        className={`${styles.artwork} ${cropLeft ? styles.artworkCropLeft : ''}`}
                        src={src}
                        alt=""
                        eager={index === 0 || warmed}
                        rootMargin="900px 0px"
                        onReady={index === 0 ? () => setArtReady(true) : undefined}
                      />
                    </div>
                  ))}
                </div>
              </Link>
              {yearBadge ? (
                <img className={styles.yearBadge} src={yearBadge} alt="" aria-hidden="true" />
              ) : null}

              {slides.length > 1 ? (
                <div className={`${sliderDots.dots} ${styles.dots}`} role="tablist" aria-label={`${product.title} images`}>
                  {slides.map((_, index) => {
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
                          selectSlide(index)
                        }}
                      />
                    )
                  })}
                </div>
              ) : null}
            </div>

            <img className={styles.divider} src={panzerCardAssets.cardDivider} alt="" aria-hidden="true" />

            <div className={styles.bottom}>
              <p className={`${styles.description} ${developmentCaption ? styles.descriptionLarge : ''}`}>
                <Link className={styles.descriptionLink} to={productTo}>
                  {developmentCaption ? 'Book in development' : cardDescription}
                </Link>
              </p>
            </div>
          </div>
          <div className={styles.shineWell} data-shine-well aria-hidden="true">
            <div className={styles.shine} />
          </div>
          <img
            className={styles.frameImage}
            src={panzerCardAssets.cardFrame}
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className={styles.footerSlot}>
        {comingSoon ? null : <ProductCardFooter product={product} />}
      </div>
    </article>
  )
}
