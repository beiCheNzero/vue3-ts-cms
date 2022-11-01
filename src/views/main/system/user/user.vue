<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-model
      :defaultInfo="defaultInfo"
      pageName="users"
      ref="pageModelRef"
      :modelConfig="modelConfigRef"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageModel from '@/components/page-model'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModel } from '@/hooks/usePageModel'

export default defineComponent({
  name: 'users',
  components: {
    PageSearch,
    PageContent,
    PageModel
  },
  setup() {
    // 也可以直接在return中结构usePageSearch,代码的阅读性比较差
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch() as any

    // pageModel相关的hook逻辑
    // 1.处理是否显示密码的相关逻辑
    const newCallback = () => {
      const passwordItem = modelConfig.formItems.find((item) => item.field === 'password')
      // 这里使用非空断言是确定了passwordItem是有值的
      // 并且排除null和undefined的类型，这里是排除了undefined的类型
      // 将鼠标放到passwordItem上时看到时 string | undefined 两种可选类型
      // 在新建的时候显示密码框
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modelConfig.formItems.find((item) => item.field === 'password')
      passwordItem.isHidden = true
    }

    /*
     * 解决了在用户界面发生刷新，select中没有选项的问题
     * 这里获取的是vuex中的数据
     * 当vuex中的数据发生改变，这里的computed的副作用就会重新执行，会给options里面重新赋值
     * 然后修改了modelConfig.options,然后返回改变后的modelConfig，并且把计算属性给到modelConfigRef
     * 然后通过传递更新后的配置到page-model界面发生改变。

     * 利用computed监听vuex中的数据的改变，然后重新执行computed的get函数
     */
    // 2.动态添加部门和角色列表
    const store = useStore()
    const modelConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find((item) => item.field === 'departmentId')
      departmentItem.options = store.state.entirDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modelConfig.formItems.find((item) => item.field === 'roleId')
      roleItem.options = store.state.entirRole.map((item) => {
        return { title: item.name, value: item.id }
      })

      return modelConfig
    })

    // 3.调用hooks获取公共的变量和函数
    const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
      newCallback,
      editCallback
    ) as any

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modelConfig,
      modelConfigRef,
      pageModelRef,
      handleEditData,
      handleNewData,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less"></style>
