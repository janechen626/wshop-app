<template>
  <li class="item" @click="tap(item.id)">
    <img :src="item.thumb"/>
    <div class="dec">
      <div class="title">{{item.title}}</div>
      <div class="price">￥{{item.minprice}}</div>
    </div>
  </li>
</template>

<script>
  import defaultAvatar from '@/assets/images/test.png'
  export default {
    data () {
      return {
        test: defaultAvatar
      }
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      jumpTo: {
        type: String,
        required: true
      },
      jumpQuery: {
        type: Object
      }
    },
    methods: {
      tap (id) {

        this.$router.push({name: 'product',query:{id:id}})
      }
    },
      mounted(){
      }
  }
</script>

<style lang="less" scoped="">
  @import '../../../assets/less/index.less';
  .item{
    display: flex;
    border-bottom: @border;
    padding: .1rem;
    img{
      width: .8rem;
      height: .8rem;
      margin-right: .1rem;
    }
    .dec{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      .title{
        font-size: 14px;
        .text-overflow(2);
        margin-bottom: .1rem;
      }
      .price{
        color: @themeColor;
        font-size: 16px;
      }
    }
  }
</style>
