import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/common/PageHeader'
import { OrdersTable } from '@/components/admin/OrdersTable'
import { ordersService } from '@/services/ordersService'
import { useOrders } from '@/hooks/useOrders'
import type { OrderStatus } from '@/types'

export function AdminOrdersPage() {
  const { data, isLoading, error, reload } = useOrders()

  async function handleStatusChange(orderId: string, status: OrderStatus) {
    await ordersService.updateStatus(orderId, status)
    reload()
  }

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState description={error} onRetry={reload} />
  }

  return (
    <>
      <PageHeader title="Orders" description="Review requests and update status." />
      {data && data.length > 0 ? (
        <OrdersTable orders={data} onStatusChange={(id, status) => void handleStatusChange(id, status)} />
      ) : (
        <EmptyState title="No orders yet" description="New orders will appear here after checkout." />
      )}
    </>
  )
}
