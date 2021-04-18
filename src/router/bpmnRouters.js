/*
 * @Description:bpmn模块路由
 * @Autor: YDY
 * @Date: 2021-04-04 14:50:50
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-15 09:27:13
 */
const bpmnRouters = [
  {
    path: '/bpmn',
    name: 'bpmn',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/bpnm/index.vue'),
    children: [
      // 二级路由
      {
        path: '/',
        name: 'demoa',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/bpnm/page/demoa.vue')
      },
      {
        path: '/demob',
        name: 'demob',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/bpnm/page/demob.vue')
      },
      {
        path: '/democ',
        name: 'democ',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/bpnm/page/democ.vue')
      },
      {
        path: '/demod',
        name: 'demod',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/bpnm/page/demod.vue')
      }
    ]
  }
]
export default bpmnRouters
