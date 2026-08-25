import { useLocation } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { PageHeader } from '@/components/common/PageHeader'
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
