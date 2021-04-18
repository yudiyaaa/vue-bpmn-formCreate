<!--
 * @Description: 基础引用
 * @Autor: YDY
 * @Date: 2021-04-04 16:01:30
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-15 11:21:57
-->
<template>
  <div id="demoOne"
       class="containers"
       ref="content">
    <div class="canvas"
         ref="canvas"></div>
    <div id="js-properties-panel"
         class="panel"></div>
    <ul class="buttons">
      <li>下载</li>
      <li>
        <a ref="saveDiagram"
           href="javascript:"
           title="download BPMN diagram">BPMN diagram</a>
      </li>
      <li>
        <a ref="saveSvg"
           href="javascript:"
           title="download as SVG image">SVG image</a>
      </li>
    </ul>
  </div>
</template>

<script>
// 引入相关的依赖
// import BpmnViewer from 'bpmn-js'
import { xmlStr } from "../mock/xmlStr"; // 这里是直接引用了xml字符串
import BpmnModeler from "bpmn-js/lib/Modeler";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
export default {
  name: "",
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      xmlStr: null,
      processName: "",
    };
  },
  mounted() {
    this.init();
    this.downloadImg();
  },
  methods: {
    init() {
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas;
      // 建模，官方文档这里讲的很详细
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        // 添加控制板
        propertiesPanel: {
          parent: "#js-properties-panel",
        },
        additionalModules: [
          // 左边工具栏以及节点
          propertiesProviderModule,
          // 右边的工具栏
          propertiesPanelModule,
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor,
        },
      });
      this.createNewDiagram();
    },
    // 将字符串转换成图显示出来
    createNewDiagram() {
      this.bpmnModeler.importXML(xmlStr, (err) => {
        if (err) {
          // console.error(err)
        } else {
          // 这里是成功之后的回调, 可以在这里做一系列事情
          this.success();
        }
      });
    },

    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded(link, name, data) {
      // 把xml转换为URI，下载要用到的
      console.log(666666666666666);
      console.log(data);
      const encodedData = encodeURIComponent(data);
      // 获取到图的xml，保存就是把这个xml提交给后台
      this.xmlStr = data;
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      if (data) {
        link.className = "active";
        link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        link.download = name;
      }
    },

    // 下载画图
    downloadImg() {
      // 下载画图
      let _this = this;
      // 获取a标签dom节点
      const downloadLink = this.$refs.saveDiagram;
      const downloadSvgLink = this.$refs.saveSvg;
      // 给图绑定事件，当图有发生改变就会触发这个事件
      this.bpmnModeler.on("commandStack.changed", function () {
        _this.saveSVG(function (err, svg) {
          _this.setEncoded(downloadSvgLink, "diagram.svg", err ? null : svg);
        });

        _this.saveDiagram(function (err, xml) {
          _this.setEncoded(downloadLink, "diagram.bpmn", err ? null : xml);
        });
      });
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG(done) {
      // 把传入的done再传给bpmn原型的saveSVG函数调用
      this.bpmnModeler.saveSVG(done);
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveDiagram(done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.bpmnModeler.saveXML({ format: true }, function (err, xml) {
        done(err, xml);
      });
    },
    success() {
      // console.log('创建成功!')
    },
  },
};
</script>

<style scoped lang="scss">
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
.buttons {
  position: absolute;
  left: 20px;
  bottom: 20px;
  & > li {
    display: inline-block;
    margin: 5px;
    & > a {
      color: #999;
      background: #eee;
      cursor: not-allowed;
      padding: 8px;
      border: 1px solid #ccc;
      &.active {
        color: #333;
        background: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
