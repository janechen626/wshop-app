<template>
    <div class="main">
        <mt-header title="全部分类" fixed></mt-header>
        <search ref="search" @submit="search"></search>
        <div class="container">
            <goods-list :item="list" :loading="loading" @loadmore="loadList"></goods-list>
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
    import search from '../../common/base/search.vue'
    import goodsList from './goodsList'
    import style from './../../../assets/mixins/style'
    export default {
        data() {
            return {
                id:'',
            }
        },
        mixins:[list,style],
        methods: {
            init(){
                let _this=this
                _this.id = _this.$route.query.id;
//                _this.keyword= _this.$route.query.keywords
                let params={
                    url:'creditshop.lists',
                    opt:{
                        cateid:  _this.id,
                        keywords:_this.$refs.search.keywords,
                    }
                }
                this.listInit().then(this.getList(params))
            },
            loadList(){
                let _this=this
                let params={
                    url:'creditshop.lists',
                    opt:{
                        cateid: _this.id,
                        keywords:_this.$refs.search.keywords,
                    }
                }
                this.loadMore(params)
            },
            search(key){
                let params={
                    url:'creditshop.lists',
                    opt:{
                        cateid: '',
                        keywords:key,
                    }
                }
                this.id=''
//                this.keywords=key
                this.listInit().then(this.getList(params))
            }
        },
        mounted(){
            this.init()
        },
        // beforeRouteUpdate(to, from, next){
        //     let _this = this
        //     if(from.name==='isearch'){
        //         _this.keyword= from.query.keywords
        //         _this.init()
        //     }
        //     next()
        // },
        components:{
            vTabbar,
            search,
            goodsList
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    input::-webkit-input-placeholder {
        color: red !important;
    }
    .main {
        .page-view(100);
        .search-bar {
           margin-top: .5rem;
        }
        .search {
            position: fixed;
            width: 100%;
            z-index: 100;
            height: .4rem;
            background-color: #fff;
            display:flex;
            /*position:relative;*/
            padding:.08rem .1rem;
            font-size:12px;
            align-items:center;
            .btn {
                width:.44rem;
                height:.29rem;
                line-height:.29rem;
                font-size:.12rem;
                padding:0;
                margin:0;
            }
            input {
                flex: 1;
                display: block;
                padding: 0 .3rem;
                border-radius: .05rem;
            }
            .iconfont {
                position: absolute;
                left: .2rem;
                top:.13rem;
            }
        }
        .container {
            .scroll-view(100%);
            padding-bottom:1rem;
        }
    }

</style>
