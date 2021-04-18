<!--
 * @Description: 基础引用
 * @Autor: YDY
 * @Date: 2021-04-04 14:21:12
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-15 09:29:16
-->
<template>
  <div class="demoOne_warp">
    <demoOne></demoOne>
  </div>
</template>

<script>
import demoOne from "../module/demoa/index";
export default {
  name: "",
  components: {
    demoOne,
  },
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
.demoOne_warp {
  padding-top: 20px;
}
</style>
