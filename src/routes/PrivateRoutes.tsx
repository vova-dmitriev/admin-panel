import { lazy } from 'react'
import { IRoute } from '@/types/routes'
import { PRIVATE_ROUTES } from './constants'

export const privateRoutes: IRoute[] = [
  {
    path: PRIVATE_ROUTES.PROFILE,
    name: 'Профиль',
    component: lazy(() => import('@/pages/NotFoundPage/NotFoundPage')), // TODO: awaiting design
  },
  {
    path: PRIVATE_ROUTES.ANALISYS,
    name: 'Аналитика',
    component: lazy(() => import('@/pages/NotFoundPage/NotFoundPage')), // TODO: awaiting design
  },
  {
    path: PRIVATE_ROUTES.MODERATE,
    name: 'Модерация',
    component: lazy(() => import('@/pages/NotFoundPage/NotFoundPage')), // TODO: awaiting design
  },
  {
    path: PRIVATE_ROUTES.CHATS,
    name: 'Чаты',
    component: lazy(() => import('@/pages/NotFoundPage/NotFoundPage')), // TODO: awaiting design
  },
  {
    path: PRIVATE_ROUTES.BANNERS,
    name: 'Баннеры',
    component: lazy(() => import('@/pages/NotFoundPage/NotFoundPage')), // TODO: awaiting design
  },
  {
    path: PRIVATE_ROUTES.USERS,
    name: 'Команды',
    component: lazy(() => import('@/pages/UsersPage/UsersPage')),
  },

  {
    path: PRIVATE_ROUTES.BLOG,
    name: 'Блог',
    component: lazy(() => import('@/pages/NotFoundPage/NotFoundPage')), // TODO: awaiting design
  },
  {
    path: PRIVATE_ROUTES.CURRENCY,
    name: 'Курс валют',
    component: lazy(() => import('@/pages/NotFoundPage/NotFoundPage')), // TODO: awaiting design
  },
  {
    path: PRIVATE_ROUTES.EXCHANGE,
    name: 'Акции',
    component: lazy(() => import('@/pages/NotFoundPage/NotFoundPage')), // TODO: awaiting design
  },
]
