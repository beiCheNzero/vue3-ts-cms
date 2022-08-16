<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-model
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :modelConfig="modelConfig"
      pageName="role"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { menuMapLeafKeys } from '@/utils/map-menus'

// 传入组件
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'
// 传入配置文件
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modelConfig } from './config/model.config'

import { usePageModel } from '@/hooks/usePageModel'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModel
  },
  setup() {
    /*
     * 权限树的回显，绑定数据
     */
    // 1.处理pageModel的hook'
    // 这里还是需要导入Eltree的组件
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    // 这里在调用editCallback函数的时候,elTreeRef还没有绑定到elTree组件上，所以没有数据
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      console.log(elTreeRef.value) // undefined
      // 解决elTreeRef.value是undefined的办法
      // 下一帧执行
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
      undefined,
      editCallback
    )

    const store = useStore()
    const menus = computed(() => store.state.entirMenu)

    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    const otherInfo = ref({})

    return {
      contentTableConfig,
      searchFormConfig,
      modelConfig,
      pageModelRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
