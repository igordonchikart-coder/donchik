import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartItem } from '@/types'
import type { Product } from '@/types/product'
import { STORAGE_KEYS } from '@/utils/constants'
import { isPurchasable } from '@/utils/product'
import { readJson, writeJson } from '@/utils/storage'

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalQuantity: number
  totalPrice: number
  cartPulseId: number
}

export const CartContext = createContext<CartContextValue | null>(null)

function toCartItem(product: Product, quantity: number): CartItem {
  return {
    productId: product.id,
    slug: product.slug,
    title: `${product.title} ${product.volumeLabel}`,
    price: product.price,
    currency: product.currency,
    coverImage: product.coverImage,
    quantity,
    stock: product.stock,
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() =>
    readJson<CartItem[]>(STORAGE_KEYS.cart, []),
  )
  const [cartPulseId, setCartPulseId] = useState(0)

  useEffect(() => {
    writeJson(STORAGE_KEYS.cart, items)
  }, [items])

  const addItem = useCallback((product: Product, quantity = 1) => {
    if (!isPurchasable(product)) {
      return
    }

    let didAdd = false

    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id)
      if (!existing) {
        didAdd = true
        return [...current, toCartItem(product, Math.min(quantity, product.stock))]
      }

      const nextQuantity = Math.min(existing.quantity + quantity, product.stock)
      if (nextQuantity > existing.quantity) {
        didAdd = true
      }

      return current.map((item) =>
        item.productId === product.id ? { ...item, quantity: nextQuantity, stock: product.stock } : item,
      )
    })

    if (didAdd) {
      setCartPulseId((current) => current + 1)
    }
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) =>
      current.flatMap((item) => {
        if (item.productId !== productId) {
          return [item]
        }
        if (quantity <= 0) {
          return []
        }
        return [{ ...item, quantity: Math.min(quantity, item.stock) }]
      }),
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalQuantity,
      totalPrice,
      cartPulseId,
    }
  }, [addItem, cartPulseId, clearCart, items, removeItem, updateQuantity])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
