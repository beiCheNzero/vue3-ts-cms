import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from '@/store/types'

import {
  deletePageList,
  getPageListData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

// 通过map映射获取地址
// const pageMapUrl = {
//   users: '/api/users/list'
// }

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
        //   switch (pageName) {
        //     case 'users':
        //       return state.usersList
        //     case 'role':
        //       return state.roleList
        //   }
        // }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    },
    pageGoodsCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    },
    pageMenuCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    // 获取数据
    async getPageListAction({ commit }, payload: any) {
      // 1. 获取pageUrl
      /*
       *  1.如果后端接口请求的的地址比较规范可以拿到pageName然后做一个拼接
       */
      // const PAGE_URL = `${payload.pageName}` + '/list'

      /*
       *  2.如果后端接口请求地址很奇怪可以用switch
       */
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      // }

      /*
       *  3.也可以通过map映射来取地址
       */
      // const page_url = pageMapUrl[payload.pageName]

      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.处理数据,将数据存到state中
      const { list, totalCount } = pageResult.data

      const pageChangeName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${pageChangeName}List`, list)
      commit(`change${pageChangeName}Count`, totalCount)

      // switch (pageName) {
      //   case 'users':
      //     commit('changeUserList', list)
      //     commit('changeUserCount', totalCount)
      //     break
      //   case 'role':
      //     commit('changeRoleList', list)
      //     commit('changeRoleCount', totalCount)
      // }
    },

    // 删除数据
    async deletePageDataAction({ dispatch }, payload: any) {
      // 需要pageName , id参数
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 调用删除的网络请求
      await deletePageList(pageUrl)

      // 重新请求最新的数据
      dispatch('getPageListAction', {
        /*
         * 如果想获取到pageSearch中的查询输入的信息，可以把pageSearch和pageContent的数据共享到vuex中
         * 然后通过vuex获取
         */
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 新建数据
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      // newData新建的数据
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 编辑数据
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      dispatch('getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
