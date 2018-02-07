<template>
    <div class="list-box">
       <div class="list-content">
           <div class="list">
               订单编号：{{order.ordersn}}
           </div>
           <div class="list">
               创建时间：{{order.createtime}}
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
            order: {
                type: Object,
                required: true
            },
        },
        methods: {
//            cancel(i,stu){
//                this.$emit('cancel',i,stu)
//            },
//            confirm(i){
//                this.$emit('confirm',i)
//            },
//            del(i,stu){
//                console.log(123);
//                this.$emit('del',i,stu)
//            },
//            remind(i){
//                this.$emit('remind',i)
//            }

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
    .list-box{
        margin-top:.08rem;
        background: #ffffff;
        .list-content{
            .list{
                display: flex;
                align-items: center;
                padding:.08rem .12rem;
                box-sizing: border-box;
                border-bottom:1px solid #f7f7f7;
            }
        }

    }
</style>
