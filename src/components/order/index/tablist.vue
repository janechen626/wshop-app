<template>
    <tip :tip="tips">
    <ul id="list" v-if="list.length" class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li class="tab-list" v-for="(v,i) in list" :key="i" tag="div">
            <router-link :to="{name:'detail',query:{id:v.id}}" class="list-title" tag="div">
                <div>订单号:{{v.ordersn}}</div>
                <div>{{v.statusstr}} <span class="icon-you">&#xe61b;</span></div>
            </router-link>
            <template v-for="item in v.goods">
            <router-link class="list-main" :to="{name:'detail',query:{id:v.id}}" v-for="(v2,x) in item.goods" :key="x" tag="div">
                <div class="main-left">
                    <img :src="v2.thumb" alt="">
                </div>
                <div class="main-center">
                    <div>{{v2.title}}</div>
                    <div v-if="v2.optiontitle">规格:{{v2.optiontitle}}</div>
                </div>
                <div class="main-right">
                    <div>
                        <span>￥{{v2.price}}</span>
                    </div>
                    <div>x{{v2.total}}</div>
                </div>
            </router-link>
            </template>
            <div class="list-nav">
                <!--运费: <span>￥0.01</span>元,-->
                共 <span>1</span>个商品,总额: <span>￥{{v.price}}</span>元
                <i class="icon-you">&#xe61b;</i>
            </div>
            <div class="list-btn">
                <div v-if="v.status==0 " class="btns act" @click="cancel(v.id)">取消订单</div>
                <router-link class="btns" :to="{name:'pay',query:{id:v.id,type:'order'}}"  v-if="v.status==0" tag="div">支付订单</router-link>
                <!-- <div class="btns" v-if="v.status==1" @click="remind(v.id)">提醒发货</div> -->
                <div class="btns" v-if="v.status==2" @click="confirm(v.id)">确认收货</div>
                <div v-if="v.status==3" class="btns act" @click="del(v.id)">删除订单</div>
            </div>
        </li>
    </ul>
    </tip>
</template>

<script>
    import util from '../../../api/util'
    import Tip from '../../common/base/Tip.vue'
    import defaultImg from '../../../assets/images/order-tip.png'
    export default {
        data() {
            return {
                tips:{
                    img: defaultImg,
                    title: '您暂时没有订单哦！',
                    btn:''
                }
            }
        },
        props: {
            list: {
                type: Array,
                required: true
            },
            loading:{
                type: Boolean,
                default(){
                    return true
                }
            }
        },
        methods: {
            loadMore(i){
                this.$emit('loadmore',i)
            },
            cancel(i){
                this.$emit('cancel',i)
            },
            confirm(i){
                this.$emit('confirm',i)
            },
            del(i){
                this.$emit('del',i)
            },
            remind(i){
                this.$emit('remind',i)
            }
        },
        components:{
            Tip
        },
        mounted(){
           
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/common.less';

    @font-face {
        font-family: 'iconfont';  /* project id 519918 */
        src: url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.eot');
        src: url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.woff') format('woff'),
        url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.svg#iconfont') format('svg');
    }

    .icon-you {
        font-family: iconfont;
    }
    .list {
        padding-bottom: .8rem;
    }
    .tab-list {
        background: #ffffff;
        margin-top: .08rem;
        font-size: .12rem;
        .list-title {
            display: flex;
            justify-content: space-between;
            padding: .08rem;
        }
        .list-main {
            display: flex;
            justify-content: space-between;
            padding: .12rem;
            background: #f7f7f7;
            .main-left {
                width: .6rem;
                height: .6rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .main-center {
                div{
                    font-size: .14rem;
                }
                div:first-child{
                    height:.38rem;
                    overflow: hidden;

                }
                div:last-child{
                    margin-top: .04rem;
                    font-size: .12rem;
                    color: #727272;
                }
                flex: 1;
                text-align: left;
                margin-left: .1rem;
            }
            .main-right {
                display: flex;
                width: 18%;
                align-items: center;
                flex-direction: column;
                > div:first-child span {
                    color: @themeColor;
                }
                > div:last-child {
                    width: 100%;
                    text-align: right;
                }
            }
        }
        .list-nav {
            padding: 0.12rem;
            text-align: right;
            span {
                color: @themeColor;
            }
        }
        .list-btn {
            border-top: 1px solid #f7f7f7;
            padding: .12rem;
            display: flex;
            justify-content: flex-end;
            .act{
                background: #ffffff!important;
                border: 1px solid @themeColor!important;
                color: @themeColor!important;
            }
            .btns {
                margin-left: .08rem;
                display: inline-block;
                min-width: .6rem;
                padding: .04rem .08rem;
                box-sizing: border-box;
                color: #ffffff;
                background: @themeColor;
                border-radius: .03rem;
            }
        }
    }

</style>