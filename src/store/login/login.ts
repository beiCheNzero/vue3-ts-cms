// 用ts的方式需要导入一个module
import { Module } from 'vuex'

import { accountLoginRequest, gettUserInfoById, requestUserMenusById } from '@/service/login/login'
import { mapMenusTopermissions, mapMenusToRoutes } from '@/utils/map-menus'
import localCache from '@/utils/cache'

import { IAccount } from '@/service/login/type'
import { IloginState } from './types'
import { IRootState } from '../types'
import router from '@/router'
import store from '..'

// 这里的Module<S, R>需要传入两个泛型
// S是模块中state的类型, R是根store中的state的类型
const loginModule: Module<IloginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    // 保存token
    changeToken(state, token: string) {
      state.token = token
    },
    // 保存用户数据
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    // 保存用户菜单
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)

      // 将routes => router.main.children里面
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮权限
      const permission = mapMenusTopermissions(userMenus)
      // console.log(permission)

      state.permissions = permission
    }
  },
  getters: {},
  actions: {
    // async 异步
    /*
     * async声明的异步函数，返回值会自动包装一个promise
     */
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      /*
       * await只是以同步的方式去调用异步的代码，会将promise.then调用的后的结果返回
       * 1. 可以在async函数里面使用
       * 2. 可以在模块的最外层作用域中使用await
       */
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      console.log('res', loginResult)
      const { id, token } = loginResult.data
      // 这里需要对token进行修改，需要在mutations中进行
      commit('changeToken', token)
      // 把token做一个本地缓存
      localCache.setCatch('token', token)

      /*
       * 在拿到token之后在发送初始化的请求(role/department)
       */
      // 这样就可以调到根vuex数据里面的actions了
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await gettUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCatch('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusById(userInfo.role.id)
      const userMenus = userMenusResult.data
      console.log(userMenus)
      commit('changeUserMenus', userMenus)
      localCache.setCatch('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },

    // 本地加载
    // 防止用户登陆后刷新界面导致vuex中的数据都没有了
    // 获取localStorage中的数据再次赋值给state
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCatch('token')
      if (token) {
        // dispatch：含有异步操作，数据提交至 actions ，可用于向后台提交数据
        // commit：同步操作，数据提交至 mutations ，可用于读取用户信息写到缓存里
        commit('changeToken', token)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCatch('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCatch('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
