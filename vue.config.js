/*
 * @Description:
 * @Autor: YDY
 * @Date: 2021-02-20 17:10:28
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-04 15:08:35
 */

// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const isDebug = process.env.VUE_APP_DEBUG === 'debug'
exports = {
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })

    // 配置 loadsh tree shaking
    config.plugin('loadshReplace')
    // .use(new LodashModuleReplacementPlugin())

    // set html
    config
      .plugin('html')
      .tap(args => {
        args[0].debug = isDebug
        return args
      })
      .end()
    // 发行或运行时启用了压缩时会生效
    config.optimization.minimizer('terser').tap(args => {
      const compress = args[0].terserOptions.compress
      // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
      compress.drop_console = true
      compress.pure_funcs = [
        '__f__' // App 平台 vue 移除日志代码
        // 'console.debug' // 可移除指定的 console 方法
      ]
      return args
    })

    config.optimization = {
      // 分割代码块
      splitChunks: {
        cacheGroups: {
          // 公用模块抽离
          common: {
            chunks: 'initial',
            minSize: 0, // 大于0个字节
            minChunks: 2 // 抽离公共代码时，这个代码块最小被引用的次数
          },
          // 第三方库抽离
          vendor: {
            priority: 1, // 权重
            test: /node_modules/,
            chunks: 'initial',
            minSize: 0, // 大于0个字节
            minChunks: 2 // 在分割之前，这个代码块最小应该被引用的次数
          }
        }
      }
    }
  }
}
