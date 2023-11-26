export interface IUser {
  name: string
  image?: string
  email: string
  permissions: string[]
  isAuthorized?: boolean
}

export interface IUsersResponse {
  users: IUser[]
}

export interface IModifyUserResponse {
  user: IUser
}
