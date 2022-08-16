<template>
  <div class="page-content">
    <ljl-table
      :listData="listData"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 如果v-model:page="pageInfo" => page update:page -->
      <!-- 如果v-model="pageInfo" => modelValue update:modelValue -->

      <!-- header插槽 -->
      <template #handerHandler v-if="isCreate">
        <el-button type="primary" @click="handleNewClick">{{
          contentTableConfig.btnTitle ?? '新建'
        }}</el-button>
        <el-button type="success">
          <el-icon><refresh /></el-icon>
        </el-button>
      </template>
      <!-- 列中的插槽 -->
      <template #status="scope">
        <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '可用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler="scope">
        <div class="handle-btn">
          <el-button
            v-if="isUpdate"
            size="small"
            type="primary"
            @click="handleEditClick(scope.row)"
          >
            <el-icon> <edit /> </el-icon>编辑
          </el-button>
          <el-button
            v-if="isDelete"
            size="small"
            type="danger"
            @click="handleDeleteClick(scope.row)"
          >
            <el-icon><delete /></el-icon>删除
          </el-button>
        </div>
      </template>

      <!-- 动态插槽 -->
      <!-- 在pagecontent中动态插入剩余的插槽 -->
      <template v-for="item in otherPropSlot" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </ljl-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'

import LjlTable from '@/base-ui/table'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    LjlTable
  },
  emits: ['editBtnClick', 'newBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 0.获取操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isDelete = usePermission(props.pageName, 'delete')
    const isUpdate = usePermission(props.pageName, 'update')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // dispatch：含有异步操作，数据提交至 actions ，可用于向后台提交数据
    // commit：同步操作，数据提交至 mutations ，可用于读取用户信息写到缓存里
    // 2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      // 如果没有查询权限，就不发送网络请求，不查询数据
      if (!isQuery) return
      // 如果直接在setup中发送网络请求的话，只会执行一次，放在函数中，这样调用函数时就可以发送网络请求
      store.dispatch('system/getPageListAction', {
        // pageUrl: '/users/list',
        pageName: props.pageName,
        queryInfo: {
          // 解决传过来的CurrentPage值不对的情况，因为在传过来的时候是从1开始
          // 但是这里的偏移量的请求应该是从0开始
          offset:
            (pageInfo.value.currentPage
              ? pageInfo.value.currentPage - 1
              : pageInfo.value.currentPage) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.从vuex中获取页面数据
    const listData = computed(() => store.getters['system/pageListData'](props.pageName))
    // 获取用户数据
    // const userList = computed(() => store.state.system.userList)
    // 获取用户数量
    const dataCount = computed(() => store.getters['system/pageListCount'](props.pageName))

    // 4.获取其他的动态插槽的名称
    /*
     * 过滤掉pagecontent中共有的插槽
     * 如果return false就不会把status添加到otherPropSlot
     */
    const otherPropSlot = computed(() => {
      return props.contentTableConfig.propList.filter((item: any) => {
        if (item.slotName === 'status') return false
        else if (item.slotName === 'createAt') return false
        else if (item.slotName === 'updateAt') return false
        else if (item.slotName === 'handler') return false
        return true
      })
    })

    // 5.删除/新建/编辑操作
    const handleDeleteClick = (item: any) => {
      console.log(item)
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      listData,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlot,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  border-top: 20px solid #f5f5f5;
}
</style>
