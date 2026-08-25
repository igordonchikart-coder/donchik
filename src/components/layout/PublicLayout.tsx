import { Outlet } from 'react-router-dom'
import { useProducts } from '@/hooks/useProducts'
import { Footer } from './Footer'
import { Header } from './Header'

export function PublicLayout() {
  useProducts()

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
