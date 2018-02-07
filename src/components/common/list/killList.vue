<template>
  <ul>
    <li class="item" @click="tap(v.id)" v-for="(v,i) in item" :key="i">
        <img :src="v.thumb"/>
        <div class="price">￥{{v.price}}</div>
        <div class="m-price">￥{{v.marketprice}}</div>
    </li>
  </ul>
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
        type: Array,
        required: true
      },
    },
    methods: {
      tap (id) {
        this.$router.push({name: 'product',query:{id:id}})
      }
    }
  }
</script>

<style lang="less" scoped="">
  @import '../../../assets/less/index.less';
  ul{
      display: flex;
      flex-wrap: wrap;
      .item{
        display: flex;
        flex-direction: column;
        padding: .05rem;
        width: 25%;
        text-align: center;
        img{
            width: 100%;
            height: .8rem;
            margin-bottom: .1rem;
        }
        .price{
            color: @themeColor;
            font-size: .16rem;
        }
        .m-price{
            font-size: 0.12rem;
            text-decoration: line-through;
        }
    }
  }
</style>
