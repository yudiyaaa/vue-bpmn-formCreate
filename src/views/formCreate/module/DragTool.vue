<template>
  <!--组件占画布的宽度  -->
  <el-col :span="6">
    <!-- 拖动后组件 -->
    <div class="drag-tool"
         @click.stop="active"
         :class="{active: state.active === id}">
      <!-- 左上角移动图标 -->
      <div class="drag-l">
        <div class="drag-btn _fc-drag-btn"
             v-if="state.active === id && dragBtn !== false"
             style="cursor: move;">
          <i class="fc-icon icon-move"></i>
        </div>
      </div>
      <!-- 组件选中时操作图标 -->
      <div class="drag-r">
        <div class="drag-btn"
             @click="$emit('add')">
          <i class="fc-icon icon-add"></i>
        </div>
        <div class="drag-btn"
             @click="$emit('copy')">
          <i class="fc-icon icon-copy"></i>
        </div>
        <div class="drag-btn"
             v-if="children"
             @click="$emit('addChild')">
          <i class="fc-icon icon-add-child"></i>
        </div>
        <div class="drag-btn drag-btn-danger"
             @click="$emit('delete')">
          <i class="fc-icon icon-delete"></i>
        </div>
      </div>
      <slot name="default"></slot>
    </div>
  </el-col>

</template>

<script>
let id = 1;
export default {
  name: "DragTool",
  inject: ["fcx"],
  props: ["dragBtn", "children", "unique"],
  data() {
    return {
      id: this.unique || id++,
      state: this.fcx,
    };
  },
  methods: {
    active() {
      if (this.state.active === this.id) return;
      this.state.active = this.id;
      this.$emit("active");
    },
  },
  beforeDestroy() {
    this.state = {};
  },
};
</script>

<style>
.drag-tool {
  position: relative;
  min-height: 20px;
  box-sizing: border-box;
  padding: 2px;
  outline: 1px dashed #2e73ff;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
}

.drag-tool .drag-tool {
  margin: 5px;
}

.drag-tool + .drag-tool {
  margin-top: 5px;
}

.drag-tool.active {
  outline: 2px solid #2e73ff;
}

.drag-tool.active > div > .drag-btn {
  display: flex;
}

.drag-tool .drag-btn {
  display: none;
}

.drag-r {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 999;
}

.drag-l {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}

.drag-btn {
  height: 18px;
  width: 18px;
  color: #fff;
  background-color: #2e73ff;
  text-align: center;
  line-height: 20px;
  padding-bottom: 1px;
  float: left;
  cursor: pointer;
  justify-content: center;
}

.drag-btn + .drag-btn {
  margin-left: 2px;
}

.drag-btn-danger {
  background-color: #ff2e2e;
}

.drag-btn i {
  font-size: 13px;
}
</style>