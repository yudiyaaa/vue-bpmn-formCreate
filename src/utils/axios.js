/*
 * @Description:接口请求封装
 * @Autor: YDY
 * @Date: 2021-02-22 11:08:41
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-04 11:25:41
 */
'use strict'

import axios from 'axios'
// import loading from '@/utils/loading'
// import getHeaders from '@/utils/headers'

import { getToken } from '../utils/utils.js'
import config from '../config/index'

function setAuthOptionsJSON () {
  const token = getToken() ? getToken() : ''
  return {
    headers: {
      token: token,
      'Accept-Language': 'zh',
      'Content-Type': 'application/json;charset=UTF-8' // 默认application/x-www-form-urlencoded
    }
  }
}

function setAuthOptions () {
  const token = getToken() ? getToken() : ''
  return {
    headers: {
      token: token,
      'Accept-Language': 'zh'
    }
  }
}

// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default {
  /**
   * 封装get方法
   * @param url
   * @param data
   * @returns {Promise}
   */

  //  单域名，多服务名接口封装
  get (url, serviceName, params = {}) {
    console.log(111, serviceName)
    console.log(222, config.serviceNames)
    return new Promise((resolve, reject) => {
      axios
        .get(config.gatewayUrl + '/' + serviceName + url, {
          params,
          ...setAuthOptions()
        })
        .then(function (res) {
          resolve(res.data)
        })
        .catch(function (err) {
          reject(err)
        })
    })
  },
  // 多域名，多服务名接口封装
  // get (url, params = {}) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(url, {
  //         params,
  //         ...setAuthOptions()
  //       })
  //       .then(function (res) {
  //         resolve(res.data)
  //       })
  //       .catch(function (err) {
  //         reject(err)
  //       })
  //   })
  // },

  /**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise}
   */

  post (url, serviceName, params = {}) {
    return new Promise((resolve, reject) => {
      console.log(config.serviceNames)
      console.log(serviceName)
      axios
        .post(
          config.gatewayUrl + '/' + config.serviceNames[serviceName] + url,
          params,
          setAuthOptions()
        )
        .then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
    })
  },
  postJSON (url, serviceName, params = {}) {
    return new Promise((resolve, reject) => {
      console.log(config.serviceNames)
      console.log(serviceName)
      axios
        .post(
          config.gatewayUrl + '/' + config.serviceNames[serviceName] + url,
          params,
          setAuthOptionsJSON()
        )
        .then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
    })
  }
}
