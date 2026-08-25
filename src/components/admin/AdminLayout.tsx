import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { isSupabaseConfigured } from '@/services/config'
import { AdminHeader } from './AdminHeader'
import { AdminSidebar } from './AdminSidebar'
import styles from './AdminLayout.module.css'

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className={styles.layout}>
      <AdminHeader onMenuToggle={() => setIsSidebarOpen((value) => !value)} />
      <div className={styles.body}>
        <div className={isSidebarOpen ? styles.sidebarWrapOpen : styles.sidebarWrap}>
          <AdminSidebar onNavigate={() => setIsSidebarOpen(false)} />
        </div>
        <div className={styles.content}>
          {!isSupabaseConfigured() ? (
            <p className={styles.notice}>
              Mock data is in use. After `.env` is filled, this layer will switch to Supabase without changing pages.
            </p>
          ) : null}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
