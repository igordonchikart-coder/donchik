import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useProducts } from '@/hooks/useProducts'
import { startImageWarmup } from '@/media/prefetchImages'
import { warmupImageUrls } from '@/media/warmupAssets'
import { Footer } from './Footer'
import { Header } from './Header'

export function PublicLayout() {
  useProducts()

  useEffect(() => startImageWarmup(warmupImageUrls), [])

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
