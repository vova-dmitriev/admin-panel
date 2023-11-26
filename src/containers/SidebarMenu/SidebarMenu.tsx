import {
  Pie,
	User,
	Doc,
  Message,
  Gallery,
  Command,
  List,
  Dollar,
  Coins,
} from '@/assets/icons'

import { PRIVATE_ROUTES } from '@/routes/constants'

export interface ISidebarMenuItem {
  id: string
  text?: string
  icon: JSX.Element
  path: string
}

export const sidebarMenuItems: ISidebarMenuItem[] = [
  {
    id: PRIVATE_ROUTES.ANALISYS,
    text: 'Аналитика',
    icon: <Pie />,
    path: PRIVATE_ROUTES.ANALISYS,
  },
  {
    id: PRIVATE_ROUTES.PROFILE,
    text: 'Профиль',
    icon: <User />,
    path: PRIVATE_ROUTES.PROFILE,
  },
  {
    id: PRIVATE_ROUTES.MODERATE,
    text: 'Модерация',
    icon: <Doc />,
    path: PRIVATE_ROUTES.MODERATE,
  },
  {
    id: PRIVATE_ROUTES.CHATS,
    text: 'Чаты',
    icon: <Message />,
    path: PRIVATE_ROUTES.CHATS,
  },
  {
    id: PRIVATE_ROUTES.BANNERS,
    text: 'Баннеры',
    icon: <Gallery />,
    path: PRIVATE_ROUTES.BANNERS,
  },
  {
    id: PRIVATE_ROUTES.USERS,
    text: 'Команда',
    icon: <Command />,
    path: PRIVATE_ROUTES.USERS,
  },
  {
    id: PRIVATE_ROUTES.BLOG,
    text: 'Блог',
    icon: <List />,
    path: PRIVATE_ROUTES.BLOG,
  },
  {
    id: PRIVATE_ROUTES.CURRENCY,
    text: 'Курс валют',
    icon: <Dollar />,
    path: PRIVATE_ROUTES.CURRENCY,
  },
  {
    id: PRIVATE_ROUTES.EXCHANGE,
    text: 'Акции',
    icon: <Coins />,
    path: PRIVATE_ROUTES.EXCHANGE,
  },
]
