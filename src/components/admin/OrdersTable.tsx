import { SelectField } from '@/components/common/Field'
import type { Order, OrderStatus } from '@/types'
import { ORDER_STATUS_LABELS } from '@/types'
import { formatDate } from '@/utils/formatDate'
import { formatPrice } from '@/utils/formatPrice'
import styles from './Table.module.css'

interface OrdersTableProps {
  orders: Order[]
  onStatusChange: (orderId: string, status: OrderStatus) => void
}

export function OrdersTable({ orders, onStatusChange }: OrdersTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <div>{order.id.slice(0, 8)}</div>
                <div>{formatDate(order.createdAt)}</div>
              </td>
              <td>
                <div>{order.customer.fullName}</div>
                <div>{order.customer.email}</div>
                <div>{order.customer.phone}</div>
              </td>
              <td>
                {order.items.map((item) => (
                  <div key={`${order.id}-${item.productId}`}>
                    {item.title} × {item.quantity}
                  </div>
                ))}
              </td>
              <td>{formatPrice(order.totalPrice, order.currency)}</td>
              <td>
                <SelectField
                  label="Order status"
                  name={`status-${order.id}`}
                  value={order.status}
                  onChange={(event) => onStatusChange(order.id, event.target.value as OrderStatus)}
                >
                  {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </SelectField>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
