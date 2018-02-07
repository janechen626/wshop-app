<template>
    <div>
        <mt-tabbar>
            <router-link class="mint-tab-item" :to="{name:'groupIndex'}" tag="a">
                <div class="mint-tab-item-label">
                    <div class="iconfont tabIcon">&#xe89f;</div>
                    首页
                </div>
            </router-link>
            <router-link class="mint-tab-item" id="act" :to="{name:'activityList'}" tag="a">
                <div class="mint-tab-item-label">
                    <div class="iconfont tabIcon">&#xe7d8;</div>
                    活动列表
                </div>
            </router-link>
            <router-link class="mint-tab-item" id="acts" :to="{name:'groupOrder'}" tag="a">
                <div class="mint-tab-item-label">
                    <div class="iconfont tabIcon tabIcon1">&#xe601;</div>
                    订单
                </div>
            </router-link>
            <router-link class="mint-tab-item" :to="{name:'GroupList'}" tag="a">
                <div class="mint-tab-item-label">
                    <div class="iconfont tabIcon">&#xe66e;</div>
                    我的团
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
    .tabIcon1{
        font-size: 0.16rem;
        margin-bottom: .03rem;
        margin-top: .05rem;
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
