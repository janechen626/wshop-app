<template>
    <transition name="slide">
        <div class="page">
        <mt-header title="商品列表" fixed>
            <router-link to="/category" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>

        <div class="search">
            <t-search></t-search>
            <div class="iconfont type" @click="typeChoose">&#xe669;</div>
        </div>
        <div class="sort">
            <div :class="['item',{active:params.order == ''}]" @click="sort('')">综合</div>
            <div :class="['item',{active:params.order == 'sales'}]" @click="sort('sales')">销量</div>
            <div class="item">
                <span :class="{active:params.order == 'minprice'}" @click="sort('minprice')">价格</span>
                <div class="icon">
                    <span :class="['iconfont','up',{active:params.by == 'asc'}]">&#xe667;</span>
                    <span :class="['iconfont','down',{active:params.by == 'desc'}]">&#xe666;</span>
                </div>
            </div>
            <div :class="['item',{active:flg}]" @click="screenGoods"><span>筛选</span><span class="iconfont sicon">&#xe66a;</span></div>
        </div>
        <!--筛选下拉层 -->
        <screen :screenShow="screenShow" @hideScreen="hideScreen" @tab="tab" @tab2="tab2" @filter="filter" @sub="sub" @cancle="cancle" :filterBtn="params" :cateList="cateList" :selected="selected" :selected2="selected2"></screen>
        <div v-show="screenShow" class="screen-bg" @click="hideScreen"></div>

        <div class="container">
            <goods-list :item="list" :type="type" :loading="loading" @loadmore="loadList"></goods-list>   
        </div>

    </div>
    </transition>
</template>

<script>
    import { Popup,Indicator } from 'mint-ui'
    import util from '../../../api/util'
    import list from './../../../assets/mixins/list'
    import tSearch from './../home/search'
    import goodsList from './goodsList'
    import screen from './screen'

    export default {
        data() {
            return {
                type:0,
                list:[],
                selected:'',
                selected2:-1,
                params: {
                    keywords: '',
                    isrecommand: '',
                    isnew:'',
                    ishot:'',
                    isdiscount:'',
                    issendfree:'',
                    istime: '',
                    cate:'',
                    order:'',
                    by:'',
                },
                popupVisible:true,
                screenShow:false,
                cateList:[],
                flg:0,//筛选按钮是否高亮,
                noDate:0
            }
        },
        mixins: [list],
        methods: {
            init(){
               
            },
            getCate(){
                let _this = this;
                util.request({
                    url: 'shop.get_category',
                    data: {},
                    method: 'get',
                    success(res) {
                        _this.cateList = res.data.category;
                    },
                    error(res) {

                    }
                })
            },
            typeChoose(){
                this.type = this.type== 0 ? 1 :0
            },
            listFun(){
                let params = {
                    url: 'goods.get_list',
                    opt: this.params
                }
                this.listInit().then(this.scrollTop('.container')).then(this.getList(params));
            },
            goodList(){
                 
                if(this.$route.query.keywords){
                    this.params.keywords = this.$route.query.keywords;
                }
                if(this.$route.query.cate){
                    this.params.cate = this.$route.query.cate;
                }
                

                this.listFun();
            },
            sort(a){
                //综合 销售  价格 排序
                this.params.order = a;
                if(a === 'minprice'){
                   this.params.by === 'desc' ? this.params.by ='asc' : this.params.by = 'desc'
                }
                this.listFun();

            },
            tab(i,id){
                this.selected = i;
                this.params.cate = id;
            },
            tab2(i,id){
                this.selected2 = i;
                this.params.cate = id;
            },
            filter(a){
                
                if (a) {
                    var s = this.params;
                    s.hasOwnProperty(a) || (s[a] = ""), s[a] ? s[a] ="" : s[a] = 1;
                    this.params = s;
                }

                this.flg = this.params.isrecommand || this.params.isnew || this.params.ishot || this.params.isdiscount || this.params.issendfree || this.params.istime ? 1 : 0;

            },
            sub(){ //筛选
                this.listFun();
                this.hideScreen();
            },
            cancle(){
                this.params.isrecommand = this.params.isnew =this.params.ishot =this.params.isdiscount = this.params.issendfree =this.params.istime = "";
                this.params.cate = '';
                this.selected = '',
                this.selected2 = -1,
                this.listFun();
                this.hideScreen(); 
            },
            loadList(){
                console.log('loadMore')
                let params = {
                    url: 'goods.get_list',
                    opt: this.params
                }
                this.loadMore(params)
            },
            screenGoods(){
                console.log(this.screenShow)
                this.screenShow = !this.screenShow
            },
            hideScreen(){
                this.screenShow = false;
            }

        },
        mounted() {
            this.init();
            this.goodList();
            this.getCate();
            console.log(this.list)

        },
        watch: {

        },
        components: {
            tSearch,
            goodsList,
            screen
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .page {
        .page-view(1);
        .search {
            display: flex;
            margin-top: .4rem;
            background-color: #fff;
            z-index: 2;
            position: relative;
            padding: 0 0 0 10px;
            .type {
                width: .365rem;
                /*font-size: .3rem;*/
                /*line-height: .28rem;*/
                line-height: .42rem;
                font-size: .24rem;
                text-align: center;
                margin-right: .03rem;
            }
        }
        .sort {
            width: 100%;
            display: flex;
            padding:.065rem 0;
            background:#fff;
            -webkit-align-items:center;
            align-items:center;
            display:-webkit-flex;
            display:flex;
            z-index:2;
            position: relative;
            border-top: @border;
            border-bottom: @border;
            .item {
                position: relative;
                display: flex;
                -webkit-flex:1;
                flex:1;
                position:relative;
                text-align:center;
                font-size:.14rem;
                border-left:1px solid #e7e7e7;
                color:#666;
                vertical-align:middle;
                z-index: 2;
                justify-content: center;
                align-items: center;
                span {
                    font-size:.14rem;
                }
                .icon {
                    display: flex;
                    flex-direction: column;
                    height: .2rem;
                    margin-left: .02rem;
                    .active {
                        color: red;
                    }
                }
                .down {
                    position: absolute;
                    top:.07rem;
                }
                .sicon {
                    position: relative;
                    top:0.01rem;
                    left: .02rem;
                }
                .iconfont {
                    color: #666;
                }

            }
            .item:first-child{
                border-left: none;
            }
            .active {
                color: red;
            }
        }
        .screen-bg{
            position: fixed;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5)
        }
        .container {
            width: 100%;
            height: 100%;
            overflow: hidden;
            .scroll-view(100%);
            padding-bottom:1.5rem;
            
            .list {
                padding-top: 1.14rem;
                margin-top: -1.14rem;
            }
            
            
        }
    }

</style>