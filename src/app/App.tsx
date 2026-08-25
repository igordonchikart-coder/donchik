import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { AppRouter } from './router'

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />
        <AppRouter />
      </CartProvider>
    </AuthProvider>
  )
}
