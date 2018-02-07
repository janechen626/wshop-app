<template>
    <div class="list-box">
        <div class="list">
            <div>商品小计</div>
            <div>￥{{goods.price}}</div>
        </div>
        <div class="list">
            <div>运费</div>
            <div>￥{{goods.freight}}</div>
        </div>
        <!--<div class="list" v-if="goods.deductenough>0">-->
            <!--<div>满额立减</div>-->
            <!--<div>￥-{{goods.deductenough}}</div>-->
        <!--</div>-->
        <div class="list">
            <div>实付费</div>
            <div class="act">￥{{goods.price}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        props: {
            goods: {
                type: Object,
                required: true
            },
        },
        mounted () {

        },
        components: {},
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/common.less';

    @font-face {
        font-family: 'iconfont';  /* project id 519918 */
        src: url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.eot');
        src: url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.woff') format('woff'),
        url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_519918_wmq7jneofrms4i.svg#iconfont') format('svg');
    }
    .list-box{
        margin-top:.08rem;
        background: #ffffff;
        .list{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:.08rem .12rem;
            box-sizing: border-box;
            border-bottom:1px solid #f7f7f7;
            .act{
                color: @themeColor;
            }
        }
    }

</style>
