import React, { FC, useEffect } from 'react'
import clsx from 'clsx'

import { useNavigate } from 'react-router-dom'
import { Burger, Logo, Logout } from '@/assets/icons'
import { sidebarMenuItems } from '@/containers'

import styles from './Sidebar.module.scss'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/routes/constants'
import { useAppStore, useAuthStore } from '@/store'
import { ISidebarMenuItem } from '@/containers/SidebarMenu/SidebarMenu'
import useCheckMobileScreen from '@/hooks/useCheckMobileScreen'

interface ISidebarProps {
  activeItemId?: string
  isCollapsed: boolean
}

const isStrokeItem = (el: ISidebarMenuItem): boolean => {
  return el.id === PRIVATE_ROUTES.CURRENCY
}

export const Sidebar: FC<ISidebarProps> = ({ activeItemId, isCollapsed }) => {
  const nav = useNavigate()
  const { user, logout } = useAuthStore()
  const { isSidebarVisible, changeSidebarVisible } = useAppStore()
  const isMobile = useCheckMobileScreen()

  const handleClickLogo = () => {
    nav(PRIVATE_ROUTES.USERS)
  }

  const handleClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault()
    nav(path)
  }

  const handleLogout = () => {
    logout()
  }

  const handleBurgerClick = () => {
    changeSidebarVisible(false)
  }

  useEffect(() => {
    if (!isMobile) {
      changeSidebarVisible(true)
    }
  }, [changeSidebarVisible, isMobile])

  if (!isSidebarVisible) return null

  return (
    <aside className={clsx(styles.sidebar, isCollapsed && styles.sidebarCollapsed)}>
      <div className={styles.items}>
        <div className={styles.itemsTop}>
          {isMobile && (
            <div className={styles.burger} onClick={handleBurgerClick}>
              <Burger />
            </div>
          )}
          {!isMobile && (
            <div className={styles.logo} onClick={handleClickLogo}>
              <a href={PUBLIC_ROUTES.HOME} title={'На главную'}>
                <Logo />
              </a>
            </div>
          )}
          {user && user.image && (
            <div className={styles.avatarContainer} onClick={handleClickLogo}>
              <img className={styles.avatar} src={user.image} alt={user.name} />
              {!isCollapsed && (
                <div className={styles.user}>
                  <div className={styles.name}>{user.name}</div>
                  <div className={styles.role}>{user.permissions?.[0]}</div>
                </div>
              )}
            </div>
          )}
          {sidebarMenuItems.map((el, idx) => (
            <div
              key={idx}
              onClick={e => handleClick(e, el.path)}
              className={clsx(
                styles.item,
                el.id === activeItemId && styles.itemActive,
                isStrokeItem(el) && styles.itemStrokeIcon,
              )}
            >
              <a href={el.path} title={el.text}>
                {el.icon}
              </a>
              <div className={clsx(styles.itemText, isCollapsed && styles.itemTextHidden)}>
                {el.text}
              </div>
            </div>
          ))}
          <div className={clsx(styles.item, styles.itemLogout)} onClick={handleLogout}>
            <Logout />
            <div
              className={clsx(styles.itemTextLogout, isCollapsed && styles.itemTextLogoutHidden)}
            >
              Выход
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
