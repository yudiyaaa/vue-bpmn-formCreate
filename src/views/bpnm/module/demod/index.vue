
<!--
 * @Description: 
 * @Autor: YDY
 * @Date: 2021-04-04 17:00:33
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-08 09:22:22
-->
<template>
  <div
    class="containers"
    ref="content"
  >
    <div
      class="canvas"
      ref="canvas"
    ></div>
  </div>
</template>
<script>
// 引入相关的依赖
import { xmlStr } from "../mock/xmlStr";
import BpmnModeler from "bpmn-js/lib/Modeler";
import customPalette from "./palette";

export default {
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
    };
  },
  methods: {
    createNewDiagram() {
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(xmlStr, function (err) {
        if (err) {
          console.error(err);
        } else {
          // 这里还没用到这个，先注释掉吧
          // that.success()
        }
      });
    },
  },
  mounted() {
    // 获取到属性ref为“content”的dom节点
    this.container = this.$refs.content;
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas;

    // 建模，官方文档这里讲的很详细
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      //   //添加控制板
      propertiesPanel: {
        parent: "#js-properties-panel",
      },
      additionalModules: [customPalette],
    });
    this.createNewDiagram(this.bpmnModeler);
  },
};
</script>

<style scoped>
.containers {
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
}
.canvas {
  width: 100%;
  height: 100%;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  overflow-y: auto;
}
/deep/.bpmn-icon-space-tool {
  display: none;
}
/deep/.bpmn-icon-lasso-tool {
  display: none;
}
/deep/.bpmn-icon-intermediate-event-none {
  display: none;
}
/deep/.bpmn-icon-group {
  display: none;
}
/deep/.bpmn-icon-participant {
  display: none;
}
/deep/.bpmn-icon-data-store {
  display: none;
}
/deep/.bpmn-icon-data-object {
  display: none;
}
/deep/.bpmn-icon-subprocess-expanded {
  display: none;
}
/deep/.bpmn-icon-task {
  display: none;
}
</style>