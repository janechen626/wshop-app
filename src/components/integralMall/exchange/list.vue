<template>
<div class="ct">
    <ul v-infinite-scroll="loadList" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="(v,i) in list" :key="i">
            <img :src="v.thumb" alt="">
            <div class="right">
                <div><span>{{v.title}}</span><span>{{v.credit}}</span></div>
                <div><span class="time">{{v.createtime}}</span><span class="font-14">{{v.status_name}}</span></div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
  export default {
    props: {
      list:{
        type:Array,
        // required:true
      },
      loading: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        loadList(){
            this.$emit('loadmore')
        }
    },
    mounted () {
    },
    components: {
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/less/common.less';
  .ct{
      
  }
  ul{
      display: flex;
      flex-direction: column;
      margin-top: .8rem;
      li{
          background: #f7f7f7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: @border;
          padding: .1rem;
          > img{
              width: .5rem;
              height: .5rem;
              margin-right: .1rem;
          }
          .right{
              display: flex;
              flex: 1;
              flex-direction: column;
              >div{
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .time{
                      font-size: 12px;
                  }
                  .font-14{
                      font-size: 14px;
                  }
              }
          }
      }
  }
</style>
