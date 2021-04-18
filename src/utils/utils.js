/*
 * @Description:公共方法封装
 * @Autor: YDY
 * @Date: 2021-02-22 11:20:41
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-15 10:00:30
 */
import Vue from 'vue'

// 存储token
export function setToken (token) {
  Vue.ls.set('KEY_M_PLATFORM_TOKEN', token)
//   localStorage.setItem('KEY_M_PLATFORM_TOKEN', token)
}

/*
 * 获取token
 * */
export function getToken () {
  localStorage.getItem('token')
}

/*
   * 移除token
   * */
export function removetoken () {
  localStorage.removeItem('token')
}

// 将对象转为url中？后缀的参数 name=xiaoming&sex=男&age=16,接口传参方式post  x-www-form-urlencoded
export function changeJSON2QueryString (JSON) {
  var temp = []
  for (var k in JSON) {
    temp.push(k + '=' + encodeURIComponent(JSON[k]))
  }
  return temp.join('&')
}
