import { getMockStore, updateMockStore } from '@/data/mockStore'
import type { CreateOrderInput, Order, OrderStatus } from '@/types'
import { createId, nowIso } from '@/utils/id'

function delay(ms = 180): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export async function getAll(): Promise<Order[]> {
  await delay()
  return getMockStore().orders
}

export async function getById(id: string): Promise<Order | null> {
  await delay()
  return getMockStore().orders.find((order) => order.id === id) ?? null
}

export async function create(input: CreateOrderInput): Promise<Order> {
  await delay()
  const timestamp = nowIso()
  const order: Order = {
    id: createId(),
    customer: {
      id: createId(),
      ...input.customer,
    },
    items: input.items,
    totalPrice: input.totalPrice,
    currency: input.currency,
    status: 'pending',
    notes: input.notes,
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  updateMockStore((state) => ({
    ...state,
    orders: [order, ...state.orders],
  }))

  return order
}

export async function updateStatus(id: string, status: OrderStatus): Promise<Order> {
  await delay()
  let updated: Order | undefined

  updateMockStore((state) => ({
    ...state,
    orders: state.orders.map((order) => {
      if (order.id !== id) {
        return order
      }
      updated = { ...order, status, updatedAt: nowIso() }
      return updated
    }),
  }))

  if (!updated) {
    throw new Error('Order not found')
  }

  return updated
}
