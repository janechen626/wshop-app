<template>
  <div class="page">
    <header class="header">
      <form @submit="goList()">
        <input type="text" v-model="find" :placeholder="placeholder"/>
      </form>
      <span class="iconfont abs">&#xe651;</span>
      <div class="cancel" @click="cancel">取消</div>
    </header>
    <div class="container">
      <ul v-if="list.length">
          <li v-for="(v, k) in list" :key="k" @click="goInfo(v.id)">
            {{v.title}}
          </li>
      </ul>
      <search-void v-else></search-void>

    </div>

  </div>
</template>
<script>
  import searchVoid from './searchVoid'
  import util from '../../../api/util'
  import list from './../../../assets/mixins/list'
  import { mapMutations, mapGetters } from 'vuex'
  import _ from 'lodash'
  export default {
    data(){
      return {
        find: '',
        list:[],
        placeholder:'请输入关键字'
      }
    },
    mixins: [list],
    methods: {
      goList(){
        if(this.$route.name=='isearch'){
            // this.$router.query.keyword=this.find
            // this.$router.go(-1)
            this.$router.replace({name:'integralType',query:{keywords:this.find}})
        }else {
            this.$router.replace({name:'lists',query:{keywords:this.find}})
        }

      }, //回车跳转
      cancel(){
        this.$router.go(-1)
      }, //取消搜索
     getSearch: _.debounce(function (value) {
        let url = '';
        if(this.$route.name=='isearch'){
            url =  'creditshop.lists'
        }else{
            url = 'goods.get_list'
        }
        let params = {
          url: url,
          opt: {
            keywords :this.find
          }
        }
        this.getList(params);

     }, 200),  //根据关键字搜索
      goInfo(v){
        this.find='';
        this.$router.replace({name:'product',query:{id:v}})
      },
    },
    watch: {
      find(newValue){
        this.getSearch(newValue)
      }
    },
    components: {
      searchVoid
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/less/index.less';

  .page {
    .page-view(1);
  }

  header {
    width: 100%;
    padding: 0 .08rem;
    display: flex;
    position: fixed;
    form {
      flex: 1;
      display: block;
      height: 100%;
      input {
        display: block;
        width: 100%;
        text-align: center;
        background: #e8e8e8;
        height: .29rem;
        font-size: .13rem;
        padding: 0 0.2rem;
        color: #333;
        margin: .08rem 0;
        border-radius: .1rem .1rem .1rem .1rem;
      }
    };
    .cancel {
      font-size: .16rem;
      text-align: right;
      padding: 0 .1rem;
      line-height: .45rem;
    }
    .abs {
      position: absolute;
      top: .15rem;
      left: .2rem;
    }
  }
  .container {
    margin-top: .45rem;
    background: #ececec;
    .scroll-view(100%);
    ul {
      width: 100%;
      margin-top: .1rem;
      li {
        padding: .1rem .1rem .1rem .2rem;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        background: #fff;
        font-size: .13rem;
        text-align: left;
        span {
          color: #5f5f5f;
          font-size: .14rem;
          .text-overflow(1)
        }
      }
    }
  }



</style>
