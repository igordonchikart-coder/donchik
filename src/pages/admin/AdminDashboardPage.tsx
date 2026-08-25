import { PageHeader } from '@/components/common/PageHeader'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { useCategories } from '@/hooks/useCategories'
import { useOrders } from '@/hooks/useOrders'
import { useProducts } from '@/hooks/useProducts'
import styles from '../Page.module.css'

export function AdminDashboardPage() {
  const products = useProducts()
  const categories = useCategories()
  const orders = useOrders()

  const isLoading = products.isLoading || categories.isLoading || orders.isLoading
  const error = products.error || categories.error || orders.error

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return (
      <ErrorState
        description={error}
        onRetry={() => {
          products.reload()
          categories.reload()
          orders.reload()
        }}
      />
    )
  }

  return (
    <>
      <PageHeader title="Admin" description="Shop overview. Data may still be mock." />
      <div className={styles.stats}>
        <article className={styles.stat}>
          <p>Books</p>
          <p className={styles.statValue}>{products.data?.length ?? 0}</p>
        </article>
        <article className={styles.stat}>
          <p>Series</p>
          <p className={styles.statValue}>{categories.data?.length ?? 0}</p>
        </article>
        <article className={styles.stat}>
          <p>Orders</p>
          <p className={styles.statValue}>{orders.data?.length ?? 0}</p>
        </article>
      </div>
    </>
  )
}
