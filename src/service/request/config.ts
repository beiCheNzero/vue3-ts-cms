/*
 * 方式一: 手动切换环境(不推荐)
 */
// const BASE_URL = 'http://beichenzero.github.io/dev'

// const BASE_URL = 'http://beichenzero.github.io/prod'

// const BASE_URL = 'http://beichenzero.github.io/test'

/*
 * 方式二: 根据process.ens.NODE_ENV区分
 * 开发环境：development
 * 生产环境: production
 * 测试环境: test

 * 这种方式用的还是比较多的
 */
// let API_BASE_URL = ''
// const TIME_OUT = 10000

// if (process.env.NODE_ENV === 'development') {
//   // BASE_URL = 'http://123.207.32.32:8000/'
//   API_BASE_URL = '/api'
// } else if (process.env.NODE_ENV === 'production') {
//   API_BASE_URL = 'http://123.207.32.32:8000/'
// } else {
//   API_BASE_URL = 'http://123.207.32.32:8000/'
// }

// export { API_BASE_URL, TIME_OUT }

/*
 * 方式三：在项目中添加.env.development/.env.production/.env.test文件
 * 并加上添加对应的内容，然后在shims.d.ts中做一个声明
 */
export const API_BASE_URL = process.env.VUE_APP_BASE_URL

export const TIME_OUT = 10000
