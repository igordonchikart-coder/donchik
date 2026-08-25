import { CartItem } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { Container } from '@/components/common/Container'
import { EmptyState } from '@/components/common/EmptyState'
import { PageHeader } from '@/components/common/PageHeader'
import { useCart } from '@/hooks/useCart'
import { routes } from '@/app/routes'
import styles from '../Page.module.css'

export function CartPage() {
  const { items } = useCart()

  return (
    <div className={styles.page}>
      <Container>
        <PageHeader title="Cart" description="Review the order before checkout." />
        {items.length === 0 ? (
          <EmptyState
            title="Cart is empty"
            description="Add books from the store to place an order."
            actionLabel="Store"
            actionTo={routes.catalog}
          />
        ) : (
          <div className={styles.cartLayout}>
            <div>
              {items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>
            <CartSummary />
          </div>
        )}
      </Container>
    </div>
  )
}
