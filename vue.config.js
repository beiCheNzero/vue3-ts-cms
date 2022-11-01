const path = require('path')

const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
// 引入自动引入插件
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// 导入element-plus图标库
// const Icons = require('unplugin-icons/webpack')
// const IconsResolver = require('unplugin-icons/resolver')

module.exports = defineConfig({
  // 1.配置方式一：CLI提供的配置
  // outputDir: './build',
  /*
   * 这里是在打包的时候如果要运行需要在导入的文件前面加上一个点
   * 但是如果在部署到服务器上的时候这里是不需要打开的
   */
  // publicPath: './',
  // 配置dev跨域的问题
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true //虚拟的站点需要更管origin
      }
    }
  },
  // 2.配置方式二：和webpack属性完全一致，最后会做合并
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    },
    // 配置webpack自动按需引入element-plus，
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'css',
            exclude: new RegExp(/^(?!.*submenu).*$/)
          })
        ]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
      // Icons({
      //   compiler: 'vue3',
      //   // 自动安装
      //   autoInstall: true
      // }),
    ]
  },
  transpileDependencies: true
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //       // __dirname当前路径，这里要写绝对路径
  //       '@': path.resolve(__dirname, 'src'),
  //       components: '@/components'
  //     },
  //     //配置webpack自动按需引入element-plus，
  //     plugins = [
  //       AutoImport({
  //         resolvers: [ElementPlusResolver()]
  //       }),
  //       Components({
  //         resolvers: [ElementPlusResolver()]
  //       }),
  //     ]
  // },
  // 配置方式三：
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // },
  // 配置element-plus按需引入
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components'
  //     }
  //   },
  // }
})
