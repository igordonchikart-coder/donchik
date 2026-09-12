import { routes } from '@/app/routes'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { getProductPageCopy } from '@/data/productPageCopy'
import { useTrustpilot } from '@/hooks/useTrustpilot'
import { AddToCartButton } from './AddToCartButton'
import { ProductIntroText } from './ProductIntroText'
import type { Product } from '@/types'
import { formatPrice } from '@/utils/formatPrice'
import { DISCOUNT_BUNDLE_CATEGORY_SLUG } from '@/utils/catalogGroups'
import { isComingSoon } from '@/utils/product'
import styles from './ProductBuyPanel.module.css'

interface ProductBuyPanelProps {
  product: Product
}

export function ProductBuyPanel({ product }: ProductBuyPanelProps) {
  const comingSoon = isComingSoon(product)
  const copy = getProductPageCopy(product)
  const trustpilot = useTrustpilot()
  const isDiscountBundle = product.category?.slug === DISCOUNT_BUNDLE_CATEGORY_SLUG
  const seriesCrumb = isDiscountBundle
    ? { label: 'Discounts', to: routes.discounts }
    : product.category
      ? { label: product.category.title, to: routes.category(product.category.slug) }
      : null

  return (
    <div className={styles.panel}>
      <Breadcrumbs
        items={[
          { label: 'Home', to: routes.home },
          { label: 'Store', to: routes.catalog },
          ...(seriesCrumb ? [seriesCrumb] : []),
          { label: `${product.title} ${product.volumeLabel}` },
        ]}
      />
      <h1 id="product-title" className={styles.title}>
        {copy.headline}
      </h1>
      {comingSoon ? (
        <p className={styles.meta}>
          {product.releaseYear ? `Coming in ${product.releaseYear}` : 'Book in development'}
        </p>
      ) : (
        <>
          {product.isOnSale && product.saleLabel ? <p className={styles.sale}>{product.saleLabel}</p> : null}
          {product.originalPrice ? (
            <p className={styles.meta}>{formatPrice(product.originalPrice, product.currency)}</p>
          ) : null}
          <p className={styles.price}>{formatPrice(product.price, product.currency)}</p>
          {product.deliveryNote ? (
            <p className={styles.delivery}>
              {product.deliveryNote} <span aria-hidden="true">🔥</span>
            </p>
          ) : null}
        </>
      )}
      <AddToCartButton product={product} />
      {copy.intro.map((paragraph) => (
        <ProductIntroText key={paragraph} text={paragraph} ratingLabel={trustpilot.ratingLabel} />
      ))}
    </div>
  )
}
