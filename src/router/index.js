/*
 * @Description:主路由
 * @Autor: YDY
 * @Date: 2021-02-20 14:50:03
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-15 09:32:27
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入模块路由
import formCreateRouters from './formCreateRouters'
// 引入bpmn模块路由
import bpmnRouters from './bpmnRouters.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/Home.vue')
  },

  // 模块路由
  ...formCreateRouters,
  ...bpmnRouters
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
