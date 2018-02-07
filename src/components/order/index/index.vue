<template>
    <div class="page" style="background: #f7f7f7;">
        <mt-header title="订单列表" >
            <router-link to="/userCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!--tab导航栏-->
        <t-tab :select="select" @change="status"></t-tab>
        <div class="container">
            <!--tab列表-->
            <t-tablist :list="list" :loading="loading" @loadmore="loadorder" @cancel="cancel" @confirm="confirm" @remind="remind" @del="del">
            </t-tablist>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import list from './../../../assets/mixins/list'
    import order from './../../../assets/mixins/order'
    import tTab from './tab.vue'
    import tTablist from './tablist.vue'
    import { MessageBox,Toast } from 'mint-ui'
    export default {
        data() {
            return {
                select:'',
                url:'order.op',
            }
        },
        mixins: [list,order],
        methods: {
            status(i){
                console.log('now test',i)
                this.select=i;
                this.getOrder(i)
            },
            getOrder(status){
                let params = {
                    url: 'order.get_list',
                    opt: {
                        status: status,
                    }
                };
                this.scrollTop('.container').then(this.listInit()).then(this.getList(params))
            },
            getInitOrder(s){
                console.log('订单',s)
                this.select=s;
                let params = {
                    url: 'order.get_list',
                    opt: {
                        status: s,
                    }
                };
                this.scrollTop('.container').then(this.listInit()).then(this.getList(params))
            },
            loadorder(){
                let _this=this;
                let params = {
                    url: 'order.get_list',
                    opt: {
                        status: _this.select,
                    }
                };
                this.loadMore(params)
            }
        },
        beforeRouteUpdate(to, from, next){
            let _this = this
            if (from.query.stal===0) {
                this.getInitOrder(from.query.a);
            }
            next()
        },
        mounted () {
            this.getInitOrder(this.$route.query.status);
        },
        activated() {
            this.getInitOrder(this.$route.query.status);
        },

        components: {
            tTab,
            tTablist,
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .page {
        .page-view(1);
        .container {
            .scroll-view(100%);
            background: #f7f7f7;
//            .header-height;
        }
    }
</style>