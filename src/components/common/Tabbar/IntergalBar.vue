<template>
    <div>
        <mt-tabbar>
            <router-link class="mint-tab-item" :to="{name:'integralIndex'}" tag="a">
                <div class="mint-tab-item-label">
                    <div class="iconfont tabIcon">&#xe89f;</div>
                    首页
                </div>
            </router-link>
            <router-link class="mint-tab-item" id="act" :to="{name:'integralType'}" tag="a">
                <div class="mint-tab-item-label">
                    <div class="iconfont tabIcon">&#xe7d8;</div>
                    全部商品
                </div>
            </router-link>
            <router-link class="mint-tab-item" :to="{name:'integralOrder'}" tag="a">
                <div class="mint-tab-item-label">
                    <div class="iconfont tabIcon tabIcon1">&#xe601;</div>
                    我的订单
                </div>
            </router-link>
        </mt-tabbar>
    </div>
</template>
<script>

</script>
<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    .tabIcon{
        font-size: 0.24rem;
        margin-bottom:.01rem;
    }
    .tabbar {
        z-index: 1 !important;
    }
    .tabIcon1{
        font-size: 0.16rem;
        margin-bottom: .03rem;
        margin-top: .05rem;
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
        color:#EF5762;
        /*color:#000;*/
    }
    .mint-tabbar {
        height: .5rem;
    }
    .mint-tab-item-label {

    }



</style>
