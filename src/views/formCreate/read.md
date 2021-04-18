<!--
 * @Description: 
 * @Autor: YDY
 * @Date: 2021-04-15 17:22:38
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-16 09:11:13
-->


# 安装element


# 安装formcreate
` npm i @form-create/element-ui`

` import formCreate from '@form-create/element-ui'`
`Vue.use(formCreate)`

# 安装、注册fc-designer
`npm install --save @form-create/designer`
`Vue.prototype.$config = config`
`Vue.use(FcDesigner)`
 
# 安装 jsonlint-mod
`npm install jsonlint -g`
`npm install --save jsonlint-mod`


# 安装 codemirror ---代码编辑器
 `npm install vue-codemirror --save`

# 安装  vuedraggable ---vue拖拽组件
`npm i -S vuedraggable`


# main.js

`import formCreate from '@form-create/element-ui'`
`import FcDesigner from '../src/views/formCreate/index';`

`Vue.use(formCreate);`
`Vue.component('FcDesigner', FcDesigner);`