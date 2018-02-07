<template>
    <div class="shop">
        <div class="shop-title"><span class="icon-shop">&#xe6a8;</span> {{shop.name}}</div>
        <div class="list-main" v-for="(v,i) in res.goods" :key="i">
            <div class="main-left">
                <img :src="v.thumb" alt="">
                <div>
                    <div>{{v.title}}</div>
                    <div>规格:{{v.optionname}}</div>
                </div>
            </div>
            <div class="main-right">
                <div>
                    <span>￥{{v.price}}</span>
                </div>
                <div>x{{v.total}}</div>
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
            res: {
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
                >div{
                    margin-left: .08rem;
                    div{
                        font-size: .14rem;
                    }
                    div:first-child{
                        height:.38rem;
                        overflow: hidden;

                    }
                    div:last-child{
                        margin-top: .04rem;
                        font-size: .12rem;
                        color: #727272;
                    }
                }
            }
            .main-right {
                color: #666;
                display: flex;
                align-items: center;
                flex-direction: column;
                font-size: .12rem;
                > div:first-child span {
                }
                > div:last-child {
                    margin-top: .04rem;
                    width: 100%;
                    text-align: right
                }
            }
        }
    }


</style>
