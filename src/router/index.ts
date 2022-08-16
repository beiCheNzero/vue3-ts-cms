import { createRouter, createWebHashHistory } from 'vue-router'
// type表示这里引入的是一个类型，而不是函数或方法
import type { RouteRecordRaw } from 'vue-router'

import localCatch from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    // 这里是懒加载的方式， () => import('url')
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导航守卫
router.beforeEach((to) => {
  // 不是登录页的时候
  if (to.path !== '/login') {
    const token = localCatch.getCatch('token')
    if (!token) {
      return '/login'
    }
  }

  // console.log(router.getRoutes())
  // console.log(to)

  // 当跳转到main界面时，重定向到所展示界面的第一个菜单的第一个选项
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
