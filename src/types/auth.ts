import { IUser } from './users'

export interface ILoginData {
  email: string
  password: string
}

export interface ILoginResponse {
  accessToken: string
  user: IUser
}
