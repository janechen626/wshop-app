<template>
    <div class="main">
        <mt-header title="我的下线" fixed>
            <router-link to="/distribution" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <top-bar :list="nav" @change="getLevel"></top-bar>
        <p class="title">成员信息</p>
        <div class="container">
            <list-view :loading="loading" @loadMore="loadList">
                <item :item="v" v-for="(v,i) in list" :key="i" :setInfo="setInfo"></item>
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
                nav:[
                    {
                        title:'一级',
                        status:'1'
                    },
                    {
                        title:'二级',
                        status:'2'
                    },
                    {
                        title:'三级',
                        status:'3'
                    }
                ],
                level:1,
                setInfo:{},
                levelsInfo:{}
            }
        },
        mixins:[list],
        methods: {
            loadList(){
                let params={
                    url: 'commission.down.get_list',
                    opt: {
                        level:this.level
                    }
                }
                this.loadMore(params)
            },
            getParter(){
                let params={
                    url: 'commission.down.get_list',
                    opt: {
                        level:this.level
                    }
                }
                this.listInit().then(this.scrollTop('.container')).then(this.getList(params));
            },
            getLevel(i){
                this.level = i;
                this.getParter();
            },
            getSet(){
                let _this = this;
                util.request({
                    url: 'commission.down.get_set',
                    data: {},
                    method: 'get',
                    success(res){
                        _this.setInfo = res.data;
                        _this.levelsInfo = res.data.levels;
                    }
                })
            }
        },
        components:{
            topBar,
            listView,
            item
        },
        mounted(){
            this.getSet();
            this.getParter();
        },
        created(){

        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/common.less';
    /*.main {
        .page-view(100);
        .container {
            .scroll-view(100%);
            .header-height;
            .title{
                border-bottom: @border;
                text-align: left;
                padding: .1rem;
                font-size: .14rem;
            }
        }
    }
*/

    .main {
        .page-view(100);
        .container {
            .scroll-view(100%);
            .header-height;
            padding-top: 1.26rem;

        }
        .title-tab {
            position: fixed;
            top:.4rem;
            width: 100%;
            background-color: #fff;
            z-index: 111;
        }
        .title{
            border-bottom: @border;
            text-align: left;
            padding: .1rem;
            font-size: .14rem;
            width: 100%;
            position: fixed;
            top:.86rem;
            z-index: 111;
            background: #fff;
        }
    }


</style>