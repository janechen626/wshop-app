<template>
    <div class="tab">
        <div class="tab-list" :class="{'active': select==='0'}" @click="tab('0')">组团中</div>
        <div class="tab-list" :class="{'active': select==='1'}" @click="tab('1')">组团成功</div>
        <div class="tab-list" :class="{'active': select==='-1'}" @click="tab('-1')">组团失败</div>
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
            border-bottom: .02rem solid @themeColor;
        }
        .tab-list{
            display: flex;
            width: 33%;
            justify-content: center;
            align-items: center;
        }
    }
</style>
