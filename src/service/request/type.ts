import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LJLRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  // responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

/*
 * 对原有类型的扩展
 * 我们需要什么属性或者参数的时候可以在这里添加
 */
export interface LJLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LJLRequestInterceptors<T>
  showLoading?: boolean
}
