<template>
    <div class="page">
        <mt-header title="确认订单 " fixed>
            <!--<router-link to="/userCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>-->
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <address-info :info="addressInfo" @tap="addressList"></address-info>
            <div class="goods">
                <img :src="goodsInfo.thumb" alt="">
                <div class="right">
                    <div class="title">{{goodsInfo.title}}</div>
                    <div>
                        <p v-if=" typs == 'single' ">(<span>{{goodsInfo.singleprice}}</span>/{{goodsInfo.goodsnum}}{{goodsInfo.units}})</p>
                        <p v-if=" typs == 'groups' ">(<span>{{goodsInfo.groupsprice}}</span>/{{goodsInfo.goodsnum}}{{goodsInfo.units}})</p>
                        <p>库存：{{goodsInfo.stock}}</p>
                    </div>
                </div>
            </div>
            <div class="deliveryMode deflist ">
                <div class="deliveryMode-lf">
                    给卖家留言:
                </div>
                <div class="deliveryMode-lr message">
                    <input  type="text" name="" v-model="remark" placeholder="选填:对本次交易的说明)">
                </div>
            </div>
            <ul class="exhibition">
                <li class="exhibition-cell">
                    <div class="exhibition-lf">
                        商品小计
                    </div>
                    <span class="mygoods-price">
                      ¥
                      <span class="goods-intPrice" v-if=" typs == 'single' ">{{goodsInfo.singleprice}}</span>
                      <span class="goods-intPrice" v-if=" typs == 'groups' ">{{goodsInfo.groupsprice}}</span>
                    </span>
                </li>
                <li class="exhibition-cell">
                    <div class="exhibition-lf">
                        运费
                    </div>
                    <span class="mygoods-price">
                      ¥
                      <span class="goods-intPrice">{{goodsInfo.freight}}</span>
                    </span>
                </li>
                <li class="exhibition-cell" v-if="set.is_head==1&&set.discount==1&&goodsInfo.headsmoney>0">
                    <div class="exhibition-lf">
                        团长优惠<span>{{goodsInfo.headsdiscount}}折</span>
                    </div>
                    <span class="mygoods-price">
                      -¥
                      <span class="goods-intPrice">{{goodsInfo.headsmoney}}</span>
                    </span>
                </li>
            </ul>
        </div>
        <footer>
            <div class="info" v-if=" typs == 'groups' ">需付：¥<i>{{gropTotal}}</i></div>
            <div class="info" v-if=" typs == 'single' ">需付：¥<i>{{sigTotal}}</i></div>
            <div class="submit" @click="submit">立即支付</div>
        </footer>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import addressInfo from  '../../order/confirm/addressInfo'
    import price from  '../../../assets/mixins/price'
    import {mapState, mapMutations, mapGetters} from 'Vuex';
    import { Toast } from 'mint-ui'
    export default {
        mixins:[price],
        data() {
            return {
                goodsInfo:{},
                addressInfo:{},
                remark:'',
                set:{},
                typs:''
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            init(){
                let _this = this;
                _this.typs = _this.$route.query.typs;
                util.request({
                    url:'groups.order.getconfirm',
                    method:'get',
                    data: {
                        id: _this.$route.query.id,
                        type:'groups'
                    },
                    success:function (res) {
                        _this.goodsInfo = res.data.goods;
                        _this.addressInfo = res.data.address;
                        _this.set = res.data.set;
                    },
                    error:function () {
                        
                    },
                    complete:function () {
                        
                    }
                })
            },
            addressList(){
                this.$router.push({name:'gaddList'})
            },
            submit(){
                let _this=this;
                let params={
                    id: _this.$route.query.id,
                    type: _this.$route.query.typ,
                    aid: _this.addressInfo.id,
                    teamid: 0
                };
                util.request({
                    url:'groups.order.confirm',
                    method:'get',
                    data: params,
                    success: function (res) {
                        _this.$router.push({name:'pay',query:{oid:res.data.orderid,tid:res.data.teamid,type:'groups'}})
                    },
                })
            },
            ...mapMutations({

            }),
        },
        beforeRouteUpdate(to, from, next){
            let _this=this
            if(from.name ==='gaddList'){
                if(from.query.type !==1){
                    _this.addressInfo = _this.userAddress;
                }
            }
            next()
        },
        components: {
            addressInfo,
        },
        computed: {
            ...mapState([
                'userAddress'
            ]),
            sigTotal :function(){
                let sigTotal = (parseFloat(this.goodsInfo.singleprice) + parseFloat(this.goodsInfo.freight)).toFixed(2);
                return sigTotal;
            },
            gropTotal :function(){
                let gropTotal = (parseFloat(this.goodsInfo.groupsprice) + parseFloat(this.goodsInfo.freight)).toFixed(2);
                return gropTotal;
            }
        },
        mounted(){
            this.init()
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .page {
        .page-view(1);
        .container {
            .scroll-view(100%);
            .header-height;
            background: #f7f7f7;
            margin-bottom: .5rem;
            .goods {
                margin-top: .1rem;
                width: 100%;
                background: #fff;
                display: flex;
                padding: .1rem;
                >img{
                    width: .7rem;
                    height: .7rem;
                    margin-right: .1rem;
                }
                .right {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                    justify-content: space-around;
                    .title{
                        font-size: 12px;
                    }
                    p{
                        font-size: 12px;
                        margin: .02rem 0;
                        span{
                            font-size: 12px;
                            color: @themeColor;
                            margin: 0 .03rem;
                        }
                    }
                }
            }
            .deliveryMode {
                display: flex;
                background: #fff;
                padding:0 .15rem;
                margin: .1rem 0;
                .deliveryMode-lf {
                    line-height: .46rem;
                    font-size: 0.12rem;
                    color: #666;
                    font-size: 12px;
                }
                .deliveryMode-lr {
                    flex: 1;
                    margin-left: .1rem;
                    font-size: 12px;
                ;
                }
                .message {
                    padding: .1rem 0;
                    input {
                        width: 100%;
                        line-height: .26rem;
                        font-size: 0.12rem;
                        color: #333;
                    }
                }
            }
            .goods-total {
                height: 0.46rem;
                line-height: 0.46rem;
                text-align: right;
                font-size: 0.12rem;
                padding: 0rem 0.1rem;
                .goods-total-lf {
                    font-size: 0.14rem;
                    color: #666;
                    font-weight: bolder;
                }
                .mygoods-price {
                    text-align: right;
                    font-size: 0.12rem;
                    color: @themeColor;
                    .goods-intPrice {
                        font-size: 0.2rem;
                    }
                    .goods-folatPrice {
                        font-size: .12rem;
                    }
                }
            }
            .exhibition {
                margin: 0.1rem 0rem 0.6rem 0rem;
                background: #fff;
                .exhibition-cell {
                    display: flex;
                    font-size: 0.13rem;
                    color: #666;
                    padding: 0.1rem;
                    border-bottom: @border;
                    .exhibition-lf {
                        font-size: .14rem;
                        color: #666;
                        span{
                            color: @themeColor;
                            font-size: .12rem;
                            margin-left: .1rem;
                        }
                    }
                    .mygoods-price {
                        font-size: .13rem;
                        text-align: right;
                        flex: 1;
                        .goods-intPrice {
                            font-size: .13rem;
                        }
                        .goods-folatPrice {
                            font-size: .12rem;
                        }
                    }
                }
            }
        }
        footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: .5rem;
            display: flex;
            line-height: .5rem;
            background: #fff;
            .info {
                flex: 1;
                text-align: right;
                padding-right: .05rem;
                font-size: 14px;
                i{
                    color: @themeColor;
                    font-size: 14px;
                    margin: 0 .03rem;
                }
            }
            .submit {
                width: 1.22rem;
                color: #fff;
                font-size: 14px;
                background-color: @themeColor;
            }
        }
    }
</style>