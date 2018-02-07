<template>
    <div class="tab">
        <div class="tab-list" :class="{'active': select===''}" @click="tab('')">全部<i></i></div>
        <div class="tab-list" :class="{'active': select==='0'}" @click="tab('0')">待付款<i></i></div>
        <div class="tab-list" :class="{'active': select==='1'}" @click="tab('1')">待发货<i></i></div>
        <div class="tab-list" :class="{'active': select==='2'}" @click="tab('2')">待收货<i></i></div>
        <div class="tab-list" :class="{'active': select==='3'}" @click="tab('3')">已完成<i></i></div>
        <div class="tab-list" :class="{'active': select==='4'}" @click="tab('4')">退换货<i></i></div>
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
        .tab-list{
            display: flex;
            width: 20%;
            justify-content: center;
            align-items: center;
            position: relative;
            font-size: .14rem;
            i{
                display: none;
            }
        }
        .active{
            color: @themeColor;
            border-bottom: 2px solid @themeColor;
            /*i{
                display: block;
                width: 30%;
                height: .018rem;
                background: @themeColor;
                position: absolute; 
                bottom: 0;
                left: 50%;
                margin-left: -15%;
            }*/
        }
    }
</style>
