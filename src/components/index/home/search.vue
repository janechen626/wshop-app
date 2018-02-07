<template>
  <div class="search-bar" @click="go">
    <div class="iconfont search">&#xe651;</div>
    <div class="text">输入关键字进行搜索</div>
  </div>
</template>

<script>
  export default {
    props: {
      name:{
          type:String
      }
    },
    mounted () {

    },
    methods: {
      go(){
        if(this.$route.name == 'integralType'){
            this.$router.push({name:'isearch'})
        }else {
            this.$router.push({name:'search'})
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '../../../assets/less/index.less';
  .search-bar{
    display: flex;
    align-items: center;
    width: 94%;
    margin: 0.06rem auto;
    background: #fff;
    padding:.04rem;
    border-radius: 5px;
    border:1px solid #E6E6EA;
    .search{
      font-size: 0.18rem;
      margin-right: .05rem;
    }
    .text{
      font-size: 0.12rem;
    }
  }
</style>
