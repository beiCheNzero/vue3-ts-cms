<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <ljl-card title="分类商品数量(饼图)">
          <pie-echarts :pieData="categoryGoodsCount"></pie-echarts>
        </ljl-card>
      </el-col>
      <el-col :span="10">
        <ljl-card title="不同城市商品销量">
          <map-echarts :mapData="addressGoodsSale"></map-echarts>
        </ljl-card>
      </el-col>
      <el-col :span="7">
        <ljl-card title="分类商品数量(玫瑰图)">
          <rose-echarts :roseData="categoryGoodsCount"></rose-echarts>
        </ljl-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <ljl-card title="分类商品销量">
          <line-echarts v-bind="categoryGoodsSale" title="商品销量"></line-echarts>
        </ljl-card>
      </el-col>
      <el-col :span="12">
        <ljl-card title="分类商品收藏">
          <bar-echarts v-bind="categoryGoodsFavor" title="渐变?"></bar-echarts>
        </ljl-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import LjlCard from '@/base-ui/card'
import {
  PieEcharts,
  RoseEcharts,
  LineEcharts,
  BarEcharts,
  MapEcharts
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    LjlCard,
    PieEcharts,
    RoseEcharts,
    LineEcharts,
    BarEcharts,
    MapEcharts
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboard/getDashboardDataAction')

    // 获取数据
    const categoryGoodsCount = computed(() => {
      // 拿到的数据不符合要求，通过map映射成一个对象
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.el-row {
  margin-top: 15px;
}
</style>
