import axios from 'axios'
import { RequestStatus } from '@/types'

export const handleError = (e: unknown, set: (data: any) => void) => {
  if (axios.isAxiosError(e)) {
    set({ error: e.response?.data?.message })
  } else {
    const errStr = typeof e === 'string' ? e : 'Неизвестная ошибка'
    set({ error: errStr, isLoading: false })
  }
}

export const setLoadingStatus = (set: any, get: any, key: string) => {
  set({
    isLoading: false,
    error: null,
    statuses: { ...get().statuses, [key]: RequestStatus.loading },
  })
}

export const setFailStatus = (set: any, get: any, key: string) => {
  set({ isLoading: false, statuses: { ...get().statuses, [key]: RequestStatus.fail } })
}

export const setSuccessStatus = (set: any, get: any, key: string) => {
  set({ isLoading: false, statuses: { ...get().statuses, [key]: RequestStatus.success } })
}
