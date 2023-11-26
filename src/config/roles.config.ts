import permissions from '@/constants/permissions'
import { PRIVATE_ROUTES } from '@/routes/constants'

export const segregation = {
  [PRIVATE_ROUTES.PROFILE]: [
    permissions.OWNER,
    permissions.ADMIN,
    permissions.BLOG,
    permissions.MODERATOR,
    permissions.TECH_SUPPORT,
    permissions.ANALYST,
    permissions.STOCK,
    permissions.CUSTOMERS,
  ],
  [PRIVATE_ROUTES.ANALISYS]: [permissions.OWNER, permissions.ADMIN, permissions.ANALYST],
  [PRIVATE_ROUTES.MODERATE]: [permissions.OWNER, permissions.ADMIN, permissions.MODERATOR],
  [PRIVATE_ROUTES.CHATS]: [
    permissions.OWNER,
    permissions.ADMIN,
    permissions.MODERATOR,
    permissions.TECH_SUPPORT,
  ],
  [PRIVATE_ROUTES.BANNERS]: [permissions.OWNER, permissions.ADMIN, permissions.BLOG],
  [PRIVATE_ROUTES.USERS]: [permissions.OWNER, permissions.ADMIN, permissions.TECH_SUPPORT],
  [PRIVATE_ROUTES.BLOG]: [
    permissions.OWNER,
    permissions.ADMIN,
    permissions.BLOG,
    permissions.TECH_SUPPORT,
  ],
  [PRIVATE_ROUTES.CURRENCY]: [
    permissions.OWNER,
    permissions.ADMIN,
    permissions.STOCK,
    permissions.ANALYST,
  ],
  [PRIVATE_ROUTES.EXCHANGE]: [
    permissions.OWNER,
    permissions.ADMIN,
    permissions.STOCK,
    permissions.ANALYST,
  ],
}
