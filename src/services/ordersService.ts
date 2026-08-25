import { isSupabaseConfigured } from './config'
import * as mockOrders from './mock/orders'
import * as supabaseOrders from './supabase/orders'

const source = isSupabaseConfigured() ? supabaseOrders : mockOrders

export const ordersService = {
  getAll: source.getAll,
  getById: source.getById,
  create: source.create,
  updateStatus: source.updateStatus,
}
