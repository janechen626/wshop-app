<template>
    <div class="main">
        <mt-header title="参与记录" fixed>
            <router-link to="/integralIndex" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <div class="title">我的{{credit.creditname}}：{{credit.credit}}</div>
            <t-list :list="list" :loading="loading" @loadmore="loadList"></t-list>
        </div>   
    </div>
</template>

<script>
    import util from '../../../api/util'
    import list from './../../../assets/mixins/list'
    import tList from './list'
    export default {
        data() {
            return {
                list:[],
                loading:false,
                credit:{}
            }
        },
        mixins:[list],
        methods: {
            getLog(){
                let params = {
                    url: 'creditshop.creditlog',
                    opt: {}
                }

                this.getList(params).then((res) => {
                    this.list = this.list;
                    this.credit =  res.data.credit;
                })

            },
            loadList(){
                let params = {
                    url: 'creditshop.creditlog',
                    opt: {}
                }
                this.loadMore(params)
            },
        },
        components:{
            tList
        },
        mounted(){
            this.getLog();
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(100);
        .container{
            .scroll-view(100%);
            .title{
                position: fixed;
                top:.4rem;
                left:0;
                height: .4rem;
                line-height: .4rem;
                padding: 0 .1rem;
                font-size: 14px;
                background: #fff;
                width: 100%;
                text-align: left;
            }
        }
        
    }

</style>