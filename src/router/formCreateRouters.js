/*
 * @Description:formCreate模块路由
 * @Autor: YDY
 * @Date: 2021-02-20 16:36:25
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-16 17:11:29
 */
// const About = () => import('../views/About.vue')

const formCreateRouters = [
  {
    path: '/formCreate',
    name: 'formCreate',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/formCreate/index.vue')
  }
]
export default formCreateRouters
