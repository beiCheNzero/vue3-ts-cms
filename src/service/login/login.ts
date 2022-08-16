import ljlRequest from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../types'

enum loginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

//
export function accountLoginRequest(account: IAccount) {
  return ljlRequest.post<IDataType<ILoginResult>>({
    url: loginAPI.AccountLogin,
    data: account
  })
}

export function gettUserInfoById(id: number) {
  return ljlRequest.get<IDataType>({
    url: loginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusById(id: number) {
  return ljlRequest.get<IDataType>({
    url: loginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
