import { useLocation } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { PageHeader } from '@/components/common/PageHeader'
import { PageSeo } from '@/components/seo/PageSeo'
import { routes } from '@/app/routes'
import styles from '../Page.module.css'

interface LocationState {
  orderId?: string
}

export function OrderSuccessPage() {
  const location = useLocation()
  const orderId = (location.state as LocationState | null)?.orderId

  return (
    <div className={styles.page}>
      <PageSeo
        title="Order received"
        description="Your book order request was saved. Igor Donchik Art will confirm it separately."
        path={routes.orderSuccess}
        noIndex
      />
      <Container>
        <PageHeader
          title="Order received"
          description="Thank you. The request was saved. We will confirm it separately. Online payment is not connected yet."
        />
        {orderId ? <p>Order number: {orderId}</p> : null}
        <div className="formActions">
          <Button to={routes.catalog}>Back to store</Button>
        </div>
      </Container>
    </div>
  )
}
