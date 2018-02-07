<template>
  <div class="top-title">
    <div class="line"></div>
    <!--<h3>{{title}}</h3>-->
    <h3>为您推荐</h3>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    props: {
      title:{
        type:String,
        // required:true
      }
    },
    mounted () {
    },
    components: {
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/less/common.less';
  .top-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .08rem 0;
    .line{
      background: #e6e2e2;
      width: 35%;
      height: 1px;
    }
    h3{
      color: @themeColor;
      font-size: 14px;
    }
  }
</style>
