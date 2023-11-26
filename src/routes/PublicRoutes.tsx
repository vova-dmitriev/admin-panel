import { lazy } from 'react'
import { IRoute } from '@/types/routes'
import { PUBLIC_ROUTES } from './constants'

export const publicRoutes: IRoute[] = [
  {
    path: PUBLIC_ROUTES.LOGIN,
    name: 'Логин',
    component: lazy(() => import('@/pages/LoginPage/LoginPage')),
  },
]
