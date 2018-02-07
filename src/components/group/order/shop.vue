<template>
    <div class="shop">
        <div class="shop-title"><span class="icon-shop">&#xe6a8;</span> {{shop.name}}</div>
        <div class="list-main">
            <div class="main-left">
                <img :src="goods.thumb" alt="">
                <span>{{goods.title}}</span>
            </div>
            <div class="main-right">
                <div>
                    <span>￥{{goods.price}}/{{goods.goodsnum}}{{goods.units}}</span>
                </div>
                <div>x{{goods.goodsnum}}</div>
            </div>
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
            shop: {
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

    .icon-shop {
        font-family: iconfont;
    }

    .shop {
        background: #ffffff;
        margin-top: .08rem;
        .shop-title {
            padding: .08rem .12rem;
            text-align: left;
        }
        .list-main {
            display: flex;
            justify-content: space-between;
            padding: .12rem;
            .main-left {
                display: flex;
                align-items: flex-start;
                width: 82%;
                text-align: left;
                img {
                    width: .6rem;
                    height: .6rem;
                }
                span {
                    margin-left: .08rem;
                }
            }
            .main-right {
                color: #666;
                display: flex;
                align-items: center;
                flex-direction: column;
                font-size: .14rem;
                min-width: 1rem;
                text-align: right;
                div{
                    width: 100%;
                }
                > div:first-child span {
                     font-size: .14rem;

                }
                > div:last-child {
                    font-size: .14rem;
                    margin-top: .04rem;
                    width: 100%;
                    text-align: right
                }
            }
        }
    }


</style>
