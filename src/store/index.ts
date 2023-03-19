import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStore } from './types'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      token: '',
      entirDepartment: [],
      entirRole: [],
      entirMenu: []
    }
  },
  mutations: {
    changeEntirDepartment(state, departmentList) {
      state.entirDepartment = departmentList
    },
    changeEntirRole(state, roleList) {
      state.entirRole = roleList
    },
    changeEntirMenu(state, menuList) {
      state.entirMenu = menuList
    }
  },
  getters: {},
  actions: {
    // 请求使出数据
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      // const departmentResult = await getPageListData('/department/list', {
      //   offset: 0,
      //   size: 100
      // })
      // const { list: departmentList } = departmentResult.data
      // 这里起别名不能用as  list: roleList这种是es6之后的语法
      const roleResult = await getPageListData('/users/roleList', { offset: 0, size: 100 })
      const { list: roleList } = roleResult.data
      // 请求完整的权限菜单
      const menuResult = await getPageListData('/users/menuList', {})
      const { list: menuList } = menuResult.data

      // 2.保存数据
      // commit('changeEntirDepartment', departmentList)
      commit('changeEntirRole', roleList)
      commit('changeEntirMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

// 避免用户登录后刷新界面vuex中的数据丢失，我们是从localStorage中重新获取一遍
// 在main.ts中导入，做一个全局的方法执行。保证刷新时数据不会丢失
export function setupStore() {
  // dispatch：含有异步操作，数据提交至 actions ，可用于向后台提交数据
  // commit：同步操作，数据提交至 mutations ，可用于读取用户信息写到缓存里
  // 这里是提交数据到login模块下面的actions里面的loadLocalLogin方法
  store.dispatch('login/loadLocalLogin')
  /*
   * 如果在这里调用有可能在登录时，没有拿到token，就调用，这样是获取不到数据的
   * 因为是在actions中异步函数请求的，所以需要在确定拿到token之后再去调用初始化函数
   * 这也是为了防止错误的产生
   */
  // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStore> {
  return useVuexStore()
}

export default store
