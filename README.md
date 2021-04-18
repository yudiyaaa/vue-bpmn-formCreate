<!--
 * @Description: 
 * @Autor: YDY
 * @Date: 2021-02-20 14:50:24
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-04 16:15:58
-->
# vue_bpmn

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### eslint  路由  环境配置



### UI库  element
```
npm i element-ui -S

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```

### bpmn组件实现流程图
## 安装bpmn
```
一、npm install --save bpmn-js 
```
```
二、使用左侧栏
// 以下为bpmn工作流绘图工具的样式
import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
```
```
二、使用右侧属性栏
npm i bpmn-js-properties-panel --save-D
npm install --save camunda-bpmn-moddle

import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css' // 右边工具栏样式
```
