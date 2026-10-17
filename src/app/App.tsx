import { Analytics } from '@vercel/analytics/react'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { AppRouter } from './router'

export function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <CartProvider>
          <ScrollToTop />
          <AppRouter />
          <Analytics />
        </CartProvider>
      </CurrencyProvider>
    </AuthProvider>
  )
}
