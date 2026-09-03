import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { isSupabaseConfigured } from '@/services/config'
import { AdminHeader } from './AdminHeader'
import { AdminMobileMenu } from './AdminMobileMenu'
import { AdminSidebar } from './AdminSidebar'
import styles from './AdminLayout.module.css'

export function AdminLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)')
    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsMenuOpen(false)
      }
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className={styles.layout}>
      <AdminHeader isMenuOpen={isMenuOpen} onMenuOpen={() => setIsMenuOpen(true)} />
      <AdminMobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div className={styles.body}>
        <div className={styles.sidebarWrap}>
          <AdminSidebar />
        </div>
        <div className={styles.content}>
          {!isSupabaseConfigured() ? (
            <p className={styles.notice}>
              Supabase is not connected yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to `.env`,
              then run `supabase/schema.sql` in the Supabase SQL editor.
            </p>
          ) : null}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
