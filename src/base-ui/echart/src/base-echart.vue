<template>
  <div class="base-echart">
    <div ref="echartRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEcharts from '../hooks/useEcharts'

// 定义props
// 这里的类型是js中的类型
// defineProps({
//   width: String,
//   height: String
// })
// 这里的是ts中的类型
// 定义默认值
// 且这里的类型是必选的
// 这里没有默认值
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    options: () => ({}),
    width: '100%',
    height: '260px'
  }
)

const echartRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEcharts(echartRef.value!)
  // 当数据发生改变的时候重新设置一次配置
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
