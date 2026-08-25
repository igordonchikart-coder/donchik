import type { CreateOrderInput, Order, OrderStatus } from '@/types'
import { createId } from '@/utils/id'
import { getSupabaseClient } from './client'

interface OrderRow {
  id: string
  customer: Order['customer']
  items: Order['items']
  total_price: number
  currency: string
  status: OrderStatus
  notes: string | null
  created_at: string
  updated_at: string
}

function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    customer: row.customer,
    items: row.items,
    totalPrice: row.total_price,
    currency: row.currency,
    status: row.status,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function getAll(): Promise<Order[]> {
  const { data, error } = await getSupabaseClient()
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return (data as OrderRow[]).map(mapOrder)
}

export async function getById(id: string): Promise<Order | null> {
  const { data, error } = await getSupabaseClient()
    .from('orders')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data ? mapOrder(data as OrderRow) : null
}

export async function create(input: CreateOrderInput): Promise<Order> {
  const now = new Date().toISOString()
  const payload = {
    id: createId(),
    customer: { id: createId(), ...input.customer },
    items: input.items,
    total_price: input.totalPrice,
    currency: input.currency,
    status: 'pending' as const,
    notes: input.notes ?? null,
    created_at: now,
    updated_at: now,
  }

  const { data, error } = await getSupabaseClient()
    .from('orders')
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return mapOrder(data as OrderRow)
}

export async function updateStatus(id: string, status: OrderStatus): Promise<Order> {
  const { data, error } = await getSupabaseClient()
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return mapOrder(data as OrderRow)
}
