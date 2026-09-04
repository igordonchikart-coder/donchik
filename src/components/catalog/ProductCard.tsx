import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '@/app/routes'
import type { Product } from '@/types'
import { getProductCardDescription } from '@/data/productCardCopy'
import { scheduleCardNavigation, useCardTilt } from '@/hooks/useCardTilt'
import { getProductCardSlides, isComingSoon } from '@/utils/product'
import { PanzerSeriesCard } from './PanzerSeriesCard'
import { ProductCardDots } from './ProductCardDots'
import { ProductCardFooter } from './ProductCardFooter'
import { ProductCardMedia } from './ProductCardMedia'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
  preview?: boolean
}

export function ProductCard({ product, preview = false }: ProductCardProps) {
  if (
    (product.categoryId === 'series-panzer-camouflage' && product.volumeNumber <= 6) ||
    product.categoryId === 'series-military-symbols' ||
    product.categoryId === 'series-unit-insignia'
  ) {
    return <PanzerSeriesCard product={product} preview={preview} />
  }

  const slides = getProductCardSlides(product)
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()
  const { tiltRef, onPointerEnter, onPointerMove, onPointerDown, onPointerUp, onPointerLeave, onDragStart } =
    useCardTilt<HTMLDivElement>({
      maxTilt: 10,
    })
  const safeIndex = Math.min(activeIndex, Math.max(slides.length - 1, 0))
  const comingSoon = isComingSoon(product)
  const productTo = routes.product(product.slug)
  const body = getProductCardDescription(product)

  function handlePointerLeave(event: ReactPointerEvent<HTMLDivElement>) {
    setActiveIndex(0)
    onPointerLeave(event)
  }

  return (
    <article className={styles.card}>
      <div
        className={styles.frame}
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={handlePointerLeave}
        onDragStart={onDragStart}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('button')) {
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
          <div className={styles.header}>
            <Link className={styles.title} to={productTo}>
              {product.title}
            </Link>
            <span className={styles.badge}>{product.volumeNumber}</span>
          </div>
          <ProductCardMedia
            product={product}
            image={slides[safeIndex]}
            to={productTo}
            comingSoon={comingSoon}
          >
            <div className={styles.mask}>
              <ProductCardDots
                count={slides.length}
                activeIndex={safeIndex}
                label={product.title}
                onSelect={setActiveIndex}
              />
            </div>
          </ProductCardMedia>
          <hr className={styles.divider} />
          <p className={styles.body}>
            <Link to={productTo}>{body}</Link>
          </p>
          <div className={styles.shineWell} data-shine-well aria-hidden="true">
            <div className={styles.shine} />
          </div>
        </div>
      </div>
      <div className={styles.footerSlot}>
        {comingSoon ? null : <ProductCardFooter product={product} />}
      </div>
    </article>
  )
}
