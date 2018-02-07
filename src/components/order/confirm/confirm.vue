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
            <address-info :info="info.address" @tap="addressList"></address-info>
            <div class="goods" v-for="(i,index) in info.goods">
                <div class="goodstip">
                    <i class="iconfont">&#xe74b;</i>{{i.shopname}}
                </div>
                <shop-list :list="i['goods']"></shop-list>
            </div>
            <div class="deliveryMode deflist ">
                <div class="deliveryMode-lf">
                    给卖家留言:
                </div>
                <div class="deliveryMode-lr message">
                    <input type="text" name="" v-model="remark" placeholder="选填:对本次交易的说明)">
                </div>
            </div>
            <div class="goods-total">
      				<span class="goods-total-lf">
      					共 {{info.total}} 件, 合计：
      				</span>
                <span class="mygoods-price">
                        ¥
                        <span class="goods-intPrice">{{info.goodsprice | calculatePrice1}}.</span>
                        <span class="goods-folatPrice">{{info.goodsprice | calculatePrice2}}</span>
                    </span>
            </div>
            <ul class="exhibition">
                <li class="exhibition-cell" @click="choseCoupon">
                    <div class="exhibition-lf">
                        选择优惠券
                    </div>
                    <span class="mygoods-price">
                    {{coupons.backmoney}}
                    </span>
                </li>
                <li class="exhibition-cell">
                    <div class="exhibition-lf">
                        商品金额
                    </div>
                    <span class="mygoods-price">
                      ¥
                      <span class="goods-intPrice">{{info.goodsprice | calculatePrice1}}.</span>
                      <span class="goods-folatPrice">{{info.goodsprice | calculatePrice2}}</span>
                    </span>
                </li>
                <li class="exhibition-cell">
                    <div class="exhibition-lf">
                        商户单笔满{{info.enoughmoney}}元立减
                    </div>
                    <span class="mygoods-price">
                      -¥
                      <span class="goods-intPrice">{{info.enoughdeduct}}</span>
                        <!--<span class="goods-folatPrice">{{info.merch_enoughdeduct | calculatePrice2}}</span>-->
                    </span>
                </li>
                <li class="exhibition-cell" v-if="info.dispatch_price>0">
                    <div class="exhibition-lf">
                        +运费
                    </div>
                    <span class="mygoods-price">
                      +¥
                      <span class="goods-intPrice">{{info.dispatch_price | calculatePrice1}}.</span>
                      <span class="goods-folatPrice">{{info.dispatch_price | calculatePrice2}}</span>
                    </span>
                </li>
                <li class="exhibition-cell" v-if="info.discountprice>0">
                    <div class="exhibition-lf">
                        会员优惠
                    </div>
                    <span class="mygoods-price">
                      -¥
                      <span class="goods-intPrice">{{info.discountprice}}</span>
                        <!--<span class="goods-folatPrice">00</span>-->
                    </span>
                </li>
            </ul>
        </div>
        <footer>
            <div class="info">
                需付：<i>{{totalPrice}}</i>元
            </div>
            <div class="submit" @click="submit">立即支付</div>
        </footer>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import addressInfo from './addressInfo'
    import shopList from '../../common/view/shopList.vue'
    import price from '../../../assets/mixins/price'
    import {mapState, mapMutations, mapGetters} from 'Vuex';
    import {Toast} from 'mint-ui'

    export default {
        mixins: [price],
        data() {
            return {
                remark: '',
                info: {},
                goods: [],
                coupons:{
                    backmoney:''
                }
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            init() {
                let _this = this;
                util.request({
                    url: 'order.create',
                    method: 'get',
                    data: {
                        id: _this.$route.query.id,
                        total: _this.$route.query.total,
                        optionid: _this.$route.query.optionid,
                    },
                    success: function (res) {
                        _this.info = res.data
                        _this.coupons={}
                    },
                    error: function () {

                    },
                    complete: function () {

                    }
                })
            },
            addressList() {
                this.$router.push({name: 'addList'})
            },
            submit() {
                let _this = this;
                let params = {
                    diydata: false,
                    submit: true,
                    addressid: _this.info.address.id,
                    couponid: _this.coupons.id|| ''
                };
                for (let i of _this.info.goods) {
                    for (let s of i.goods) {
                        for (let v in s) {
                            params[`goods[${s.id}][${v}]`] = s[v]
                        }
                    }
                }
//                console.log(params)
                util.request({
                    url: 'order.create.submit',
                    method: 'post',
                    data: params,
                    success: function (res) {
                        _this.$router.push({name: 'pay', query: {id: res.data.orderid, type: 'order'}})
                    },
                    error: function (res) {
                        Toast({
                            message: `${res.message}`,
                            position: 'middle',
                            duration: 2000
                        });
                    }
                })
            },
            choseCoupon(){
                let _this=this
                let promise=new Promise((resolve,reject)=>{
                    let params={
                        type:0,
                        money:0
                    }
                    for (let i of _this.info.goods) {
                        for (let s of i.goods) {
                            for (let v in s) {
                                params[`goods[${s.id}][${v}]`] = s[v]
                            }
                        }
                    }
                    _this.COUPONLIST(params)
                    resolve()
                })
                promise.then(()=>{
                    this.$router.push({name:'choseCoupon'})
                })
            },
            ...mapMutations([
                'COUPONLIST'
            ]),
        },
        beforeRouteUpdate(to, from, next) {
            let _this = this
            if (from.name === 'addList') {
                if (from.query.type !== 1) {
                    _this.info.address = _this.userAddress
                }
            }
            if(from.name === 'choseCoupon' && from.query.coupon ===1){
                console.log('选择优惠券')
                _this.coupons=_this.coupon
            }
            next()
        },
        components: {
            addressInfo,
            shopList
        },
        computed: {
            ...mapState([
                'userAddress',
                'coupon'
            ]),
            totalPrice(){
                let num=this.coupons.backmoney || 0
                let realPrice=this.info.realprice-num
                if(realPrice<0){
                    return 0
                }else {
                    return realPrice
                }

//                return this.info.realprice-num
            }
        },
        mounted() {
            this.init()
        },
        activated(){
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
            margin-top: .4rem;
            margin-bottom: .5rem;
            padding-bottom: .5rem;
            .goods {
                margin-top: .1rem;
                width: 100%;
                .goodstip {
                    padding: 0.15rem 0.1rem;
                    font-size: 0.14rem;
                    text-align: left;
                    color: #666;
                }
            }
            .deliveryMode {
                width: 95.2%;
                margin: 0 auto;
                border-bottom: 0.01rem solid #E5E5E5;
                display: flex;
                height: .46rem;
                .deliveryMode-lf {
                    line-height: .46rem;
                    font-size: 0.14rem;
                    color: #666;
                }
                .deliveryMode-lr {
                    flex: 1;
                    margin-left: .1rem;
                }
                .message {
                    padding: .1rem 0;
                    input {
                        width: 100%;
                        line-height: .26rem;
                        font-size: 0.14rem;
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
                    color: #EC5151;
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
                    height: 0.46rem;
                    line-height: .46rem;
                    width: 100%;
                    font-size: 0.14rem;
                    color: #666;
                    padding: 0rem 0.1rem;
                    .exhibition-lf {
                        font-size: .16rem;
                        color: #666;
                    }
                    .mygoods-price {
                        text-align: right;
                        /*display: block;*/
                        flex: 1;
                        color: red;
                        .goods-intPrice {
                            font-size: .16rem;
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
            border-top: @border;
            .info {
                flex: 1;
                text-align: right;
                padding-right: .05rem;
                i {
                    color: #ef4f4f;
                }
            }
            .submit {
                width: 1.22rem;
                color: #fff;
                background-color: @danger;
            }
        }
    }
</style>
