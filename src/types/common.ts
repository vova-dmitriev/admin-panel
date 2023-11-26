export enum RequestStatus {
  none = 'none',
  loading = 'loading',
  success = 'success',
  fail = 'fail',
}

export type StateStatuses<T> = Partial<Record<keyof T, RequestStatus>>
