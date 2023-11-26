import { FC, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components'

import styles from './MainLayout.module.scss'
import { useAuthStore } from '@/store'
import { isRouteAllowed } from '@/utils/permissions'

import { NotFoundPage } from '@/pages'
import useCheckMobileScreen from '@/hooks/useCheckMobileScreen'

interface IMainLayoutProps {}

export const MainLayout: FC<IMainLayoutProps> = () => {
  const path = useLocation()
  const { user } = useAuthStore()
  const [permissionError, setPermissionError] = useState<boolean>(false)

  const isMobile = useCheckMobileScreen()
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(!isMobile)

  useEffect(() => {
    if (user) {
      const isAllowed = isRouteAllowed(user?.permissions, path.pathname)
      setPermissionError(!isAllowed)
    }
  }, [user, path.pathname])

  const handleMouseEnterSidebar = () => {
    setSidebarCollapsed(false)
  }

  const handleMouseLeaveSidebar = () => {
    setSidebarCollapsed(true)
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.sidebar}
        onMouseEnter={handleMouseEnterSidebar}
        onMouseLeave={handleMouseLeaveSidebar}
      >
        <Sidebar activeItemId={path.pathname} isCollapsed={isSidebarCollapsed} />
      </div>
      <main className={styles.body}>
        {permissionError && <NotFoundPage text="У вас нет доступа к странице" />}
        {!permissionError && <Outlet />}
      </main>
    </div>
  )
}
