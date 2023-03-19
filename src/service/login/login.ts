import ljlRequest from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../types'

enum loginAPI {
  AccountLogin = '/users/login',
  LoginUserInfo = '/users/users/',
  UserMenus = '/users/roleMenus/'
}

//
export function accountLoginRequest(account: IAccount) {
  return ljlRequest.post<IDataType<ILoginResult>>({
    url: loginAPI.AccountLogin,
    data: account
  })
}

export function gettUserInfoById(id: number) {
  return ljlRequest.post<IDataType>({
    url: loginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusById(id: number) {
  return ljlRequest.post<IDataType>({
    url: loginAPI.UserMenus + id,
    showLoading: false
  })
}
