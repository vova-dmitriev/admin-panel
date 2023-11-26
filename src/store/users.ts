import { create } from 'zustand'

import UsersService from '@/api/UsersService'
import { IUser, RequestStatus, StateStatuses } from '@/types'
import { handleError } from './helpers'

export interface IUsersAction {
  getUsers: () => void
  changeUserPermissions: (user: IUser, newPermissions: string[]) => void
  removeUser: (user: IUser) => void
  sendInvite: (data: { email: string; permissions: string[]; needAddUser?: boolean }) => void
  resetStatuses: () => void
}

export type UserStateStatuses = StateStatuses<IUsersAction>

const initStatuses: UserStateStatuses = {
  getUsers: RequestStatus.none,
  changeUserPermissions: RequestStatus.none,
  removeUser: RequestStatus.none,
  sendInvite: RequestStatus.none,
}

export interface IUsersState {
  isLoading: boolean
  error: string | null
  users: IUser[]
  statuses: UserStateStatuses
}

const initialState: IUsersState = {
  isLoading: false,
  error: null,
  users: [],
  statuses: initStatuses,
}

export const useUsersStore = create<IUsersState & IUsersAction>()((set, get) => ({
  ...initialState,
  getUsers: async () => {
    try {
      set({
        isLoading: true,
        error: null,
        statuses: { ...get().statuses, getUsers: RequestStatus.loading },
      })

      const response = await UsersService.getUsers()
      set({
        users: response.data.users,
        isLoading: false,
        statuses: { ...get().statuses, getUsers: RequestStatus.success },
      })
    } catch (e) {
      handleError(e, set)
      set({ statuses: { ...get().statuses, getUsers: RequestStatus.fail } })
    }
  },
  removeUser: async (user: IUser) => {
    try {
      set({
        isLoading: true,
        error: null,
        statuses: { ...get().statuses, removeUser: RequestStatus.loading },
      })
      await UsersService.removeUser(user.email)
      const newUsers = get().users.filter(u => u.email !== user.email)
      set({
        isLoading: false,
        users: newUsers,
        statuses: { ...get().statuses, removeUser: RequestStatus.success },
      })
    } catch (e) {
      handleError(e, set)
      set({ statuses: { ...get().statuses, removeUser: RequestStatus.fail } })
    }
  },
  changeUserPermissions: async (user: IUser, newPermissions: string[]) => {
    try {
      set({
        isLoading: true,
        error: null,
        statuses: { ...get().statuses, changeUserPermissions: RequestStatus.loading },
      })
      const response = await UsersService.changeUserPermissions(user, newPermissions)
      const newUsers = get().users.map(u => {
        if (u.email === user.email) {
          return response.data.user
        }
        return u
      })
      set({
        isLoading: false,
        users: newUsers,
        statuses: { ...get().statuses, changeUserPermissions: RequestStatus.success },
      })
    } catch (e) {
      handleError(e, set)
      set({ statuses: { ...get().statuses, changeUserPermissions: RequestStatus.fail } })
    }
  },
  sendInvite: async (data: { email: string; permissions: string[]; needAddUser?: boolean }) => {
    try {
      set({
        isLoading: true,
        error: null,
        statuses: { ...get().statuses, sendInvite: RequestStatus.loading },
      })
      await UsersService.sendInvite(data.email, data.permissions)

      let newUsers = get().users
      if (data.needAddUser) {
        const newUser: IUser = {
          email: data.email,
          name: 'Пользователь',
          permissions: data.permissions,
          isAuthorized: false,
        }
        newUsers = [newUser, ...get().users]
      }

      set({
        isLoading: false,
        users: newUsers,
        statuses: { ...get().statuses, sendInvite: RequestStatus.success },
      })
    } catch (e) {
      handleError(e, set)
      set({ statuses: { ...get().statuses, sendInvite: RequestStatus.fail } })
    }
  },
  resetStatuses: () => {
    set({ statuses: initStatuses })
  },
}))
