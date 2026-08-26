import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute'
import { LoadingState } from '@/components/common/LoadingState'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { HomePage } from '@/pages/public/HomePage'
import { NotFoundPage } from '@/pages/public/NotFoundPage'

const AboutPage = lazy(() => import('@/pages/public/AboutPage').then((module) => ({ default: module.AboutPage })))
const CartPage = lazy(() => import('@/pages/public/CartPage').then((module) => ({ default: module.CartPage })))
const CatalogPage = lazy(() => import('@/pages/public/CatalogPage').then((module) => ({ default: module.CatalogPage })))
const CategoryPage = lazy(() => import('@/pages/public/CategoryPage').then((module) => ({ default: module.CategoryPage })))
const CheckoutPage = lazy(() => import('@/pages/public/CheckoutPage').then((module) => ({ default: module.CheckoutPage })))
const ContactPage = lazy(() => import('@/pages/public/ContactPage').then((module) => ({ default: module.ContactPage })))
const DiscountsPage = lazy(() => import('@/pages/public/DiscountsPage').then((module) => ({ default: module.DiscountsPage })))
const OrderSuccessPage = lazy(() => import('@/pages/public/OrderSuccessPage').then((module) => ({ default: module.OrderSuccessPage })))
const ProductPage = lazy(() => import('@/pages/public/ProductPage').then((module) => ({ default: module.ProductPage })))
const AdminCategoriesPage = lazy(() =>
  import('@/pages/admin/AdminCategoriesPage').then((module) => ({ default: module.AdminCategoriesPage })),
)
const AdminDashboardPage = lazy(() =>
  import('@/pages/admin/AdminDashboardPage').then((module) => ({ default: module.AdminDashboardPage })),
)
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage').then((module) => ({ default: module.AdminLoginPage })))
const AdminOrdersPage = lazy(() => import('@/pages/admin/AdminOrdersPage').then((module) => ({ default: module.AdminOrdersPage })))
const AdminProductEditPage = lazy(() =>
  import('@/pages/admin/AdminProductEditPage').then((module) => ({ default: module.AdminProductEditPage })),
)
const AdminProductNewPage = lazy(() =>
  import('@/pages/admin/AdminProductNewPage').then((module) => ({ default: module.AdminProductNewPage })),
)
const AdminProductsPage = lazy(() =>
  import('@/pages/admin/AdminProductsPage').then((module) => ({ default: module.AdminProductsPage })),
)

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingState />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/discounts" element={<DiscountsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/products/new" element={<AdminProductNewPage />} />
            <Route path="/admin/products/:id/edit" element={<AdminProductEditPage />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
