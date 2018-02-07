<template>
    <div class="top-list">
        <div>
            <div>{{order.statusstr}}</div>
            <div>订单金额：￥{{order.price}}</div>
        </div>
        <div class="icon-money">&#xe645;</div>
    </div>

</template>

<script>
    export default {
        data () {
            return {

            }
        },
        props: {
            order: {
                type: Object,
                required: true
            },
        },
        mounted () {

        },
        components: {
        },
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
    .top-list{
        display: flex;
        justify-content: space-between;
        background: #EF4F4F;
        color: #ffffff;
        padding:.16rem .12rem;
        padding-right: .2rem;
        margin-top:.08rem;
        align-items: center;
        div:first-child{
            display: flex;
            text-align: left;
            flex-direction: column;
            div:last-child{
                font-size: .12rem;
            }
        }
        .icon-money{
            font-family: iconfont;
            font-size: .3rem;
        }
    }
</style>
