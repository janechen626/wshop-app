<template>
    <div class="main">
        <mt-header title="分销佣金">
            <router-link to="/distribution" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <div class="top-bar">
                <div>
                    <p>{{set.commission_total}}({{set.yuan}})</p>
                    <p>{{member.commission_total}}</p>
                </div>
                <span>{{set.commission_detail}}</span>
            </div>

            <ul>
                <li><span>{{set.commission_ok}}</span><span class='text-danger'>{{member.commission_ok}}{{set.yuan}}</span></li>
            </ul>

            <ul>
                <li><span>{{set.commission_apply}}</span><span>{{member.commission_apply}}{{set.yuan}}</span></li>
                <li><span>{{set.commission_check}}</span><span>{{member.commission_check}}{{set.yuan}}</span></li>
                <li><span>{{set.commission_fail}}</span><span>{{member.commission_fail}}{{set.yuan}}</span></li>
                <li><span>{{set.commission_pay}}</span><span>{{member.commission_pay}}{{set.yuan}}</span></li>
                <li v-if="member.commission_charge > 0"><span>{{set.commission_charge}}</span><span>{{member.commission_charge}}{{set.yuan}}</span></li>
            </ul>

            <ul>
                <li><span>{{set.commission_wait}}</span><span>{{member.commission_wait}}{{set.yuan}}</span></li>
                <li><span>{{set.commission_lock}}</span><span>{{member.commission_lock}}{{set.yuan}}</span></li>
            </ul>

            <ul>
                <li @click="tap" style="border-bottom:none">
                    <span>用户须知</span>
                    <span class="iconfont" v-if="isShow">&#xe667;</span>  
                    <span class="iconfont" v-else>&#xe666;</span>
                </li>
                <li class="txt" v-if="isShow">
                    <div v-if="set.settledays > 0">
                        <p>买家确认收货（<span class='text-danger'>set.settledays天</span>)后，{{set.commission}}可{{set.withdraw}} 。结算期内，买家退货，{{set.commission}}将自动扣除。</p>
                        <p v-if="set.withdraw > 0">注意：可用{{set.commission}}满<span class='text-danger'>{{set.withdrawset.yuan}}</span>后才能申请{{set.withdraw}}</p>
                    </div>
                    <div v-else>买家确认收货后，立即获得{{set.commission1}}</div>
                </li>
            </ul>

            <div :class="['withdraw',{'disabled':!cansettle}]" @click="withdraw">我要提现</div>
            
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
                cansettle:false,
                isShow:0
            }
        },
        methods: {
            init(){
                let _this = this;
                util.request({
                    url: 'commission.withdraw',
                    data:{},
                    method:'get',
                    success(res){
                        _this.baseInfo = res.data;
                        _this.member = res.data.member;
                        _this.menu = res.data.menu;
                        _this.set = res.data.set.texts;
                        _this.cansettle = res.data.cansettle;
                    }
                })
            },
            withdraw(){
                if(this.cansettle){
                    this.$router.push({name:'comWithdraw'})
                }
            },
            tap(){
                this.isShow = this.isShow == 0 ? 1 : 0;
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
            .text-danger{
                color: @themeColor;
            }
            .top-bar{
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #FE5455;
                padding: .2rem;
                p{
                    font-size: .18rem;
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
            ul{
                margin: .2rem .1rem;
                li{
                    border-bottom: @border;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: .1rem 0;
                    span{
                        font-size: .14rem;
                    }
                    
                }
                li:last-child{
                    border-bottom: none;
                }
                .txt{
                    >div{
                        font-size: .14rem;
                        color: #666
                    }
                    p{
                        font-size: .14rem;
                    }
                    span{
                        font-size: .14rem;
                    }
                }
            }  
            .withdraw{
                background:#ef4f4f;
                color:#fff;
                border:1px solid #d84747;
                font-size: .15rem;
                padding: .08rem;
                margin: 0.1rem;
                border-radius: .05rem;
            }
            .disabled{
                background:#c13e3e;
                color:#d2848b;
                border:1px solid #ae3838;
            }
        }
    }
</style>