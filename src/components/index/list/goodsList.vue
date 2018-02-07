<template>
    <tip :tip="tips">
    <ul v-if="item.length" class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <col-list v-if="type==1" v-for="(i,index) in item" :item="i" jumpTo="" :key="index"></col-list>
        <block v-if="type==0" v-for="(i,index) in item" :item="i" jumpTo="" :key="index"></block>
    </ul>
    </tip>
</template>

<script>
    import InfiniteScroll from 'mint-ui'
    import ColList from './../../common/list/ColList.vue'
    import Block from './../../common/list/Block.vue'
    import Tip from '../../common/base/Tip.vue'
    import defaultImg from '../../../assets/images/good-tip.png'
    export default {
        data(){
            return {
                tips:{
                    img: defaultImg,
                    title: '暂时没有商品哦！',
                    btn:''
                }
            }
        },
        props: {
            item : {
                type: Array,
                required: true
            },
            type: {
                type: Number,
                required: true
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
        components: {
            ColList,
            Block,
            Tip
        },
        mounted(){
            console.log('搜索结果列表',this.item)
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/common.less';
    .list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    .no-data{
        margin-top: 1.6rem;
        color: #999;
        font-size: .14rem;
    }
</style>