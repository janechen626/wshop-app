<template>
    <div class="tab">
        <div class="tab-list" :class="{'active': select==='0'}" @click="tab('0')">全部</div>
        <div class="tab-list" :class="{'active': select==='1'}" @click="tab('1')">待付款</div>
        <div class="tab-list" :class="{'active': select==='2'}" @click="tab('2')">待发货</div>
        <div class="tab-list" :class="{'active': select==='3'}" @click="tab('3')">待收货</div>
        <div class="tab-list" :class="{'active': select==='4'}" @click="tab('4')">已完成</div>
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
//                type: String,
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
    @import '../../../assets/less/common.less';
    .tab{
        display: flex;
        height: .4rem;
        justify-content: space-between;
        border-bottom:1px solid #f7f7f7;
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
        }
    }
</style>
