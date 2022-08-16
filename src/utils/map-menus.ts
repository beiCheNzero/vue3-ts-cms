import { IBreadCrumb } from '@/base-ui/breadcrumb'
import type { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  /*
   * 这里的三个参数分别代表：
   * 第一个参数是：查找所在的文件
   * 第二个参数是：是否递归的取查找所要查找的文件
   * 第三个参数是：查找以.ts结尾的文件
   */
  // 获取所有的routes
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // console.log(key)
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  // 2.根据菜单获取需要添加的routes
  // 递归函数查找userMenus中对应的url影射地址并添加到routes数组中
  // 获取当前用户对应的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      // 递归出口
      if (menu.type === 2) {
        // 这里的find函数只会查找到匹配的一个值并返回
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        // firstMenu赋值
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}

export { firstMenu }

// 导出breadcrumbs的路径
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadCrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// 导出菜单对应的路劲
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadCrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        // 传入一级菜单的名称和路径
        breadcrumbs?.push({ name: menu.name })
        // 传入二级菜单的名称和路径
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 获取用户权限并存到数组中
export function mapMenusTopermissions(userMenus: any[]) {
  const permissions: string[] = []

  // 递归调用获取用户权限
  const _recurseGetPermisson = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermisson(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermisson(userMenus)
  return permissions
}

// 获取树形权限的叶子节点
export function menuMapLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leafKeys
}
