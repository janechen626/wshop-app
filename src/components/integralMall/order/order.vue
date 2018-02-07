<template>
    <div class="main">
        <mt-header title="订单列表" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <!--tab导航栏-->
            <v-tab @change="tab" :select="select"></v-tab>
            <!--tab列表-->
            <v-tablist :list="list" :loading="loading" @loadmore="loadList"></v-tablist>
        </div>
        <v-tabbar></v-tabbar>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import list from './../../../assets/mixins/list'
    import vTabbar from '../../common/Tabbar/IntergalBar.vue'
    import vTab from './tab'
    import vTablist from './tablist'
    export default {
        data() {
            return {
                select : 0,
                list:[],
                loading:false,
            }
        },
        props:{

        },
        mixins: [list],
        methods: {
            tab(i){
                this.select = i;
                this.getOrder();
            },
            getOrder(){
                let params = {
                    url: 'creditshop.log',
                    opt: {
                        status: this.select,
                    }
                };
                this.listInit().then(this.getList(params))
            },
            loadList(){
                let params = {
                    url: 'creditshop.log',
                    opt: {
                        status: this.select,
                    }
                };
                this.loadMore(params)
            }
        },
        mounted(){
            this.getOrder();
        },
        components:{
            vTabbar,
            vTab,
            vTablist
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(1);
        .container{
            .scroll-view(100%);
        }
    }

</style>