<template>
    <div class="loc">
        <div class="icon-loc">&#xe636;</div>
        <div class="main-top" v-if="address==false">请选择地址</div>
        <div class="loc-main" v-else>
            <div class="main-top">
                <span>{{address.realname}}</span>
                <span>{{address.mobile}}</span>
            </div>
            <div class="main-ads">{{address.province}}{{address.city}}{{address.area}}{{address.address}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        props: {
            address: {
//                type: Object,
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
    .loc{
        margin-top:.08rem;
        background: #ffffff;
        padding:.12rem;
        display: flex;
        align-items: center;
        .icon-loc{
            font-family: iconfont;
            font-size: .2rem;
        }
        .loc-main{
            margin-left: .08rem;
            .main-top{
                text-align: left;
            }
            .main-ads{
                color: #666;
            }
        }
    }
</style>
