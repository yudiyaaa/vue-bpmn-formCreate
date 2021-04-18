<!--
 * @Description: 
 * @Autor: YDY
 * @Date: 2021-04-07 08:36:23
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-15 19:04:35
-->
<template>
  <div class="home">
    <img alt="Vue logo"
         src="../../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
<style scoped>
.home {
  text-align: center;
}
</style>
