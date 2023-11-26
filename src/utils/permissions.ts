import { segregation } from '@/config/roles.config'
import { ADMIN, OWNER } from '@/constants/permissions'
import { IUser } from '@/types'

export const checkIsBoss = (user: IUser): boolean => {
  return user.permissions.includes(ADMIN) || user.permissions.includes(OWNER)
}

export const isRouteAllowed = (userPermissions: string[], route: string): boolean => {
  for (const permission of userPermissions) {
    if (!segregation[route].includes(permission)) {
      return false
    }
  }
  return true
}
