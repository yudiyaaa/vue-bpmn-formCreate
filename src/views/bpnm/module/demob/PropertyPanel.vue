<!--
 * @Description: 属性栏覆盖更改
 * @Autor: YDY
 * @Date: 2021-04-04 16:46:10
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-07 11:32:43
-->
<template>
  <div
    class="property-panel"
    ref="propertyPanel"
  >
    <el-tabs type="border-card">
      <el-tab-pane label="常规">
        <el-form :model="form">
          <el-form-item label="">
            <div>编号</div>
            <el-input
              v-model="form.id"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <div>名称</div>
            <el-input
              v-model="form.name"
              @input="nameChange"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="表单">
        <el-form :model="form">
          <el-form-item label="">
            <div>key</div>
            <el-input
              v-model="form.id"
              @input="nameChange"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <div>模板</div>
            <el-select
              v-model="form.assignee"
              placeholder="请选择"
              key="1"
              @change="onClickValue(form)"
            >
              <el-option
                v-for="item in users"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button
            type="primary"
            @click="onClickNewPage"
            class="btn"
          >新增</el-button>

        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 新增弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>需要注意的是内容是默认不居中的</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="centerDialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 模板弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="templateVisible"
      width="30%"
      center
    >
      <span>需要注意</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="centerDialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PropertyPanel",
  props: {
    modeler: {
      type: Object,
      required: true,
    },
  },
  computed: {
    userTask() {
      if (!this.element) {
        return;
      }
      return this.element.type === "bpmn:UserTask";
    },
    sequenceFlow() {
      if (!this.element) {
        return;
      }
      return this.element.type === "bpmn:SequenceFlow";
    },
  },
  data() {
    return {
      centerDialogVisible: false,
      templateVisible: false,
      form: {
        id: "",
        name: "",
        color: null,
      },
      element: {},
      users: [
        {
          value: "zhangsan",
          label: "张三",
        },
        {
          value: "lisi",
          label: "李四",
        },
        {
          value: "wangwu",
          label: "王五",
        },
      ],
      roles: [
        {
          value: "manager",
          label: "经理",
        },
        {
          value: "personnel",
          label: "人事",
        },
        {
          value: "charge",
          label: "主管",
        },
      ],
    };
  },
  mounted() {
    this.handleModeler();
  },
  methods: {
    handleModeler() {
      // 监听节点选择变化
      this.modeler.on("selection.changed", (e) => {
        const element = e.newSelection[0];
        this.element = element;
        console.log(this.element);
        if (!element) return;
        // this.$message({
        //   message:"出发点击事件",
        //   type:"success"
        // })
        this.form = {
          ...element.businessObject,
          ...element.businessObject.$attrs,
        };
        if (this.form.userType === "candidateUsers") {
          this.form["candidateUsers"] =
            this.form["candidateUsers"].split(",") || [];
        }
        console.log(this.form);
      });

      //  监听节点属性变化
      this.modeler.on("element.changed", (e) => {
        const { element } = e;
        if (!element) return;
        //  新增节点需要更新回属性面板
        if (element.id === this.form.id) {
          this.form.name = element.businessObject.name;
          this.form = { ...this.form };
        }
      });
    },
    // 属性面板名称，更新回流程节点
    nameChange(name) {
      console.log(name);
      const modeling = this.modeler.get("modeling");
      modeling.updateLabel(this.element, name);
    },
    // 属性面板颜色，更新回流程节点
    colorChange(color) {
      const modeling = this.modeler.get("modeling");
      modeling.setColor(this.element, {
        fill: null,
        stroke: color,
      });
      modeling.updateProperties(this.element, { color: color });
    },
    // // 任务节点配置人员
    // addUser(properties) {
    //   this.updateProperties(
    //     Object.assign(properties, {
    //       userType: Object.keys(properties)[0],
    //     })
    //   );
    // },
    onClickValue(v) {
      console.log(123, v);
      this.templateVisible = true;
    },
    // 切换人员类型
    typeChange() {
      const types = ["assignee", "candidateUsers", "candidateGroups"];
      types.forEach((type) => {
        delete this.element.businessObject.$attrs[type];
        delete this.form[type];
      });
    },
    // 在这里我们封装一个通用的更新节点属性的方法
    updateProperties(properties) {
      const modeling = this.modeler.get("modeling");
      modeling.updateProperties(this.element, properties);
    },
    onClickNewPage() {
      this.centerDialogVisible = true;
    },
  },
};
</script>

<style scoped>
.property-panel {
  position: absolute;
  right: 0px;
  top: 0px;
  border-left: 1px solid #cccccc;
  padding: 20px 0;
  width: 300px;
  height: calc(100% - 40px);
}
.el-tabs--border-card {
  border-bottom: none;
  -webkit-box-shadow: none;
}
</style>
