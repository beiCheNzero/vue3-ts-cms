import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { LJLRequestInterceptors, LJLRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js'

const DEFAULT_LOADING = true

class LJLRequest {
  instance: AxiosInstance
  interceptors?: LJLRequestInterceptors
  showLoading: boolean
  isLoading: LoadingInstance
  /*
   * 这里config原本的类型就是AxiosRequestConfig
   * 但是现在我们定义了一个LJLRequestConfig接口，并且继承自AxiosRequestConfig
   * 在原有ARC(AxiosRequestConfig)所传入的固定的参数/属性之外，还能传入拦截器，更加的灵活方便
   */
  constructor(config: LJLRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    //? 保存基本信息
    this.interceptors = config.interceptors
    // ?? 如果前面是null或者是undefined就给一个true,就是说默认情况下是显示的
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 开始使用拦截器
    // 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    /*
     * 2.添加所有的实例都有的拦截器
     */
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的：请求成功拦截')
        // 判断是否显示loading请求加载界面
        if (this.showLoading) {
          this.isLoading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有的实例都有的：请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的：响应成功拦截')

        // 在请求完成之后，响应的时候移除loading效果
        // 移除loading, 在有loading显示的时候才会关闭loading
        if (this.showLoading) {
          this.isLoading.close()
        }

        // 判断返回数据是否正确
        const data = res.data
        console.log(res)
        if (data.returnCode === -1001) {
          console.log('请求失败,错误信息')
        } else if (data.returnCode === '') {
          console.log('return为空')
        } else {
          return res.data
        }
      },
      (err) => {
        // console.log('所有的实例都有的: 响应失败拦截')
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  /*
   * 3.添加每个请求的拦截器
   * 需要传入LJLRequestConfig类型
   */
  requset<T>(config: LJLRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 因为在class LJLRequest中的interceptor是一个可选链
      // 1.单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.是否需要显示loading
      // 如果LJLRequestConfig传过来的showLoading是false就把false的值给到showLoading
      // 也就是令showLoading为false，不显示请求转圈的界面
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)

          // 2.将showLoading的值设置会初始值也就是true，这样不会影响下一个请求的loading显示
          // 这里如果不设置的话，在第一次请求会有加载特效
          // 而后的每一次请求showLoading都是false，不会加载特效
          this.showLoading = DEFAULT_LOADING

          // 3.将结果resolve返回出来
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading的值设置会初始值也就是true，这样不会影响下一个请求的loading显示
          this.showLoading = DEFAULT_LOADING
          reject(err)
          // return err
        })
    })
  }

  get<T = any>(config: LJLRequestConfig<T>): Promise<T> {
    return this.requset<T>({
      ...config,
      method: 'GET'
    })
  }

  post<T = any>(config: LJLRequestConfig<T>): Promise<T> {
    return this.requset<T>({
      ...config,
      method: 'POST'
    })
  }

  delete<T = any>(config: LJLRequestConfig<T>): Promise<T> {
    return this.requset<T>({
      ...config,
      method: 'delete'
    })
  }

  patch<T = any>(config: LJLRequestConfig<T>): Promise<T> {
    return this.requset<T>({
      ...config,
      method: 'patch'
    })
  }
}

export default LJLRequest
