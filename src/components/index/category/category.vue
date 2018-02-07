<template>
    <div class="page">
        <mt-header title="全部分类" fixed></mt-header>
        <t-search></t-search>
        <div class="container">
            <ul class="list-l">
                <li :class="['l-item',{tabActive: selected==-1 }]" @click="tab(-1)" >
                    全部商品
                </li>
                <li :class="['l-item',{tabActive: selected==index }]" @click="tab(index)" v-for="(i,index) in list" :key="index">
                    {{i.name}}
                </li>
            </ul>
            <div class="right">
                <div class="adv">
                    <img :src="adv"/>
                </div>
                <div class="list-r">
                    <router-link :to="{name:'lists'}" class="r-item" v-if="selected== -1"  tag="div">
                        <div class="iconfont">&#xe669;</div>
                        <span>全部商品</span>
                    </router-link>
                    <template v-for="(i,index) in list">
                        <router-link :to="{name:'lists',query:{cate:s.id}}" class="r-item" v-if="selected== index" v-for=" (s,idx) in i.child" :key="idx" tag="div">
                            <img :src="s.thumb">
                            <span>{{s.name}}</span>
                        </router-link>
                    </template>
                </div>
            </div>

        </div>
        <v-tabbar ref="tabbar"></v-tabbar>
        <router-view/>

    </div>
</template>

<script>
    import util from './../../../api/util'
    import list from './../../../assets/mixins/list'
    import vTabbar from '../../common/Tabbar/Tabbar'
    import tSearch from './../home/search'

    export default {
        data() {
            return {
                list: [],
                adv: '',
                selected: -1
            }
        },
        mixins:[list],
        methods: {
            init() {
                let _this = this;
                util.request({
                    url: 'shop.get_category',
                    data: {},
                    method: 'get',
                    success(res) {
                        _this.list = res.data.category;
                        _this.adv = res.data.set.advimg;
                        //存储默认的广告主图
                        _this.advDef = res.data.set.advimg;
                    },
                    error(res) {

                    }
                })
            },
            tab(i){
                this.selected=i
                if(i== -1){
                    this.adv = this.advDef;
                }else{
                    this.adv = this.list[i].advimg;
                }
            }
        },
        mounted() {
            this.init()
        },
        components: {
            vTabbar,
            tSearch
        }

    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .page {
        .page-view(1);
        .mint-header.is-fixed{
            border-bottom: none;
        }
        .search-bar{
            margin-top: .45rem;
            width: 96%;
            background: #f7f7f7;
        }
        .container {
            .scroll-view(100%);
            display: flex;
            .list-l {
                .scroll-view(100%);
                background: #f7f7f7!important;
                width: .85rem;
                .l-item {
                    width: 100%;
                    overflow: hidden;
                    padding: .1rem 0;
                    font-size: .14rem;
                    color: #666;
                    position: relative;
                    border-left: .03rem solid #f7f7f7;
                }
                .tabActive {
                    border-left: .03rem solid @themeColor;
                    background: #fff;
                }
            }
            .right {
                .scroll-view(100%);
                flex: 1;
                box-sizing: border-box;
                padding: .1rem;
                .adv {
                    width: 100%;
                    height: .93rem;
                    img {
                        .imgfull(0)
                    }
                }
                .list-r {
                    position: relative;
                    display: flex;
                    flex-wrap: wrap;
                    overflow: hidden;
                    background: #fff;
                    margin-top: .1rem;
                    .r-item {
                        width: 33.3%;
                        height: .86rem;
                        position: relative;
                        padding: .125rem 0;
                        text-align: center;
                        transition: background-color 300ms;
                        -webkit-transition: background-color 300ms;
                        img {
                            width: .38rem;
                            height: .38rem;
                        }
                        span {
                            font-size: .12rem;
                            text-align: center;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            padding: .04rem 0;
                            margin: 0 auto;
                            width: 57%;
                            color: #7a7a7a;
                            .text-overflow(1)
                        }
                    }
                }
            }

        }
    }
</style>
