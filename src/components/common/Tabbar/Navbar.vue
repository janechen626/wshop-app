<template>
  <div class="nav-bar">
    <div class="nav-tab" v-for="(i,index) in list" :key="index" @click="navTo(i)">
      <span class="iconfont" v-html="i.icon"></span>
      {{i.title}}<i v-if="i.context">{{i.context}}</i>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      list:{
        type: Array,
        required: true
      },
      jumpTo:{
        type:String,
      },
    },
    methods:{
      navTo(i){
        console.log(i)
        this.$router.push({name:i.route,query:i.query})

      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/less/index.less';
  .nav-bar {
    display: flex;
    width: 100%;
    background-color: @background; //真`白色
    margin-bottom: .1rem;
    .nav-tab {
      flex: 1;
      height: .45rem;
      text-align: center;
      line-height: .45rem;
      i {
        color:#d84e44;
        font-size: .1rem;
      }
    }
    .active {

    }



  }
</style>
