<template>
  <div class="page-search">
    <ljl-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2>{{ title }}</h2>
      </template>
      <template #footer>
        <div class="search-btn">
          <el-button @click="handleResetClick">
            <el-icon><Refresh /></el-icon> 重置
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <el-icon><Search /></el-icon>搜索
          </el-button>
        </div>
      </template>
    </ljl-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LjlForm from '@/base-ui/form'

interface IFormData {
  [key: string]: any
}

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: '高级检索'
    }
  },
  components: {
    LjlForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    /*
     * 优化一：formData中的属性应该动态来决定
     */
    // 双向绑定的属性应该是由配置文件的field决定的
    const formOriginData: IFormData = {}
    const formItems = props.searchFormConfig.formItems ?? []
    for (const item of formItems) {
      // 这里拿到的是id,name等，然后作为key，并且把value设置为一个空的字符串
      formOriginData[item.field] = ''
    }

    const formData = ref<IFormData>({ ...formOriginData })

    /*
     * 优化二: 当用户点击重置时清零input框
     */
    const handleResetClick = () => {
      // 第一种方式
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      // 第二种方式
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    /*
     * 优化三：用户点击搜索
     */
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.search-btn {
  text-align: right;
  padding: 0 40px 20px 0;
}
</style>
