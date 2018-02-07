<template>
  <div>
    <mt-tabbar>
      <router-link class="mint-tab-item" :to="{name:'index'}" tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe89f;</div>
          首页
        </div>
      </router-link>
      <router-link  class="mint-tab-item" id="act" :to="{name:'category'}" tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe7d8;</div>
          分类
        </div>
      </router-link>
      <router-link class="mint-tab-item" :to="{name:'cart'}" tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe607;</div>
          购物车
        </div>
      </router-link>
      <router-link class="mint-tab-item" :to="{name:'userCenter'}" tag="a">
        <div class="mint-tab-item-label">
          <div class="iconfont tabIcon">&#xe603;</div>
          会员中心
        </div>
      </router-link>
    </mt-tabbar>
  </div>
</template>
<script>

</script>
<style lang="less" scoped>
  /*@import '../../../assets/fonts/iconfont.css';*/
  @import '../../../assets/less/index.less';

  .tabIcon{
    font-size: 0.24rem;
    margin-bottom:.01rem;
  }
  .tabbar {
    z-index: 1 !important;
  }
  .mint-tabbar{
    background: #fff;
    border-top: 1px solid #E7E7E7;
    position: fixed;
    -webkit-transform: translateZ(0);
    z-index: 1;
  }
  .mint-tab-item{
    color:#525252;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .router-link-exact-active{
    color:#EF383D;
    /*color:#000;*/
  }
  .mint-tabbar {
    height: .5rem;
  }
  .mint-tab-item-label {

  }



</style>
