import { Module } from 'vuex'

// 发送网络请求的方法
import {
  getCatetoryGoodsSale,
  getCatetoryGoodsCount,
  getCatetoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

import { IDashboardState } from './types'
import { IRootState } from '@/store/types'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, data) {
      state.categoryGoodsCount = data
    },
    changeCategoryGoodsSale(state, data) {
      state.categoryGoodsSale = data
    },
    changeCategoryGoodsFavor(state, data) {
      state.categoryGoodsFavor = data
    },
    changeAddressGoodsSale(state, data) {
      state.addressGoodsSale = data
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCatetoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult.data)
      const categoryGoodsSale = await getCatetoryGoodsSale()
      commit('changeCategoryGoodsSale', categoryGoodsSale.data)
      const categoryGoodsFavor = await getCatetoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryGoodsFavor.data)
      const addressGoodsSale = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsSale.data)
    }
  }
}

export default dashboardModule
