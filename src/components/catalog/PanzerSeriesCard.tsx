import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '@/app/routes'
import { panzerCardAssets, panzerVolumeYears } from '@/assets/books/panzer-camouflage'
import { LazyImage } from '@/components/common/LazyImage'
import { useInView } from '@/hooks/useInView'
import type { Product } from '@/types'
import { getFramedArtwork } from '@/utils/catalogArtwork'
import { isComingSoon, padProductCardSlides } from '@/utils/product'
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

export function PanzerSeriesCard({ product, preview = false }: PanzerSeriesCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const nearViewport = useInView(cardRef, { rootMargin: '640px 0px', disabled: preview })
  const productTo = routes.product(product.slug)
  const framedArtwork = getFramedArtwork(product)
  const coverImage = product.coverImage || framedArtwork
  const slides = padProductCardSlides({
    coverImage: coverImage ?? '',
    gallery: product.gallery.filter((image) => image !== coverImage && image !== product.coverImage),
  })
  const [activeIndex, setActiveIndex] = useState(0)
  const [artReady, setArtReady] = useState(false)
  const safeIndex = Math.min(activeIndex, Math.max(slides.length - 1, 0))
  const comingSoon = isComingSoon(product)
  const yearBadge = getYearBadge(product)
  const cropLeft = product.categoryId === 'series-panzer-camouflage' && product.volumeNumber === 6
  const developmentCaption = isDevelopmentCaption(product.shortDescription) || isDevelopmentCaption(product.description)

  if (!coverImage) {
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
              <div className={styles.track} style={{ transform: `translateX(-${safeIndex * 100}%)` }}>
                {slides.map((src, index) => (
                  <div className={styles.slide} key={`${src}-${index}`}>
                    {nearViewport ? (
                      <LazyImage
                        className={`${styles.artwork} ${cropLeft ? styles.artworkCropLeft : ''}`}
                        src={src}
                        alt=""
                        eager
                        onReady={index === 0 ? () => setArtReady(true) : undefined}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </Link>
            {yearBadge && nearViewport ? (
              <img className={styles.yearBadge} src={yearBadge} alt="" aria-hidden="true" />
            ) : null}

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
                      setActiveIndex(index)
                    }}
                  />
                )
              })}
            </div>
          </div>

          <img className={styles.divider} src={panzerCardAssets.cardDivider} alt="" aria-hidden="true" />

          <div className={styles.bottom}>
            <p className={`${styles.description} ${developmentCaption ? styles.descriptionLarge : ''}`}>
              {developmentCaption ? 'Book in development' : product.shortDescription || product.description}
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
