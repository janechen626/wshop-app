<template>
    <tip :tip="tips">
    <ul id="list" v-if="list.length" class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li class="tab-list" v-for="(v,i) in list" :key="i" tag="div">
            <router-link :to="{name:'GroupOrderDetail',query:{id:v.id}}" class="list-title" tag="div">
                <div>订单号:{{v.orderno}}</div>
                <div>{{v.statusstr}} <span class="icon-you">&#xe61b;</span></div>
            </router-link>
            <router-link class="list-main" :to="{name:'GroupOrderDetail',query:{oid:v.id,tid:v.teamid}}" tag="div">
                <div class="main-left">
                    <img :src="v.thumb" alt="">
                </div>
                <div class="main-center">
                    {{v.title}}
                </div>
                <div class="main-right">
                    <div>
                        <span>￥{{v.price}}/{{v.units}}</span>
                    </div>
                    <div>x{{v.goodsnum}}</div>
                </div>
            </router-link>
            <div class="list-nav">
                运费: <span>￥{{v.freight}}</span>元,
                共 <span>{{v.goodsnum}}</span>个商品,总额: <span>￥{{v.amount}}</span>元
                <i class="icon-you">&#xe61b;</i>
            </div>
            <div class="list-btn">
                <div v-if="v.status==0" class="btns act" @click="cancel(v.id)">取消订单</div>
                <router-link class="btns" :to="{name:'pay',query:{oid:v.id,tid:v.teamid,type:'groups'}}"  v-if="v.status==0" tag="div">支付订单</router-link>
                <div class="btns" v-if="v.status==2" @click="confirm(v.id)">确认收货</div>
                <div v-if="v.status==-1" class="btns act" @click="del(v.id)">删除订单</div>
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
                console.log('goodList LoadMore')
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
        margin-bottom: .5rem;
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
                flex: 1;
                text-align: left;
                margin-left: .1rem;
                font-size: .14rem;
                color: #727272;
            }
            .main-right {
                display: flex;
                width: 18%;
                align-items: center;
                flex-direction: column;
                font-size: .14rem;
                > div:first-child span {
                    color: @themeColor;
                    font-size: .14rem;
                }
                > div:last-child {
                    width: 100%;
                    text-align: right;
                    font-size: .14rem;
                }
            }
        }
        .list-nav {
            padding: 0.12rem;
            text-align: right;
            font-size: .14rem!important;
            span {
                color: @themeColor;
                font-size: .14rem!important;
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