<template>
    <tip :tip="tips">
    <ul id="list" v-if="list.length" class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li class="tab-list" v-for="(v,i) in list" :key="i" tag="div">
            <router-link :to="{name:'GroupListDetail',query:{tid:v.teamid}}" class="list-title" tag="div">
                <div>订单号:{{v.orderno}}</div>
                <div v-if="v.success==0">组团中<span class="icon-you">&#xe61b;</span></div>
                <div v-if="v.success==1">组团成功<span class="icon-you">&#xe61b;</span></div>
                <div v-if="v.success==-1">组团失败<span class="icon-you">&#xe61b;</span></div>
            </router-link>
            <router-link class="list-main" :to="{name:'GroupListDetail',query:{tid:v.teamid}}" tag="div">
                <div class="main-left">
                    <img :src="v.thumb" alt="">
                </div>
                <div class="main-center">
                    {{v.title}}
                </div>
                <div class="main-center">
                    <div class='state-box now' v-if="v.success==0">
                        <div>
                            <span>正在组团</span>
                        </div>
                    </div>
                    <div class='state-box' v-if="v.success==1">
                        <div>
                            <span>组团成功</span>
                        </div>
                    </div>
                    <div class='state-box fail'  v-if="v.success==-1">
                        <div>
                            <span>组团失败</span>
                        </div>
                    </div>
                </div>
                <div class="main-right">
                    <div>
                        <span>￥{{v.groupsprice}}/{{v.units}}</span>
                    </div>
                    <div>x{{v.goodsnum}}</div>
                </div>
            </router-link>
            <div class="list-nav">
                运费: <span>￥{{v.freight}}</span>元,
                共 <span>{{v.goodsnum}}</span>个商品,总额: <span>￥{{v.amount}}</span>元
                <i class="icon-you">&#xe61b;</i>
            </div>
            <router-link :to="{name:'GroupListDetail',query:{tid:v.teamid}}" class="list-btn" tag="div">
                <div class="btns">查看团详情</div>
            </router-link>
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
                    title: '您暂时没有该团记录哦！',
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
                this.$emit('delete',i)
            },
            remind(i){
                this.$emit('remind',i)
            }

        },
        components:{
            Tip,
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
                flex: 1;
                text-align: left;
                margin-left: .1rem;
                font-size: .14rem;
                color: #727272;
                position: relative;
                .fail{
                    border: 0.02rem solid #FE5653!important;
                    >div{
                        border:0.01rem solid #FE5653!important;
                        color: #FE5653!important
                    }
                }
                .now{
                    border: 0.02rem solid #F9D897!important;
                    >div{
                        border:0.01rem solid #F9D897!important;
                        color: #F9D897!important
                    }
                }
                .state-box{
                 position:absolute;
                 width:.6rem;
                 height:.6rem;
                 border:.02rem solid #57f812;
                 border-radius:50%;
                 display:flex;
                 justify-content:center;
                 align-items:center;
                 right:22%;
                 transform:rotate(-22deg);
                 >div{
                     width:.54rem;
                     height:.54rem;
                     border:0.01rem solid #8ad158;
                     border-radius:50%;
                     color:#57f812;
                     font-weight:600;
                     display:flex;
                     justify-content:center;
                     align-items:center;
                     >span{
                         width:.3rem;
                         font-size:.15rem;
                     }
                 }
             }
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
                padding: .04rem .1rem;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                color: #ffffff;
                background: #ef4f4f;
                border-radius: .03rem;
                font-size: .14rem;
            }
        }
    }

</style>