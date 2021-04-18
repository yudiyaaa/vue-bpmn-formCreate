<!--
 * @Description: 属性栏覆盖更改
 * @Autor: YDY
 * @Date: 2021-04-04 14:20:50
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-07 08:42:04
-->
<template>
  <div class="demoTwo_warp">
    <demoTwo></demoTwo>
  </div>
</template>

<script>
import demoTwo from "../module/demob/index";
export default {
  name: "",
  components: { demoTwo },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.demoTwo_warp {
  padding-top: 20px;
}
</style>
