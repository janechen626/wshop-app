<template>
  <div id="app">
    <!--<router-view/>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>


<style lang="less">
  @import "./assets/css/normalize.css";
  @import './assets/less/index.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
  position: relative;
  background-color: #fff !important;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.detail-box .dec img{
  width: 100%;
}
  .info p,.info div, .info img {
    width: 100%;
  }
</style>
