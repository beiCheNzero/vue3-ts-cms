<template>
  <div class="dashboard">
    <div ref="divRef" :style="{ width: '400px', height: '400px' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import * as echarts from 'echarts'

export default defineComponent({
  name: 'dashboard',
  setup() {
    const divRef = ref<HTMLElement>()
    onMounted(() => {
      // 1.初始化echarts实例
      // 第一个参数：dom
      // 第二个参数：theme(light/dark)
      // 第三个参数：渲染器
      const echartsInstance = echarts.init(divRef.value, 'dark', {
        renderer: 'svg' //canvas
      })
      // 2.编写配置文件
      const option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
      // 3.设置配置，并且开始绘制
      echartsInstance.setOption(option)
    })

    return {
      divRef
    }
  }
})
</script>

<style scoped></style>
