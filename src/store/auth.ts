import { create } from 'zustand'

import {
  getFromLocalStorage,
  saveToLocalStorage,
  deleteFromLocalStorage,
} from '@/utils/localStorage'

import { LS_TOKEN, LS_USER } from '@/constants/localStorage'

import AuthService from '@/api/AuthService'
import { IUser, RequestStatus, StateStatuses } from '@/types'
import { omit } from 'lodash'
import { handleError } from './helpers'

export interface IAuthActions {
  login: (email: string, password: string) => void
  logout: () => void
  clearError: () => void
  resetToken: () => void
  resetUser: () => void
}

export type AuthStateStatuses = StateStatuses<IAuthActions>

const initStatuses: AuthStateStatuses = {
  login: RequestStatus.none,
}
export interface IAuthState {
  isLoading: boolean
  error: string | null
  token: string | null
  user: IUser | null
  statuses: AuthStateStatuses
}

const savedToken = getFromLocalStorage(LS_TOKEN) || 'token'
const savedUser = getFromLocalStorage(LS_USER) || null

const initialState: IAuthState = {
  isLoading: false,
  error: null,
  token: savedToken,
  user: savedUser,
  statuses: initStatuses,
}

export const useAuthStore = create<IAuthState & IAuthActions>()((set, get) => ({
  ...initialState,
  login: async (email: string, password: string) => {
    try {
      set({
        isLoading: true,
        error: null,
        statuses: { ...get().statuses, login: RequestStatus.loading },
      })

      const response = await AuthService.login({ email, password })
      const token = response.data.accessToken

      const user = omit(response.data.user, 'password')

      set({ user, token, isLoading: false })
      saveToLocalStorage(LS_TOKEN, token)
      saveToLocalStorage(LS_USER, user)
      set({ isLoading: false })
    } catch (e) {
      handleError(e, set)
      set({ statuses: { ...get().statuses, login: RequestStatus.fail } })
      get().resetToken()
      get().resetUser()
    }
  },
  setToken: (token: string) => {
    set({ token })
    saveToLocalStorage(LS_TOKEN, token)
  },
  resetToken: () => {
    set({ token: null })
    deleteFromLocalStorage(LS_TOKEN)
  },
  resetUser: () => {
    set({ user: null })
    deleteFromLocalStorage(LS_USER)
  },
  logout: async () => {
    set({ user: null })
    get().resetToken()
    get().resetUser()
  },
  clearError: () => {
    set({ error: null })
  },
}))
