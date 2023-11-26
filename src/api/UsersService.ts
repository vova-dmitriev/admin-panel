import { IModifyUserResponse, IUser, IUsersResponse } from '@/types'
import { AxiosResponse } from 'axios'

import mockUsers from '@/mock/users.mock.json'

import { delay, fakeAxiosResponse } from '@/utils/async'

export default class UsersService {
  static async getUsers(): Promise<AxiosResponse<IUsersResponse>> {
    return delay(resolve => {
      resolve(fakeAxiosResponse<IUsersResponse>({ users: mockUsers }))
    }, 500)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async removeUser(_email: string): Promise<AxiosResponse<string>> {
    return delay(resolve => {
      resolve(fakeAxiosResponse('User deleted successfully'))
    }, 500)
  }

  static async changeUserPermissions(
    user: IUser,
    newPermissions: string[],
  ): Promise<AxiosResponse<IModifyUserResponse>> {
    return delay(resolve => {
      const newUser: IUser = { ...user, permissions: newPermissions }
      resolve(fakeAxiosResponse<IModifyUserResponse>({ user: newUser }))
    }, 500)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static async sendInvite(_email: string, _permissions: string[]): Promise<AxiosResponse<string>> {
    return delay(resolve => {
      resolve(fakeAxiosResponse('Invite send successfully'))
    }, 500)
  }
}
