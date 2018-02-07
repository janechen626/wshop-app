<!--个人中心-->
<template>
    <div class="main">
        <mt-header title="充值" fixed>
            <router-link to="/userCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <div class="content">
                <div class="list">
                    <span>当前余额</span>
                    <span>￥{{data.credit}}</span>
                </div>
                <div class="list">
                    <span>充值金额</span>
                    <input type="number" v-model="money">
                </div>
            </div>
            <div class="tip">充值活动 充值满<span> {{give}} </span>元立即送<span> {{enough}} </span>元</div>
            <div class="btn" @click="pay('wechat_app')">微信支付</div>
        </div>
    </div>

</template>

<script>
    import util from '../../../api/util'
    import { MessageBox,Toast } from 'mint-ui'
    import {_webapp} from '../../../config/hook'

    export default {
        data() {
            return {
                data:[],
                give:0,
                enough:0,
                money:''
            }
        },
        methods: {
            init() {
                let that = this;
                util.request({
                    url: 'member.recharge',
                    method: 'get',
                    data: {},
                    success: function (res) {
                        console.log(res);
                        that.data = res.data;
                        that.give = res.data.acts[0].give;
                        that.enough = res.data.acts[0].enough;
                    },
                    error: function (error) {
                        console.log(error)
                    },
                    complete: function () {

                    }
                })
            },
            pay(type){
                let _this=this
                if(_this.money){
                    let params = {
                        data: {
                            money:_this.money,
                            couponid:0,
                            type:type
                        }
                    };
                    _webapp.payment(params,(res)=>{
                        Toast({
//                        message: `${res.data.order.status}`,
                            message: `充值成功`,
                            position: 'middle',
                            duration: 2000
                        });
                        setTimeout(()=>{
                            _this.$router.push({name:'userCenter'})
                        },2000)
                    })
                }else {
                    Toast({
//                        message: `${res.data.order.status}`,
                        message: `请输入金额`,
                        position: 'middle',
                        duration: 2000
                    });
                }

            },
        },
        mounted() {
            this.init();
        },
        components: {

        },

    }
</script>
<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(1);
        .container {
            .scroll-view(100%);
            .header-height;
            text-align: left;
            .content{
                .list:first-child{
                    border-bottom: 1px solid #f7f7f7;
                }
                .list{
                    padding:.1rem .2rem;
                    span:first-child{
                        font-size: .14rem;
                        width: .8rem;
                        display: inline-block;
                    }
                    span:last-child,input{
                        font-size: .14rem;
                        color: #666;
                    }
                }
            }
            .tip{
                margin-top:.1rem;
                padding:.1rem .2rem;
                font-size: .14rem;
                span{
                    color: #ef4f4f;
                }
            }
            .btn{
                margin-top:.1rem;
                width: 94%;
                margin-left:3%;
                height:.4rem;
                line-height: .4rem;
                color: #ffffff;
                border-radius: .06rem;
                text-align: center;
                background: #039702;
            }
        }
    }
</style>