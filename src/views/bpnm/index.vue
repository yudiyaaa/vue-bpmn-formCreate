<!--
 * @Description: 
 * @Autor: YDY
 * @Date: 2021-04-04 15:20:23
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-15 20:38:53
-->
<template>
  <div class="bpmn_warp">
    <div class="tab_warp">
      <el-button @click="click_a">基础引用</el-button>
      <el-button @click="click_b">属性栏覆盖更改</el-button>
      <el-button @click="click_c">工具栏覆盖更改</el-button>
      <el-button @click="click_d">工具栏源文件更改</el-button>

    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    click_a() {
      this.$router.push("./bpmn");
    },
    click_b() {
      this.$router.push("./demob");
    },
    click_c() {
      this.$router.push("./democ");
    },
    click_d() {
      this.$router.push("./demod");
    },
  },
};
</script>

<style scoped lang="scss">
.bpmn_warp {
  text-align: center;
  .tab_warp {
    padding-top: 20px;
  }
}
</style>

