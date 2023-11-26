import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import styles from './MinimalLayout.module.scss'

interface IMinimalLayoutProps {}

export const MinimalLayout: FC<IMinimalLayoutProps> = () => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.body}>
        <Outlet />
      </main>
    </div>
  )
}
