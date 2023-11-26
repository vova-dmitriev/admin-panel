import { ILoginResponse, ILoginData } from '@/types'
import { AxiosResponse } from 'axios'
import { v4 as uuidv4 } from 'uuid'

import mockOwner from '@/mock/owner.mock.json'
import { ERROR_TEXT } from '@/constants'
import { omit } from 'lodash'
import { fakeAxiosResponse } from '@/utils/async'

export default class AuthService {
  static async login(loginData: ILoginData): Promise<AxiosResponse<ILoginResponse>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (loginData.email !== mockOwner.email || loginData.password !== mockOwner.password) {
          reject(ERROR_TEXT.invalid_password)
        }

        const mockResponse = fakeAxiosResponse<ILoginResponse>({
          accessToken: uuidv4(),
          user: omit(mockOwner, 'password'),
        })

        resolve(mockResponse)
      }, 500)
    })
  }
}
