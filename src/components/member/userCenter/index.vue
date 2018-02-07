<!--个人中心-->
<template>
    <div class="main">
        <div class="container">
            <v-header :info="member"></v-header>
            <user-order :statics="statics"></user-order>
            <ul class="list">
                <list-cell v-for="(i,index) in item" :info="i" :key="index"></list-cell>
            </ul>
            <div class="but" @click="outLogin">
                <button>退出登录</button>
            </div>
        </div>
        <v-tabbar></v-tabbar>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>

</template>

<script>
    import util from '../../../api/util'
    import vTabbar from '../../common/Tabbar/Tabbar'
    import vHeader from './Header.vue'
    import { MessageBox } from 'mint-ui'
    import userOrder from './userOrder.vue'
    import listCell from './listCell.vue'
    import {_webapp} from '../../../config/hook'

    export default {
        data() {
            return {
                member: {},
                statics: {},
                item: [
                    /*{
                        icon: '&#xe681;',
                        text: '分销中心',
                        right: '&#xe61b;',
                        router: 'distribution',
                        query: '',
                    },*/
                    {
                        icon: '&#xe680;',
                        text: '领取优惠券',
                        right: '&#xe61b;',
                        router: 'coupon',
                        query: '',
                    },
                    {
                        icon: '&#xe680;',
                        text: '我的优惠券',
                        right: '&#xe61b;',
                        router: 'couponList',
                        query: '',
                    },
                    {
                        icon: '&#xe636;',
                        text: '收货地址管理',
                        right: '&#xe61b;',
                        router: 'address',
                        query: '',
                    },
                    {
                        icon: '&#xe613;',
                        text: '我的收藏',
                        right: '&#xe61b;',
                        router: 'favorite',
                        query: '',
                    },
                    {
                        icon: '&#xe682;',
                        text: '我的足迹',
                        right: '&#xe61b;',
                        router: 'history',
                        query: '',
                    }
                ]
            }
        },
        methods: {
            init() {
                let that = this;
                util.request({
                    url: 'member',
                    method: 'get',
                    data: {},
                    success: function (res) {
                        that.member = res.data;
                        that.statics = res.data.statics
                        if(res.data.commission ===true){
//                            that.$set(that.item,
                            let o={
                                icon: '&#xe681;',
                                text: '分销中心',
                                right: '&#xe61b;',
                                router: 'distribution',
                                query: '',
                            }

                            that.item.unshift(o)
                            console.log(that.item)
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    },
                    complete: function () {

                    }
                })
            },
            outLogin() {
                MessageBox({
                    title: "确认退出当前账号?",
                    message: "点击确认退出",
                    showCancelButton: true
                }).then(action => {
                    if (action == "confirm") {
                        _webapp.nativeLogin();
                    } else if (action === "cancel") {
                        //表示点击了取消
                    }
                });
            }
        },
        beforeRouteUpdate(to, from, next){
            let _this=this
            if(from.name==='userInfo'){
                _this.init();
            }
            next()
        },
        mounted() {
            this.init();
        },
        components: {
            vTabbar,
            vHeader,
            userOrder,
            listCell
        },

    }
</script>
<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    .main {
        .page-view(1);
        .container {
            background: #f7f7f7;
            .scroll-view(100%);
            .list {
                width: 100%;
                background: #f7f7f7;
            }
            .but {
                display: block;
                margin-top: 0.10rem;
                margin-bottom: .6rem;
                height: .48rem;
                width: 100%;
                line-height: .48rem;
                background-color: #fff;
                border-top: 1px solid #efeff4;
                outline: none;
                font-size: 0.16rem;
                color: rgba(0, 0, 0, .5);
                button {
                    padding: 0;
                    margin: 0;
                    list-style: none;
                    font-style: normal;
                    text-decoration: none;
                    background-color: #fff;
                    border: none;
                    color: rgba(0, 0, 0, .5);
                    font-weight: normal;
                    font-family: "Microsoft Yahei";
                    box-sizing: border-box;
                    -webkit-tap-highlight-color: transparent;
                    -webkit-font-smoothing: antialiased;
                }
            }
        }
    }
</style>