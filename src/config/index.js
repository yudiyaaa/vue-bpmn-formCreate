/*
 * @Description:环境变量
 * @Autor: YDY
 * @Date: 2021-02-22 08:49:32
 * @LastEditors: YDY
 * @LastEditTime: 2021-02-22 10:40:16
 */
// 根据环境引入不同配置 process.env.NODE_ENV
console.log('当前环境：' + process.env.NODE_ENV)
const config = require('./env.' + process.env.NODE_ENV)
module.exports = config
