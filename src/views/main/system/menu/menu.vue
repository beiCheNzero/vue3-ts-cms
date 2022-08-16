<template>
  <div class="menu">
    <page-content :contentTableConfig="contentTableConfig" pageName="menu"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'

import { contentTableConfig } from './config/content.config'

export default defineComponent({
  // 这里的name的值如果时menu时，浏览器会报一个警告，因为和html内置的一个属性/标签名称一致
  name: 'ljl-menu',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
