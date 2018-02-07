<template>
    <div class="main">
        <mt-header title="我的优惠券" fixed>
            <router-link to="/userCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <top-bar :list="nav" @change="init"></top-bar>
            <router-link :to="{name:'coupon'}" tag="div" class="title"><span class="iconfont">&#xe6ce;</span><span>赶紧去领券中心看看更多优惠券~</span></router-link>
            <list-view :loading="loading" @loadMore="loadList">
                <item :item="v" v-for="(v,i) in list" :key="i"></item>
            </list-view>
        </div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import list from './../../../assets/mixins/list'
    import topBar from '@/components/common/Tabbar/TopBar'
    import listView from '@/components/common/view/listView'
    import item from './item'

    export default {
        data() {
            return {
                nav: [
                    {
                        title: '未使用',
                        status: '',
                        cate:''
                    },
                    {
                        title: '已使用',
                        status: 0,
                        cate:'used'
                    },
                    {
                        title: '已过期',
                        status: 1,
                        cate:'past'
                    },
                ],
                cate:'',
                info:[]
            }
        },
        mixins: [list],
        methods: {
            loadList() {
                let params = {
                    url: 'sale.coupon.my.getlist',
                    cate:this.cate
                }
                this.loadMore(params)
            },
            init(status) {
                this.cate = '';
                if(status == ''){
                    this.cate = '';
                }
                if(status === 0){
                    this.cate = 'used';
                }
                if(status === 1){
                    this.cate = 'past';
                }
                console.log('cate',this.cate);
                let params={
                    url: 'sale.coupon.my.getlist',
                    opt: {
                        cate:this.cate
                    }
                }
                this.listInit().then(this.scrollTop('.container')).then(this.getList(params));
            }
        },
        components: {
            topBar,
            listView,
            item
        },
        mounted() {
            this.init('');  
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
            .title{
                border: #333 solid 1px;
                margin: .1rem;
                padding: .08rem;
                border-radius: .05rem;
                span{
                    font-size: .15rem;
                }
                .iconfont{
                    color: #999;
                    margin-right: .03rem;
                }
            }
        }
    }
</style>