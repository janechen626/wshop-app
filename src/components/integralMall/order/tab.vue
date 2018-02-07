<template>
    <div class="tab">
        <div class="tab-list" :class="{'active': select== 0 }" @click="tab(0)">全部记录</div>
        <div class="tab-list" :class="{'active': select== 1 }" @click="tab(1)">退换记录</div>
        <div class="tab-list" :class="{'active': select== 2}" @click="tab(2)">中奖记录</div>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        props: {
            select: {
                type: Number,
                required: true
            },
        },
        mounted () {

        },
        methods:{
            tab(i) {
                this.$emit('change',i)
            }
        },
        components: {
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .tab{
        .page-view(100);
        margin-top:0.4rem;
        display: flex;
        height: .46rem;
        justify-content: space-around;
        border-bottom: @border;
        background: #ffffff;
        .active{
            color: @themeColor;
            border-bottom: 2px solid @themeColor;
        }
        .tab-list{
            display: flex;
            width: 20%;
            justify-content: center;
            align-items: center;
            font-size: 14px;
        }
    }
</style>
