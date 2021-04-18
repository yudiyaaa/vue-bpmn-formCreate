<!--
 * @Description:
 * @Autor: YDY
 * @Date: 2021-02-22 21:41:19
 * @LastEditors: YDY
 * @LastEditTime: 2021-04-15 19:08:49
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/bpmn">bpmn</router-link> |
      <router-link to="/formCreate">formCreate</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
/*每个页面公共css */
@import "../src/assets/scss/index.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;
  font-size: 18px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
