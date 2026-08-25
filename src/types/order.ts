import type { Customer } from './customer'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface OrderItem {
  productId: string
  title: string
  quantity: number
  price: number
  currency: string
}

export interface Order {
  id: string
  customer: Customer
  items: OrderItem[]
  totalPrice: number
  currency: string
  status: OrderStatus
  createdAt: string
  updatedAt: string
  notes?: string
}

export interface CreateOrderInput {
  customer: Omit<Customer, 'id'>
  items: OrderItem[]
  totalPrice: number
  currency: string
  notes?: string
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}
