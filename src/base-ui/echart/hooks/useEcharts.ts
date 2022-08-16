import * as echarts from 'echarts'

import ChineMapData from '../data/china.json'

echarts.registerMap('china', ChineMapData)

// 这个Echarts的专属hooks，降低对Echarts的耦合度
export default function (el: HTMLElement) {
  const echartsInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options)
  }

  const updateSize = () => {
    echartsInstance.resize()
  }
  // 对图形的宽度和大小进行一个适配(响应式)
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })

  // 这种导出方式可以只获取其中的一个方法/属性
  return { echartsInstance, setOptions, updateSize }
}
