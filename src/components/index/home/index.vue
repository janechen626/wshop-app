<template>
  <div class="page">
    <div class="container">
      <div v-for="(v,i) in homeContent" :key="i">
        <!-- 首页顶部搜索 -->
        <t-search v-if="v.visible == 1 && v.type == 'search'"></t-search>
        <!-- 幻灯片 -->
        <banner v-if="v.visible == 1 && v.type == 'adv'" :slider="v.data"></banner>
        <!-- 公告栏 -->
        <tip v-if="v.visible == 1 && v.type == 'notice'" :tip="v.data"></tip>
        <!-- 导航栏 -->
        <nav-list v-if="v.visible == 1 && v.type == 'nav'" :nav="v.data" jumpTo="list"></nav-list>
        <!-- 秒杀 -->
        <sec-kill v-if="v.visible == 1 && v.type == 'seckill'" :obj="v.data"></sec-kill>
        <!-- 为您推荐 -->
        <recom-goods v-if="v.visible == 1 && v.type == 'recommand'" :title="v.text" :obj="v.data" ></recom-goods>
      </div>
      <!-- 店铺推荐 -->
      <recom-shops :title="recomShopString" :obj="list" :loading="loading" @loadmore="loadrecom"></recom-shops>
    </div>
    <v-tabbar></v-tabbar>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import util from './../../../api/util'
  import list from './../../../assets/mixins/list'
  import Banner from './banner'
  import navList from './nav'
  import tSearch from './search'
  import secKill from './seckill'
  import tip from './tip'
  import recomGoods from './recom-goods'
  import recomShops from './recom-shops'
  import vTabbar from '../../common/Tabbar/Tabbar'
  import {Indicator} from 'mint-ui';

  export default {
    data () {
      return {
        slider:{},
        nav:{},
        recomgoods:[],
        recomgoodsString:'',
        homeContent:[],
        recomshops:[],
        recomShopString:'店铺推荐'
      }
    },
    mixins: [list],
    methods: {
      getHome(){
        let _this = this;
        util.request({
          url: 'shop.get_shopindex',
          data: {},
          method: 'get',
          success(res){
            _this.homeContent = res.data.sorts;
          }
        })
      },
      getShops(){
        let params = {
          url: 'shop.get_recommand',
          opt: {}
        }
        this.getList(params)
//        this.getList(params).then((res) => {
//          this.recomshops = this.activityList;
//        })
      },
      loadrecom(){
          let params = {
              url: 'shop.get_recommand',
              opt: {}
          }
          this.loadMore(params)
      },
    },
    mounted () {

      this.getHome();
      this.getShops();

    },
    components: {
      Banner,
      navList,
      recomGoods,
      vTabbar,
      tSearch,
      recomShops,
      secKill,
      tip
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/less/common.less';
  .page {
    background: #f7f7f8 !important;
    .page-view(1);
    .container {
      .scroll-view(100%)
    }
  }

</style>
