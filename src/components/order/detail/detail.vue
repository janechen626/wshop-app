<template>
    <div class="page" style="background: #f7f7f7;">
        <mt-header title="订单详情" fixed>
            <router-link to="/order" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <t-toplist :order="order"></t-toplist>
            <t-location :address="address"></t-location>
            <t-shop :res="res" :shop="shop"></t-shop>
            <t-list :order="order"></t-list>
            <t-info :order="order"></t-info>
        </div>
        <div class="fix">
            <div v-if="order.status==0" class="act" @click="cancel(order.id,order.status)">取消订单</div>
            <router-link :to="{name:'pay',query:{id:order.id,type:'order'}}" v-if="order.status==0" tag="div">支付订单
            </router-link>
            <div v-if="order.status==2" @click="confirm(order.id)">确认收货</div>
            <div v-if="order.status==3" @click="del(order.id,order.status)">删除订单</div>
        </div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import order from './../../../assets/mixins/order'
    import tToplist from './toplist.vue'
    import tLocation from './location.vue'
    import tShop from './shop.vue'
    import tList from './list.vue'
    import tInfo from './info.vue'

    export default {
        data() {
            return {
                res: {},
                order: {},
                carrier: {},
                shop: {},
                goods: [],
                address: {},
                url: 'order.op',
            }
        },
        mixins: [order],
        methods: {
            getOrderDetail(){
                let that = this;
                util.request({
                    url: 'order.detail',
                    method: 'get',
                    data: {
                        id: that.$route.query.id,
                    },
                    success: function (res) {
                        console.log(res);
                        that.res = res.data;
                        that.order = res.data.order;
                        that.goods = res.data.goods;
                        that.carrier = res.data.carrier;
                        that.address = res.data.address;
                        that.shop = res.data.shop;
                    },
                    error: function (error) {
                        console.log(error)
                    },
                    complete: function () {

                    }
                })
            },
        },
        mounted () {
            this.getOrderDetail();
        },
        components: {
            tToplist,
            tLocation,
            tShop,
            tList,
            tInfo
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    .page {
        .page-view(1);
        .fix {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: .4rem;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .act {
                background: #ffffff !important;
                border: 1px solid #EF4F4F !important;
                color: #EF4F4F !important;
            }
            div {
                min-width: .6rem;
                background: #EF4F4F;
                color: #ffffff;
                padding: .04rem .06rem;
                border-radius: .04rem;
                margin-right: .12rem;
            }
        }
        .container {
            .scroll-view(100%);
            background: #f7f7f7;
            .header-height;
        }
    }
</style>