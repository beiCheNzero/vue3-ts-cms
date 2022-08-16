// service统一出口
import LJLRequest from './request'
import { API_BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const ljlRequest = new LJLRequest({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    /*
     * 1.添加ljlRequest所对应的拦截器
     * 这里的拦截器只属于ljlRequest所对应的实例
     */
    // 请求成功的拦截器
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCatch('token')
      if (token) {
        /*
         * 解决无效token的问题
         * 给token授权访问api接口的权限
         * Authorization(授权)
         */
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (error) => {
      return error
    },
    // 响应成功的拦截器
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (error) => {
      return error
    }
  }
})

// export const ljlRequest2 = new LJLRequest({
//   baseURL: '地址二'
// })

export default ljlRequest
