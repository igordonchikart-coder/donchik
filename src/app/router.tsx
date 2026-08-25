import { Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AdminCategoriesPage } from '@/pages/admin/AdminCategoriesPage'
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage'
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage'
import { AdminOrdersPage } from '@/pages/admin/AdminOrdersPage'
import { AdminProductEditPage } from '@/pages/admin/AdminProductEditPage'
import { AdminProductNewPage } from '@/pages/admin/AdminProductNewPage'
import { AdminProductsPage } from '@/pages/admin/AdminProductsPage'
import { AboutPage } from '@/pages/public/AboutPage'
import { CartPage } from '@/pages/public/CartPage'
import { CatalogPage } from '@/pages/public/CatalogPage'
import { CategoryPage } from '@/pages/public/CategoryPage'
import { CheckoutPage } from '@/pages/public/CheckoutPage'
import { ContactPage } from '@/pages/public/ContactPage'
import { DiscountsPage } from '@/pages/public/DiscountsPage'
import { HomePage } from '@/pages/public/HomePage'
import { NotFoundPage } from '@/pages/public/NotFoundPage'
import { OrderSuccessPage } from '@/pages/public/OrderSuccessPage'
import { ProductPage } from '@/pages/public/ProductPage'

export function AppRouter() {
  return (
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
  )
}
