<template>
  <mt-swipe class="banner" style="height:1.6rem;" :auto="2000" :show-indicators="true">
    <mt-swipe-item v-for="(i, x) in slider" :key="x">
      <img class="silder" :src="i.thumb" >
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
  export default {
    props: {
      slider: {
        type: Array,
        required: true
      }
    },
    mounted () {

    }

  }
</script>

<style lang="less" scoped>
  @import '../../../assets/less/common.less';
  .silder{
    width: 100%;
    height: 100%;
  }
</style>
