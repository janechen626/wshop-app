<!--优惠券详情-->
<template>
    <div class="main">
        <mt-header title="优惠券" fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <div class="top">
                <div class="top-first">
                    <div>{{detail.name}}</div>
                    <div>有效期: {{detail.usestr}} {{detail.merchstr}}</div>
                </div>
                <div class="top-btn">
                    <div class="btn-text">{{detail.title2}}{{detail.title3}}</div>
                    <!--<div class="btns"><div>{{buying?"操作中...":detail.getstr}}</div></div>-->

                    <router-link :to="{name:'index'}" tag="div" class="btns" >
                        <div>{{detail.getstr}}</div>
                    </router-link>
                </div>
                <div class="top-bottom">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="box">
                <div class="box-content">
                    <div class="list" v-if='detail.money > 0 || detail.credit > 0'>
                        <div>购买价格</div>
                        <div>{{detail.money}}元{{detail.money > 0 && detail.credit > 0?"+":""}}{{detail.credit}}积分</div>
                    </div>
                    <div class="list">
                        <div>领取限制</div>
                        <div v-if="detail.islimitlevel == 1">
                            <div>用户必须达到以下条件之一:</div>
                            <div v-if='detail.limitmemberlevels'>{{detail.limitmemberlevels}}</div>
                            <div class='text' v-if="detail.limitagentlevels">{{detail.limitagentlevels}}</div>
                            <div class='text' v-if="detail.limitpartnerlevels">{{detail.limitpartnerlevels}}</div>
                            <div class='text' v-if="detail.limitaagentlevels">{{detail.limitaagentlevels}}</div>
                        </div>
                    </div>

                    <div class="list">
                        <div>有效期限</div>
                        <div>{{detail.usestr}} {{detail.merchstr}}</div>
                    </div>
                    <div class="list">
                        <div>使用说明</div>
                        <div class='text wxParse' v-if="detail.desc != ''">暂无</div>
                        <div class='text' v-else>无</div>
                    </div>
                    <div class="list">
                        <div class='title'>使用限制</div>
                        <div class='text' v-if="detail.coupontype == 2">本优惠卷只能在收银台中使用</div>
                        <div class='text' v-if="detail.limitdiscounttype == 1">不允许与促销优惠同时使用</div>
                        <div class='text' v-if="detail.limitdiscounttype == 2">不允许与会员折扣同时使用</div>
                        <div class='text' v-if="detail.limitdiscounttype == 3">不允许与促销优惠和会员折扣同时使用</div>
                        <div class='text' v-if="detail.limitgoodtype == 1">
                            <div class='text'>允许以下商品使用:</div>
                            <div class='text' v-for="(v,i) in limitgoods" :key="i">{{v.title}}</div>
                        </div>
                        <div class='text' v-if="detail.limitgoodcatetype == 1">
                            <div class='text'>允许以下商品分类使用:</div>
                            <div class='text' v-for="(v,i) in limitcates" :key="i">{{v.name}}</div>
                        </div>
                        <div v-if="detail.limitgoodtype == 0 && detail.limitgoodcatetype == 0 && detail.limitdiscounttype == 0 && detail.coupontype != 2">无</div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import { Toast } from 'mint-ui'
    export default {
        data() {
            return {
                detail:[],
                logid:0,
                dataid:0
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            getMyDetail(){
                let that = this;
                console.log(that.$route.query.id);
                util.request({
                    url: 'sale.coupon.my.getdetail',
                    method: 'get',
                    data: {
                        id: that.$route.query.id,
                    },
                    success: function (res) {
                        console.log(res.data.detail);
                        that.detail=res.data.detail
                    },
                    error: function (error) {

                    },
                    complete: function () {

                    }
                })
            },
        },
        components: {

        },
        mounted() {
            this.getMyDetail();
        },
        created() {

        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/common.less';
    .main {
        .page-view(100);
        .container {
            .scroll-view(100%);
            .header-height;
            .top{
                background:#ff6c00;
                text-align:center;
                color:#fff;
                padding:.2rem 0;
                padding-bottom:0;
                .top-first{
                    padding-bottom:.2rem;
                    border-bottom: 1px dashed #fff;
                    div:first-child{
                        font-weight: 600;
                        font-size: .18rem;
                    }
                    div:last-child{
                        font-size: .14rem;
                    }
                }
                .top-btn{
                    padding:.2rem;
                    .btn-text{
                        font-size: .2rem;
                        font-weight: 600;
                    }
                    .btns{
                        margin-top:.04rem;
                        text-align: center;
                        div{
                            display: inline-block;
                            padding:.05rem .4rem;
                            border: .04rem solid #7F3600;
                            border-radius: .4rem;
                            background:#fff;
                            color: #ff6c00;
                        }
                    }
                }
                .top-bottom{
                    height:.15rem;
                    position: relative;
                    display: flex;
                    overflow: hidden;
                    span{
                        width: .15rem;
                        height:.15rem;
                        background: #ffffff;
                        border-radius: .15rem;
                        margin-left: .065rem;
                        position: relative;
                        top:.08rem;
                    }
                }
            }
            .box{
                padding:.2rem;
                .box-content{
                    border:1px solid #dcdcdc;
                    border-radius: .06rem;
                    >.list:last-child{
                        border-bottom:none!important;
                    }
                    .list{
                        padding:.2rem;
                        text-align: left;
                        border-bottom: 1px dashed #dfdfdf;
                        >div:first-child{
                            font-weight: 600;
                            color: #000;
                            font-size: .14rem;
                            margin-bottom:.04rem;
                        }
                        >div:last-child{
                            font-size: .14rem;
                            color: #8f8f8f;
                            >div:first-child{
                                color: #000;
                            }
                            >div{
                                font-size: .14rem;
                            }
                        }
                    }
                }
            }
        }

    }
</style>