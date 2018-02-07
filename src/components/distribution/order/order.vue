<template>
    <div class="main">
        <mt-header title="分销订单" fixed>
            <router-link to="/distribution" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <top-bar :list="nav"  @change="init"></top-bar>
        <div class="container">
            <list-view :loading="loading" @loadMore="loadList">
                <item :item="i" v-for="(i,index) in list" :show="action === index" @toggle="toggle(index)" :key="index"></item>
            </list-view>
        </div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import list from './../../../assets/mixins/list'
    import topBar from '@/components/common/Tabbar/TopBar'
    import listView from '@/components/common/view/listView'
    import item from '@/components/distribution/order/item'

    export default {
        data() {
            return {
                nav: [
                    {
                        title: '所有',
                        status: ''
                    },
                    {
                        title: '待付款',
                        status: 0
                    },
                    {
                        title: '已付款',
                        status: 1
                    },
                    {
                        title: '已完成',
                        status: 3
                    }
                ],
                status: '',
                test:[
                    {
                        "id":"452",
                        "ordersn":"SH20180125170144574652",
                        "openid":"sns_wa_o4_kB0Zrc-jP_WfGSRwsxImm94GI",
                        "createtime":"2018-01-25 17:01",
                        "status":"已付款",
                        "commission":"27.60",
                        "level":"一级",
                        "order_goods":[
                            {
                                "id":"480",
                                "goodsid":"207",
                                "thumb":"https://wshop.wshoto.com/attachment/images/1/2017/12/nSaFawlgAvwSYaW2vXCF2cP2yF62wWnZ.jpg",
                                "price":"138.00",
                                "total":"1",
                                "title":"紅惑秋冬新款韩版冬季女装针织衫圆领短款长袖打底衫套头麻花毛衣",
                                "optionname":"均码+黑色",
                                "commission1":"",
                                "commission2":"",
                                "commission3":"",
                                "commissions":"",
                                "status1":"0",
                                "status2":"0",
                                "status3":"0",
                                "content1":null,
                                "content2":null,
                                "content3":null,
                                "commission":27.6
                            }
                        ]
                    },
                    {
                        "id":"452",
                        "ordersn":"SH20180125170144574652",
                        "openid":"sns_wa_o4_kB0Zrc-jP_WfGSRwsxImm94GI",
                        "createtime":"2018-01-25 17:01",
                        "status":"已付款",
                        "commission":"27.60",
                        "level":"一级",
                        "order_goods":[
                            {
                                "id":"480",
                                "goodsid":"207",
                                "thumb":"https://wshop.wshoto.com/attachment/images/1/2017/12/nSaFawlgAvwSYaW2vXCF2cP2yF62wWnZ.jpg",
                                "price":"138.00",
                                "total":"1",
                                "title":"紅惑秋冬新款韩版冬季女装针织衫圆领短款长袖打底衫套头麻花毛衣",
                                "optionname":"均码+黑色",
                                "commission1":"",
                                "commission2":"",
                                "commission3":"",
                                "commissions":"",
                                "status1":"0",
                                "status2":"0",
                                "status3":"0",
                                "content1":null,
                                "content2":null,
                                "content3":null,
                                "commission":27.6
                            }
                        ]
                    }
                ],
                action:-1
            }
        },
        mixins: [list],
        methods: {
            loadList() {
                let _this=this
                let params = {
                    url: 'commission.order.get_list',
                    opt: {
                        status: _this.status
                    }
                }
                this.loadMore(params)
            },
            init(i = '') {
                this.status = i
                let params = {
                    url: 'commission.order.get_list',
                    opt: {
                        status: i
                    }
                }
                this.listInit().then(this.scrollTop('.container')).then(this.getList(params))
            },
            toggle(i){
                this.action === i ? this.action= -1 : this.action = i
            }

        },
        components: {
            topBar,
            listView,
            item
        },
        mounted() {
            this.init()
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
            padding-top: .86rem;
        }
        .title-tab {
            position: fixed;
            top:.4rem;
            width: 100%;
            background-color: #fff;
            z-index: 111;
        }
    }
</style>