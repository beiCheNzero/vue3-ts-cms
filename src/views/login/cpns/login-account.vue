<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="user_name">
        <el-input v-model="account.user_name" />
      </el-form-item>
      <el-form-item label="密码" prop="user_password">
        <el-input v-model="account.user_password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      // 如果获取是undefined就给他一个空的字符串
      user_name: localCache.getCatch('name') ?? '',
      user_password: localCache.getCatch('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        // 如果valid为true才开始真正执行登录逻辑
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCatch('name', account.user_name)
            localCache.setCatch('password', account.user_password)
          } else {
            localCache.deleteCatch('name')
            localCache.deleteCatch('password')
          }

          // 2.判断是否登录验证
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
