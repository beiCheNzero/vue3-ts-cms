// 编写登录规则
export const rules = {
  name: [
    {
      required: true,
      message: '用户名是必传内容~',
      // 失去焦点就触发
      trigger: 'blur' //change
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10个数组或字母',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容~',
      // 失去焦点就触发
      trigger: 'blur' //change
    },
    {
      pattern: /^[a-z0-9]{6,15}$/,
      message: '密码必须是6-15个数组或字母',
      trigger: 'blur'
    }
  ]
}
