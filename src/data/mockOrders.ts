import type { Order } from '@/types'

export const mockOrders: Order[] = [
  {
    id: 'ord-1001',
    customer: {
      id: 'cust-1',
      fullName: 'Anna Sokolova',
      email: 'anna@example.com',
      phone: '+372 5555 1111',
      address: 'Pääsusilma tee 12',
      city: 'Tallinn',
      postalCode: '74114',
    },
    items: [
      {
        productId: 'prod-panzer-1',
        title: 'Panzer Camouflage Volume I',
        quantity: 1,
        price: 56,
        currency: 'EUR',
      },
    ],
    totalPrice: 56,
    currency: 'EUR',
    status: 'processing',
    createdAt: '2026-08-12T09:30:00.000Z',
    updatedAt: '2026-08-13T11:00:00.000Z',
  },
  {
    id: 'ord-1002',
    customer: {
      id: 'cust-2',
      fullName: 'Ilya Orlov',
      email: 'ilya@example.com',
      phone: '+372 5555 2222',
      address: 'Narva mnt 7',
      city: 'Tartu',
      postalCode: '51004',
    },
    items: [
      {
        productId: 'prod-insignia-1',
        title: 'German Military Unit Insignia Volume I',
        quantity: 1,
        price: 33.6,
        currency: 'EUR',
      },
      {
        productId: 'prod-symbols-2',
        title: 'German Military Symbols Volume II',
        quantity: 1,
        price: 15,
        currency: 'EUR',
      },
    ],
    totalPrice: 48.6,
    currency: 'EUR',
    status: 'pending',
    createdAt: '2026-08-20T16:15:00.000Z',
    updatedAt: '2026-08-20T16:15:00.000Z',
    notes: 'Please call before delivery',
  },
]
