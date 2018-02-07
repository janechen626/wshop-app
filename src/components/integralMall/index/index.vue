<template>
    <div class="main">
        <mt-header title="积分商城" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <banner :slider="res.advs"></banner>
            <nav-bar :list="navlist"></nav-bar>
            <nav-list :nav="res.category" jumpTo="integralType"></nav-list>
            <v-view :obj="res.balances"></v-view>
            <v-view :obj="res.exchanges"></v-view>
            <v-view :obj="res.coupons"></v-view>
            <v-view :obj="res.lotterydraws"></v-view>
        </div>
        <v-tabbar></v-tabbar>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import {Indicator} from 'mint-ui';
    import vTabbar from '../../common/Tabbar/IntergalBar.vue'
    import Banner from '../../index/home/banner.vue'
    import navList from '../../index/home/nav.vue'
    import NavBar from '../../common/Tabbar/Navbar.vue'
    import vView from './view.vue'

    export default {
        data() {
            return {
                res:{
                    advs:[],
                    category:[]
                },
                navlist:[
                    {
                        title:'积分',
                        icon:'&#xe630;',
                        route:'integralOrder',
                        context:'3',
                        query:''
                    },
                    {
                        title:'兑换记录',
                        route:'integralExchange',
                        icon:'&#xe630',
                        query:''
                    }
                ]
            }
        },
        prop: {},
        methods: {
            init() {
                let _this=this;
                util.request({
                    url: 'creditshop',
                    method: 'get',
                    data:{},
                    success:function (res) {
                        _this.res=res.data
                        let c={
                            title:'积分：',
                            icon:'&#xe630;',
                            route:'integralOrder',
                            context:res.data.credit.credit,
                            query:''
                        }
                        _this.$set(_this.navlist,0,c)
                        console.log(res.data)
                    },
                    error:function (error) {
                        
                    }
                })
            }
        },
        mounted(){
            this.init()
        },
        components: {
            vTabbar,
            Banner,
            navList,
            NavBar,
            vView
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    .main {
        .page-view(100);
        .container{
            .scroll-view(100%);
            .header-height;
        }

    }

</style>