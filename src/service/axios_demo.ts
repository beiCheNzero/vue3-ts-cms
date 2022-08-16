// import axios from 'axios'

// // axios就是一个实例，axios的有个实例对象
// // 1.模拟get请求
// // axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
// //   console.log(res)
// // })

// // 2.模拟get请求并传入参数
// // axios
// //   .get('http://httpbin.org/get', {
// //     params: {
// //       name: 'beichen'
// //     }
// //   })
// //   .then((res) => {
// //     console.log(res.data)
// //   })

// // 3.get请求
// // axios
// //   .post('http://httpbin.org/post', {
// //     data: {
// //       name: 'beichenzero',
// //       age: 21
// //     }
// //   })
// //   .then((res) => {
// //     console.log(res)
// //   })

// // 4.axios的配置选项
// // 全局配置
// axios.defaults.baseURL = 'http://httpbin.org'
// // 超时时间
// axios.defaults.timeout = 10000

// // post单独配置
// // axios
// //   .post('/post', {
// //     data: {
// //       name: 'beichenzero',
// //       age: 21
// //     },
// //     timeout: 5000
// //   })
// //   .then((res) => {
// //     console.log(res)
// //   })

// // 5.axios.all
// axios
//   .all([
//     axios.get('/get', { params: { name: 'coderwhy' } }),
//     axios.post('/post', { data: { name: 'coderwhy' } })
//   ])
//   .then((res) => {
//     console.log(res[0].data)
//     console.log(res[1].data)
//   })

// // 6.axios拦截器
// // 拦截请求
// // fn1在请求发送成功时执行的函数
// // fn2在请求发送失败时执行的函数
// axios.interceptors.request.use(
//   (config) => {
//     // 做响应的操作
//     // 1.给请求添加token
//     // 2.isLoading动画
//     config.url = '/post'
//     console.log('请求成功')
//     return config
//   },
//   (err) => {
//     console.log('请求发送错误')
//     return err
//   }
// )
// // 拦截响应
// axios.interceptors.response.use(
//   (res) => {
//     console.log('响应成功')
//     return res
//   },
//   (err) => {
//     console.log('响应失败')
//     return err
//   }
// )

// // Promise本身是可以有类型的
// // new Promise<string>((resolve) => {
// //   // Promise的返回类型可以决定res的类型
// //   resolve('123')
// // }).then((res) => {
// //   console.log(res.length)
// // })
