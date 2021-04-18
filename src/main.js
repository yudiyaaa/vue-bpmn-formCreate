/*
 * @Description:
 * @Autor: YDY
 * @Date: 2021-02-20 14:50:03
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-16 09:09:54
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import '@/plugins'
import config from '@/config'
// 全局引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 以下为bpmn工作流绘图工具的样式
import "bpmn-js/dist/assets/diagram-js.css"; // 左边工具栏以及编辑节点的样式
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
// 右边属性栏
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
// formCreate引入
import formCreate from '@form-create/element-ui'
import FcDesigner from '../src/views/formCreate/index';


Vue.config.productionTip = false
Vue.prototype.$config = config

Vue.use(ElementUI)
Vue.use(formCreate);
Vue.component('FcDesigner', FcDesigner);



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
