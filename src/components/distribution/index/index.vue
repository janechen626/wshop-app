<template>
    <div class="main">
        <mt-header title="分销中心">
            <router-link to="/userCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <!-- 基本信息 -->
            <div class="base-info">
                <img :src="member.avatar" alt="">
                <div class="right">
                    <h3>{{member.nickname}}</h3>
                    <p class="yellow">{{baseInfo.levelname}}</p>
                    <p>{{set.up}}: {{baseInfo.agentname}}</p>
                </div>
            </div>
            <!-- 佣金 -->
            <div class="commission-box">
                <div class="top">
                    <p>{{set.commission_pay}}({{set.yuan}})</p>
                    <p><span>{{member.commission_pay}}</span></p>
                </div>
                <div class="btm">
                    <div>
                        <p>{{set.commission_ok}}({{set.yuan}})</p>
                        <p>{{member.commission_ok}}</p>
                    </div>
                    <router-link :to="{name:'commission'}" tag="span">{{set.commission}}{{set.withdraw}}</router-link>
                </div>
            </div>
            <!-- 分销菜单 -->
            <ul class="nav-box">
                <router-link :to="{name:'commission'}" tag="li">
                    <img src="../../../assets/images/money.png" alt="">
                    <p>{{set.commission1}}</p>
                    <p><span>{{member.commission_total}}</span>{{set.yuan}}</p>
                </router-link>
                <router-link :to="{name:'distributionOrder'}" tag='li'>
                    <img src="../../../assets/images/list.png" alt="">
                    <p>{{set.order}}</p>
                    <p><span>{{member.ordercount0}}</span>笔</p>
                </router-link>
                <router-link :to="{name:'withdrawals'}" tag='li'>
                    <img src="../../../assets/images/manage-order.png" alt="">
                    <p>{{set.commission_detail}}</p>
                    <p><span>{{member.applycount}}</span>笔</p>
                </router-link>
                <router-link :to="{name:'partner'}" tag='li'>
                    <img src="../../../assets/images/group.png" alt="">
                    <p>{{set.mydown}}</p>
                    <p><span>{{member.downcount}}</span>人</p>
                </router-link>
                <router-link :to="{name:'qCode'}" tag='li'>
                    <img src="../../../assets/images/code.png" alt="">
                    <p>推广二维码</p>
                </router-link>
            </ul>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    export default {
        data() {
            return {
                baseInfo:{},
                member:{},
                menu:{},
                set:{},
            }
        },
        methods: {
            init(){
                let _this = this;
                util.request({
                    url: 'commission.index',
                    data:{},
                    method:'get',
                    success(res){
                        _this.baseInfo = res.data;
                        _this.member = res.data.member;
                        _this.menu = res.data.menu;
                        _this.set = res.data.set.texts;
                    }
                })
            }
        },
        components:{

        },
        mounted(){
            this.init();
        },
        created(){

        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/common.less';
    .main {
        .page-view(100);
        .container {
            .scroll-view(100%);
            .base-info{
                display: flex;
                background: #FE5455;
                border-bottom: @border;
                padding: .1rem;
                align-items: center;
                >img{
                    width: .5rem;
                    height: .5rem;
                    border-radius: 50%;
                    margin-right: .1rem;
                }
                .right{
                    flex: 1;
                    h3{
                        font-size: .18rem;
                        color: #fff;
                        text-align: left;
                    }
                    p{
                        color: #fff;
                        text-align: left;
                        font-size: .14rem;
                    }
                    .yellow{
                        color: #fef31f;
                    }
                }
            }
            .commission-box{
                display: flex;
                flex-direction: column;
                 background: #FE5455;
                 padding: .1rem .18rem;
                .top{
                    margin-bottom: .1rem;
                    p{
                        font-size: .16rem;
                        color: #fff;
                        text-align: left;
                        span{
                            font-size: .22rem;
                        }
                    }
                }
                .btm{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p{
                        font-size: .14rem;
                        color: #fff;
                        text-align: left;
                    }
                    span{
                        font-size: .14rem;
                        color: #fff;
                        border: 1px solid #fff;
                        border-radius: .12rem;
                        padding: .012rem .1rem;
                    }
                }
            }
            .nav-box{
                display: flex;
                flex-wrap: wrap;
                li{
                    width: 33.33%;
                    border-right: @border;
                    border-bottom: @border;
                    padding: .2rem;
                    img{
                        width: .35rem;
                        height: .35rem;
                        margin-bottom: .03rem;
                    }
                    p{
                        font-size: .12rem;
                        span{
                            font-size: .12rem;
                            color: #feb312;
                            margin-right: .02rem;
                        }
                    }
                }
            }
        }
    }
</style>
