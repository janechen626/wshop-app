<template>
    <div class="main">
        <mt-header title="优惠券" fixed>
            <router-link to="/userCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <top-bar :list="cates" @change="init"></top-bar>
            <list-view :loading="loading" @loadMore="loadList">
                <item :item="list"></item>
            </list-view>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import list from './../../../assets/mixins/list'
    // import topBar from '@/components/common/Tabbar/TopBar'
    import topBar from './topbar'
    import listView from '@/components/common/view/listView'
    import item from './item'

    export default {
        data() {
            return {
                cates:[],//tab
                cate:0,
            }
        },
        mixins: [list],
        methods: {
            getCate(){
                let _this = this;
                util.request({
                    url: 'sale.coupon.getCouponCate',
                    data:{},
                    method:'get',
                    success(res){
                        _this.cates=res.data.list
                    }
                })
            },
            loadList() {
                let params = {
                    url: 'sale.coupon.getlist',
                    cate:this.cate
                }
                this.loadMore(params)
            },
            init(status) {
                this.cate = status;
                let params={
                    url: 'sale.coupon.getlist',
                    opt: {
                        cate:this.cate
                    }   
                }
                this.listInit().then(this.scrollTop('.container')).then(this.getList(params));

            },
        },
        components: {
            topBar,
            listView,
            item
        },
        mounted() {
            this.getCate();
            this.init(0);  
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
        }
    }
</style>