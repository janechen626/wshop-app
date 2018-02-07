<template>
    <div class="main" style="background: #f7f7f7;">
        <mt-header title="确认订单" fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <!--<address-info style="margin-top: .4rem;" :info="info.address" @tap="addressList"></address-info>-->
            <address-info v-if="goods.type==0&&goods.isverify==0&&goods.goodstype==0" style="margin-top: .4rem;"  :info="info.address" @tap="addressList"></address-info>

            <div class="shop">
                <div class="shop-title"><span class="icon-shop">&#xe6a8;</span> {{set.shopname}}</div>
                <div class="list-main">
                    <div class="main-left">
                        <img :src="goods.thumb" alt="">
                        <div>
                            <span>{{goods.title}}</span>
                            <div>规格：{{goods.optiontitle}}</div>
                        </div>
                    </div>
                    <div class="main-right">
                        <div>{{goods.credit}}{{set.creditname}}</div>
                        <div v-if="goods.money>0">￥{{goods.money}}</div>
                        <div>x1</div>
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list-item">
                    <div>商品小计</div>
                    <div>{{goods.credit}}{{set.creditname}}+￥{{money}}</div>
                </div>
                <div class="list-item" v-if='goods.goodstype == 0 && goods.type == 0 && goods.isverify == 0'>
                    <div>运费</div>
                    <div>{{dispatch}}</div>
                </div>
            </div>
            <div class="btns">
                <div>需付：
                    <span v-if='goods.goodstype == 0 && goods.type == 0 && goods.isverify == 0 && goods.dispatch == 0'>(含运费)</span>
                    {{goods.credit}}{{set.creditname}}
                    <span v-if='goods.dispatch >0 || goods.money >0'>+￥{{ dispatch + money}}</span>
                </div>
                <div @click="pays">立即支付</div>
            </div>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import {Toast} from 'mint-ui';
    import list from './../../../assets/mixins/list'
    import addressInfo from  '../../order/confirm/addressInfo'
    import {mapState, mapMutations, mapGetters} from 'Vuex';
    export default {
        data() {
            return {
                goods: [],
                list: [],
                set: [],
                money: 0,
                dispatch: 0,
                info: { },
                ids:'',
            }
        },
        prop: {},
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            getCreate(){
                let that = this;
                util.request({
                    url: 'creditshop.create',
                    method: 'get',
                    data: {
                        id: that.$route.query.id,
                    },
                    success: function (res) {
                        console.log(res);
                        that.goods = res.data.goods;
                        that.info = res.data;
                        that.set = res.data.set;
                        that.money = parseFloat(res.data.goods.money);
                        that.dispatch = parseFloat(res.data.goods.dispatch)
                    },
                    error: function (error) {
                        console.log(error)
                    },
                    complete: function () {

                    }
                })
            },
            pays(){
                let that = this;
                if(that.ids == "" && that.goods.type == "0" && that.goods.goodstype == "0"){
                    Toast({
                        message: '请选择收货地址',
                        position: 'middle',
                        duration: 2000
                    });
                    return false
                }
                //抽奖
                if(that.goods.type==1){
                    util.request({
                        url: 'creditshop.detail.ipay',
                        method: 'post',
                        data: {
                            id: that.$route.query.id,
                            optionid: that.goods.optionid || '',
                            paytype: 'wechat_app'
                        },
                        success: function (res) {
                            console.log(res);
                            that.$router.push({name: 'integralMake', query: {logid: res.data.logid,type:that.goods.type}})

                            if(that.goods.type==0){
                                that.$router.push({name: 'integralMake', query: {logid: res.data.logid,type:that.goods.type,status:that.goods.status}})
                            }
                        },
                        error: function (error) {
                            console.log(error)
                        },
                        complete: function (res) {

                        }
                    })
                }
                // 兑换
                if(that.goods.type==0){
                    console.log(that.goods.goodstype);
                    let params = {};
                    if(that.goods.goodstype==1){
                        params = {
                            id: that.$route.query.id,
                            optionid: that.goods.optionid || '',
                            paytype: 'wechat_app'
                        };
                    }else{
                        params = {
                            id: that.$route.query.id,
                            addressid: that.info.address.id,
                            optionid: that.goods.optionid || '',
                            paytype: 'wechat_app'
                        };
                    }
                    util.request({
                        url: 'creditshop.detail.ipay',
                        method: 'post',
                        data: params,
                        success: function (res) {
                            if(that.dispatch+that.money>0){
                                console.log('跳转支付')
                                that.$router.push({name: 'pay', query: {mes:0}})
                            }else{
                                that.$router.push({name: 'integralMake', query: {logid: res.data.logid,type:that.goods.type,status:that.goods.status}})
                            }
                        },
                        error: function (error) {
                            console.log(error)
                        },
                        complete: function (res) {

                        }
                    })
                }

            },
            addressList(){
                this.$router.push({name: 'icaddList'})
            },
            submit(){

                let _this = this;
                if (_this.info.address) {
                    let params = {
                        id: _this.$route.query.id,
                        addressid: _this.info.address.id,
                        optionid: _this.$route.query.optionid,
                    };
                    util.request({
                        url: 'creditshop.detail.ipay',
                        method: 'post',
                        data: params,
                        success: function (res) {
                            _this.$router.push({name: 'pay', query: {id: res.data.orderid}})
                        },
                        error: function (res) {
                            Toast({
                                message: `${res.message}`,
                                position: 'middle',
                                duration: 2000
                            });
                        }
                    })
                } else {
                    Toast({
                        message: '请选择收货地址',
                        position: 'middle',
                        duration: 2000
                    });
                    return false;
                }


            },
        },
        beforeRouteUpdate(to, from, next){
            let _this = this
            if (from.name === 'icaddList') {
                console.log(from)
                console.log(from.query.type)
                if (from.query.type !== 1) {
                    _this.info.address = _this.userAddress
                    _this.ids = "0"
                }
            }
            next()
        },
        mounted () {
            this.getCreate()
        },
        computed: {
            ...mapState([
                'userAddress'
            ]),
        },
        components: {
            addressInfo
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    @font-face {
        font-family: 'iconfont';  /* project id 519918 */
        src: url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.eot');
        src: url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.woff') format('woff'),
        url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.svg#iconfont') format('svg');
    }

    .icon-shop {
        font-family: iconfont;
    }

    .main {
        .page-view(100);
        .loc {
            margin-top: .5rem;
            background: #ffffff;
            display: flex;
            text-align: left;
            padding: .1rem .1rem;
            justify-content: space-between;
            align-items: center;
            .loc-info {
                flex: 1;
                padding: 0 .1rem;
                div {
                    font-size: .14rem;
                }
                div:first-child {

                }
                div:last-child {
                    color: #666;
                }
            }
        }
        .shop {
            background: #ffffff;
            margin-top: .08rem;
            .shop-title {
                padding: .08rem .12rem;
                text-align: left;
                font-size: .14rem;
            }
            .list-main {
                display: flex;
                justify-content: space-between;
                padding: .12rem;
                .main-left {
                    display: flex;
                    align-items: flex-start;
                    width: 82%;
                    text-align: left;
                    img {
                        width: .6rem;
                        height: .6rem;
                    }
                    > div {
                        display: flex;
                        flex-direction: column;
                        text-align: left;
                        margin-left: .1rem;
                        span {
                            font-size: .14rem;
                        }
                        div {
                            margin-top: .04rem;
                            font-size: .14rem;
                        }
                    }
                }
                .main-right {
                    color: #666;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    font-size: .12rem;
                    text-align: right;
                    div {
                        width: 100%;
                        font-size: .12rem;
                    }
                    > div:last-child {
                        margin-top: .04rem;
                        text-align: right;
                    }
                }
            }
        }
        .list {
            margin-top: .1rem;
            background: #ffffff;
            .list-item {
                display: flex;
                justify-content: space-between;
                padding: .1rem;
                border-bottom: 1px solid #f7f7f7;
                div {
                    font-size: .14rem;
                }
            }
        }
        .btns {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: .45rem;
            line-height: .45rem;
            background: #ffffff;
            div:first-child {
                width: 70%;
                float: left;
                text-align: left;
                text-indent: 1em;
                font-size: .14rem;
                span {
                    font-size: .14rem;
                }
            }
            div:last-child {
                float: left;
                background: #F14748;
                color: #ffffff;
                text-align: center;
                width: 30%;
                font-size: .14rem;
            }
        }
    }

</style>
