import { ordersService } from '@/services/ordersService'
import { useAsyncResource } from './useAsyncResource'

export function useOrders() {
  return useAsyncResource(() => ordersService.getAll(), 'orders:all')
}
