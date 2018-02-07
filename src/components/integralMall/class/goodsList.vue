<template>
    <tip :tip="tips">
    <ul v-if="item.length" class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <!--<block v-if="type==0" v-for="(i,index) in item" :item="i" jumpTo="" :key="index"></block>-->
        <integral  v-for="(i,index) in item" :item="i" jumpTo="" :key="index"></integral>
    </ul>
    </tip>

</template>

<script>
    import InfiniteScroll from 'mint-ui'
    import ColList from '../../common/list/ColList.vue'
    import integral from '../../common/list/Integral.vue'
    import Tip from '../../common/base/Tip.vue'
    export default {
        data(){
            return {
                tips: {
                    logo: '',
                    title: '暂无商品',
                    btn:''
                }
            }
        },
        props: {
            item : {
                type: Array,
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
            integral,
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
        font-size: 14px;
    }
</style>