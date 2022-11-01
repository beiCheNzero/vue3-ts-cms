import { createApp } from 'vue'
import App from './App.vue'
import { globalRegister } from './global'
// 它的作用就是让HTML元素更好的实现跨浏览器一致性
import 'normalize.css'
import './assets/css/index.less'

// import './service/axios_demo'
// import ljlRequest from './service'

// 全局引入
// import ElementPlus from 'element-plus'
// // 引入element-plus的样式
// import 'element-plus/dist/index.css'

// 引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'

// 导入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

// 注册全局的方法
app.use(globalRegister)

// 通过遍历的方式注册所有 svg组件，会牺牲一点点性能
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  // 新增名为Menu的判断
  if ('Menu' != key) {
    app.component(key, component)
  } else {
    app.component(key + 'Icon', component)
  }
}
app.use(store)
// app.use(ElementPlus)

/*
 * 这里的setupStore()函数和注册路由的顺序不能颠倒，否则会匹配不到对应的路由
 * 导航守卫是一个回调函数
 * 先调用setupStore()函数注册路由，然后在执行app.use(router)时去进行路由匹配才是对的
 * 否则在进行路由匹配的时候，没有注册路由，他匹配的时notfound
 * 但是匹配的路劲是对的，跳转的界面时错的
 * 在导航守卫哪里打印
 * console.log(router.getRoutes())
 * console.log(to)
 * 可以查看到
 */
// vuex获取localStorage中的数据并保存到state中
setupStore()
app.use(router)

app.mount('#app')

console.log(process.env.VUE_APP_BASE_URL)

// ljlRequest.requset({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独请求的res')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// ljlRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     // method: 'GET',
//     showLoading: false
//   })
//   .then((res) => {
//     // 这里的res就是DataType类型
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
