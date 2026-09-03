import { CartSummary } from '@/components/cart/CartSummary'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { Container } from '@/components/common/Container'
import { EmptyState } from '@/components/common/EmptyState'
import { PageHeader } from '@/components/common/PageHeader'
import { PageSeo } from '@/components/seo/PageSeo'
import { checkoutPageCopy } from '@/data/staticPageCopy'
import { useCart } from '@/hooks/useCart'
import { routes } from '@/app/routes'
import styles from '../Page.module.css'

export function CheckoutPage() {
  const { items } = useCart()

  return (
    <div className={styles.page}>
      <PageSeo
        title={checkoutPageCopy.seoTitle}
        description={checkoutPageCopy.seoDescription}
        path={routes.checkout}
        noIndex
      />
      <Container>
        {items.length === 0 ? (
          <>
            <PageHeader
              title="Checkout"
              description="Payments are not connected yet. The order is saved as a request."
            />
            <EmptyState
              title="Nothing to check out"
              description="Add books to the cart first."
              actionLabel="Store"
              actionTo={routes.catalog}
            />
          </>
        ) : (
          <div className={styles.checkoutLayout}>
            <div>
              <PageHeader
                title="Checkout"
                description="Payments are not connected yet. The order is saved as a request."
              />
              <CheckoutForm />
            </div>
            <CartSummary showCheckoutButton={false} />
          </div>
        )}
      </Container>
    </div>
  )
}
