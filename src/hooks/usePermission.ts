import { useStore } from '@/store'

// 获取用户按钮权限吧
// 这里的参数第一个是界面的name，第二个参数是什么权限的name
export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  // 双重取反转成boolean值
  return !!permissions.find((item) => item === verifyPermission)
}
