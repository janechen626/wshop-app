<template>
    <router-link :to="{name:'seckill'}"  class="seckill" tag="div">
        <div class="top">
            <div class="left">
                <span class="red">{{obj.tag}}</span>
                <span>{{obj.time}}点场</span>
                <cut-down :start="obj.starttime" :end="obj.endtime"></cut-down>
            </div>
            <div class="right">更多<span class="iconfont">&#xe61b;</span></div>
        </div>
        <div class="btm">
            <kill-list :item="obj.goods"></kill-list>
        </div>
    </router-link>
</template>

<script>
    import killList from '../../common/list/killList'
    import cutDown from '../../common/base/Time'
    export default {
        props: {
            obj: {
                type: Object,
                required: true
            },
        },
        mounted () {
            
        },
        components: {
            killList,
            cutDown
        }
    }
</script>
<style lang="less" scoped>
  @import '../../../assets/less/common.less';
  .seckill{
      background: #fff;
      margin-top: .15rem;
      padding: .05rem;
      .top{
          display: flex;
          justify-content:space-between;
          padding: .05rem;
          .left{
              display: flex;
              span{
                  font-size: .16rem;
              }
              .red{
                  color: @themeColor;
              }
          }
          .right{
              font-size: .14rem;
          }
      }
  }
</style>
