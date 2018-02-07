<template>
    <div class="page">
        <mt-header title="收银台" fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <!-- 订单编号模块 -->
            <div class="orderContent" v-if="this.$route.query.mes!=0">
                <div class="order" v-if="order.ordersn">
                    <p class="left">订单编号</p>
                    <p class="right number">{{order.ordersn}}</p>
                </div>
                <div class="order" v-else>
                    <p class="left">订单编号</p>
                    <p class="right number" >{{group.orderno}}</p>
                </div>
                <div class="order line" v-if="order.ordersn">
                    <p class="left">订单金额</p>
                    <p class="right money">&yen;{{order.price}}</p>
                </div>
                <div class="order line" v-else>
                    <p class="left">订单金额</p>
                    <p class="right money">&yen;{{group.price}}</p>
                </div>
            </div>
            <!-- 微信支付模块 -->
            <ul class="payment">
                <li class="center-cell" @click="pay('wechat_app')">
                    <div class="iconfont icon1 line">&#xe605;</div>
                    <div class="lines">&#xe68c;</div>
                    <div class="title-list">
                        <div>微信支付</div>
                        <div class="money icon4">
                            <i>&#xe68d;</i>微信安全支付
                        </div>
                    </div>
                    <i class="iconfont right">&#xe649;</i>
                </li>
                <li class="center-cell" @click="pay('alipay_app')">
                    <div class="iconfont zhifubao icon1 line ">&#xe65b;</div>
                    <div class="lines">&#xe68c;</div>
                    <div class="title-list">
                        <div>支付宝支付</div>
                        <div class="money icon4">
                            <i>&#xe68d;</i>支付宝安全支付
                        </div>
                    </div>
                    <i class="iconfont right">&#xe649;</i>
                </li>
                <li class="center-cell"  @click="creditPay('credit')" v-if="this.$route.query.mes!=0 && !group.orderno">
                    <div class="iconfont  icon1 icon2 line">&#xe690;</div>
                    <div class="lines">&#xe68c;</div>
                    <div class="title-list">
                        <div>余额支付</div>
                        <div class="money">当前余额:￥{{credit.current}}</div>
                    </div>
                    <i class="iconfont right">&#xe649;</i>
                </li>
                <li class="center-cell" @click="other">
                    <div class="iconfont  icon1 icon3 line" style="font-size: .24rem">&#xe638;</div>
                    <div class="lines">&#xe68c;</div>
                    <div class="title-list">
                        <div>微信找人代付</div>
                        <div class="money">帮你付款的人才是真爱</div>
                    </div>
                    <i class="iconfont right">&#xe649;</i>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import util from '../../../api/util'
    import {_webapp} from '../../../config/hook.js'
    import { MessageBox,Toast } from 'mint-ui'
    export default {
        data() {
            return {
                order: {

                },
                credit: [],
                group:{
                    orderno:'',
                    price:''
                },
                forms:'',
                urlkey:''
            }
        },
        methods: {
            goBack(){
                let _this=this;
                let route={
                    'confirm':{router:{name:'order',query:{status:'0'}},type:'push'},
                    'order':{router:{name:'order',query:{status:'0'}},type:'push'},
                    'detail':{router:'-1',type:'go'},
                    'groupConfirm':{router:{name:'groupOrder',query:{status:'1'}},type:'push'},
                    'groupOrder':{router:{name:'groupOrder',query:{status:'1'}},type:'push'},
                    'GroupOrderDetail':{router:'-1',type:'go'},
                    'integralConfirm':{router:'-1',type:'go'},
                }
                this.$router[route[_this.forms].type](route[_this.forms].router)
            },
            getPay(){
                let that = this;
                console.log(that.$route.query.id);
                util.request({
                    url: `${that.$route.query.type}.pay`,
                    method: 'post',
                    data: {
                        id: that.$route.query.id,
                        orderid: that.$route.query.oid,
                        teamid: that.$route.query.tid
                    },
                    success: function (res) {
                        if(that.$route.query.type== 'order'){
                            that.order = res.data.order;
                            that.credit = res.data.credit
                        }else if(that.$route.query.type== 'groups') {
                            that.group.orderno =res.data.orderno
                            that.group.price=res.data.money
                            console.log('来自group')
                            console.log(that.group)
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    },
                    complete: function () {

                    }
                })
            },
            creditPay(typ,url){
                let that = this;
                MessageBox({
                    title: "提示",
                    message: "确认要支付吗",
                    showCancelButton: true
                }).then(action => {
                    if (action == "confirm") {
                        util.request({
                            url: `${that.$route.query.type}.pay.complete`,
                            method: 'post',
                            data: {
                                type:typ,
                                id: that.$route.query.id,
                                orderid: that.$route.query.oid,
                                teamid: that.$route.query.tid
                            },
                            success: function (res) {
                                Toast({
                                    message: `${res.data.order.status}`,
                                    position: 'middle',
                                    duration: 1000
                                });
                                setTimeout(()=>{
                                    that.$router.push({name:'order',query:{status:'1'}})
                                },2000)
                            },
                            error: function (error) {
                                console.log(error)
                            },
                            complete: function () {

                            }
                        })
                    } else if (action === "cancel") {
                        //表示点击了取消
                    }
                });



            },
            pay(type){
                let _this=this
                console.log(type)
                let params = {
                    data: {
                        ordersn: _this.order.ordersn || '',
                        type:type
                    }
                }
                _webapp.payment(params,(res)=>{
                    Toast({
//                        message: `${res.data.order.status}`,
                        message: `支付成功`,
                        position: 'middle',
                        duration: 2000
                    });
                    setTimeout(()=>{
                        _this.$router.push({name:'order',query:{status:'1'}})
                    },2000)
                })
            },
            other(){
                Toast({
                    message: `暂未开通`,
                    position: 'middle',
                    duration: 2000
                });
            }
        },
        beforeRouteEnter(to, from, next){
            console.log('fromname')
            console.log(from.name)

            next(vm=>{
                vm.forms=from.name
            })
        },
        mounted () {
            this.getPay();
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    .page {
        .page-view(1);
        .container {
            background-color: #f3f3f3;
            margin-top: 0.40rem;
            font-size: 0.16rem;
            .orderContent {
                background-color: #fff;
                padding: 0 0.12rem;
                .order {
                    width: 100%;
                    height: 0.45rem;
                    line-height: 0.45rem;
                    display: flex;
                    justify-content: space-between;
                    .left {
                        padding-left: 0.10rem;
                        color: #9a9a9a;
                        font-size: .14rem;
                    }
                    .right {
                        font-size: .14rem;
                    }
                    .money {
                        color: #ff5151;
                    }
                    .nember {
                        color: #101010;
                    }
                }
                .line {
                    border-top: 1px solid #ebebeb;
                }

            }
            .payment {
                background-color: red;
                float: left;
                width: 100%;
                border-top: 0.10rem solid #f7f7f7;
                .center-cell {
                    border-bottom: 1px solid #ebebeb;
                    float: left;
                    width: 100%;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    background: #fff;
                    .zhifubao{
                        color:#02A9F1!important;
                    }
                    .icon1 {
                        float: left;
                        font-family: iconfont;
                        font-size: .3rem;
                        margin-left: .12rem;
                        color: #4bb803;
                    }
                    .icon2 {
                        color: #f48533;
                        font-weight: bold;
                    }

                    .icon3 {
                        color: #f6d410;
                    }

                    .lines {
                        font-family: iconfont;
                        float: left;
                        font-size: .4rem;
                        color: #eaeaea;
                    }
                    .title-list {
                        float: left;
                        .money {
                            color: #9b9b9b;
                        }
                        .icon4 {
                            i {
                                font-family: iconfont;
                                color: #8ea9ee;
                            }
                        }
                        div {
                            height: .4rem;
                            line-height: .4rem;
                            text-align: left
                        }
                        div:first-child {
                            line-height: .5rem;
                            font-size: .14rem;
                        }
                        div:last-child {
                            line-height: .3rem;
                            font-family: iconfont;
                            font-size: .14rem;

                        }
                    }
                    .right {
                        font-family: iconfont;
                        float: right;
                        margin: 0 .12rem;
                    }
                }
            }
        }
    }
</style>