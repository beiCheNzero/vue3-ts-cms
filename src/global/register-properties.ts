import { App } from 'vue'

import { formatUtcString } from '@/utils/data-format'

export default function registerProperties(app: App) {
  // 往app的配置里面添加全局的配置
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
