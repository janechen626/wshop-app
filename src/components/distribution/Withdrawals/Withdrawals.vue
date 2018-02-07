<template>
    <div class="main">
        <mt-header title="提现记录" fixed>
            <router-link to="/distribution" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <top-bar :list="nav" @change="init"></top-bar>
            <list-view :loading="loading" @loadMore="loadList">
                <with-item v-for="(i,index) in list" :item="i" :key="index" :text="res"></with-item>
            </list-view>
        </div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import list from './../../../assets/mixins/list'
    import topBar from '@/components/common/Tabbar/TopBar'
    import listView from '@/components/common/view/listView'
    import withItem from '@/components/distribution/Withdrawals/item.vue'
    export default {
        data() {
            return {
                nav:[
                    {
                        title:'所有',
                        status:''
                    },
                    {
                        title:'待审核',
                        status:1
                    },
                    {
                        title:'待打款',
                        status:2
                    },
                    {
                        title:'已打款',
                        status:3
                    },
                    {
                        title:'无效',
                        status:4
                    }
                ],
                res:{},
                idx:''
            }
        },
        mixins:[list],
        methods: {
            loadList(){
                let params={
                    url:'commission.log.get_list',
                    opt:{
                        status:this.idx
                    }
                }
                this.loadMore(params)
            },
            init(i){
                this.idx = i;
                let params={
                    url:'commission.log.get_list',
                    opt:{
                        status:i
                    }
                }
                this.listInit().then(this.scrollTop('.container')).then(this.getList(params).then(res=>{
                    this.res=res.data
                }))
            }

        },
        components:{
            topBar,
            listView,
            withItem
        },
        mounted(){
            this.init();
        },
        created(){

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