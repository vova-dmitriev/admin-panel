import { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios'

export function delay<T>(
  callback: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void,
  duration: number = 500,
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      callback(resolve, reject)
    }, duration)
  })
}

export const fakeAxiosResponse = <T>(data: any): AxiosResponse<T> => {
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {
      headers: {} as AxiosRequestHeaders,
    },
  }
}

export const fakeAxiosError = (message: string, code: string = '404'): AxiosError => {
  return new AxiosError(message, code)
}
