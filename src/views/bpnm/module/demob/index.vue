<!--
 * @Description: 属性栏覆盖更改
 * @Autor: YDY
 * @Date: 2021-04-04 16:45:07
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-04 16:57:45
-->
<template>
  <div
    id="demo2"
    class="containers"
    ref="content"
  >
    <div
      class="canvas"
      ref="canvas"
    ></div>
    <!-- <div id="js-properties-panel" class="panel"></div> -->
    <panel
      v-if="bpmnModeler"
      :modeler="bpmnModeler"
    />
    <ul class="buttons">
      <li>下载</li>
      <li>
        <a
          ref="saveDiagram"
          href="javascript:"
          title="download BPMN diagram"
        >BPMN diagram</a>
      </li>
      <li>
        <a
          ref="saveSvg"
          href="javascript:"
          title="download as SVG image"
        >SVG image</a>
      </li>
      <li>
        <el-button
          type="success"
          @click="saveXmlFile"
        >保存</el-button>
      </li>
    </ul>
    <el-dialog
      title="弹窗标题"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <!-- <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item
          label="选择人员："
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.name"
            placeholder="请选择活动区域"
          >
            <el-option
              label="总经理"
              value="总经理"
            ></el-option>
            <el-option
              label="人事部经理"
              value="人事部经理"
            ></el-option>
            <el-option
              label="技术部经理"
              value="技术部经理"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogSave"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入相关的依赖
import { xmlStr } from "../mock/xmlStr"; // 这里是直接引用了xml字符串
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from "bpmn-js/lib/Modeler";
// import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
import panel from "./PropertyPanel"; // 属性面板

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      xmlStr: null,
      processName: "",
    };
  },
  components: {
    panel,
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
          // propertiesPanelModule,
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
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded(link, name, data) {
      // 把xml转换为URI，下载要用到的
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
    //保存整个XML文件
    saveXmlFile() {
      console.log(this.xmlStr);
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
    //弹窗保存
    dialogSave() {
      let name = this.form.name;
      const modeling = this.bpmnModeler.get("modeling");
      modeling.updateLabel(this.element, name);
      this.dialogFormVisible = false;
    },
    handleModeler() {
      // 监听节点选择变化
      this.bpmnModeler.on("selection.changed", (e) => {
        const element = e.newSelection[0];
        this.element = element;
        if (!element) return;
        // console.log(element.businessObject);
        // if (element.businessObject.$type === "bpmn:UserTask") {
        //   this.dialogFormVisible = true;
        // }

        // this.$message({
        //   message: "当前内容：" + element.businessObject.name,
        //   type: "success"
        // });
        // this.form = {
        //   ...element.businessObject,
        //   ...element.businessObject.$attrs
        // };
        // if (this.form.userType === "candidateUsers") {
        //   this.form["candidateUsers"] =
        //     this.form["candidateUsers"].split(",") || [];
        // }
        // console.log(this.form)
      });

      //  监听节点属性变化
      this.bpmnModeler.on("element.changed", (e) => {
        const { element } = e;
        if (!element) return;
        //  新增节点需要更新回属性面板
        // if (element.id === this.form.id) {
        //   this.form.name = element.businessObject.name;
        //   this.form = { ...this.form };
        // }
      });

      //自定义事件
      let eventBus = this.bpmnModeler.get("eventBus");
      // you may hook into any of the following events
      let events = [
        "element.hover",
        "element.out",
        "element.click",
        "element.dblclick",
        "element.mousedown",
        "element.mouseup",
      ];
      let that = this;
      eventBus.on("element.dblclick", function (e) {
        that.element = e.element;
        // console.log(e.element.businessObject);
        if (e.element.businessObject.$type === "bpmn:UserTask") {
          that.dialogFormVisible = true;
        }
      });

      // events.forEach(function(event) {
      //   eventBus.on(event, function(e) {
      //     // e.element 模型元素
      //     // e.gfx 元素图解
      //     console.log(event, "on", e.element.id);
      //   });
      // });
    },
    success() {
      // console.log('创建成功!')
    },
    // 属性面板名称，更新回流程节点
    // nameChange(name) {
    //   console.log(name);
    //   const modeling = this.bpmnModeler.get("modeling");
    //   modeling.updateLabel(this.element, name);
    // }
  },
  mounted() {
    this.init();
    this.downloadImg();
  },
};
</script>

<style lang="scss" scoped>
.containers {
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: calc(100% - 91px);
}
.canvas {
  width: 100%;
  height: 100%;
}
.canvas > div > a {
  display: none;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}
.buttons {
  position: absolute;
  left: 20px;
  bottom: 20px;
}
.buttons > li {
  display: inline-block;
  margin: 5px;
}
.buttons > li > a {
  color: #999;
  background: #eee;
  cursor: not-allowed;
  padding: 8px;
  border: 1px solid #ccc;
}
.buttons > li > a.active {
  color: #333;
  background: #fff;
  cursor: pointer;
}
</style>
