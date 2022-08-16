<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://haixia-1303842518.cos.ap-guangzhou.myqcloud.com/%E6%B5%B7%E9%9C%9E%2Fhead-photo%2F-4ad73ad5fcaad4be(1).jpg"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="CloseBold" @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item divided icon="Avatar" id="divided">个人信息 </el-dropdown-item>
          <el-dropdown-item icon="Unlock">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    // 退出登录
    const router = useRouter()
    const handleExitClick = () => {
      localCache.deleteCatch('token')
      router.push('/main')
    }

    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
/*
 * 利用深度选择器修改divided显示的一个小bug
*/
.el-dropdown-menu /deep/ .el-dropdown-menu__item--divided {
  list-style: none;
}
.el-dropdown-link {
  display: flex;
  // 上下居中
  align-items: center;
  // 鼠标移入由一个小手
  cursor: pointer;

  span {
    margin-right: 10px;
  }
}
</style>
