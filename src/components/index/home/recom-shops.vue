<template>
  <section>
    <!-- <header>{{obj.text}}</header> -->
    <t-title :title="title"></t-title>
    <ul class="shops" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <block :item="obj" jumpTo=""></block>
    </ul>
  </section>
</template>

<script>
  import Block from '../../common/list/RowList.vue'
  import tTitle from './top-title.vue'
  export default {
    props: {
      obj: {
        type: Array,
        required: true
      },
      title:{
        type:String
      },
      loading: {
        type: Boolean,
        required: true
      }
    },
    methods: {
        loadMore(){
            console.log('goodList LoadMore')
            this.$emit('loadmore')
        }
    },
    mounted () {

    },
    components: {
      Block,
      tTitle
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../assets/less/common.less';
  ul.shops{
    display: flex;
    margin: 0;
    padding: 0;
    background: #fff;
    margin-bottom: .6rem;
    flex-wrap: wrap;
  }
</style>
