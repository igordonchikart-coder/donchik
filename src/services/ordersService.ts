import { invalidateCache } from '@/hooks/resourceCache'
import { isSupabaseConfigured } from './config'
import * as mockOrders from './mock/orders'
import * as supabaseOrders from './supabase/orders'
import type { CreateOrderInput, Order, OrderStatus } from '@/types'

const source = isSupabaseConfigured() ? supabaseOrders : mockOrders

async function create(input: CreateOrderInput): Promise<Order> {
  const order = await source.create(input)
  invalidateCache('orders')
  return order
}

async function updateStatus(id: string, status: OrderStatus): Promise<Order> {
  const order = await source.updateStatus(id, status)
  invalidateCache('orders')
  return order
}

export const ordersService = {
  getAll: source.getAll,
  getById: source.getById,
  create,
  updateStatus,
}
