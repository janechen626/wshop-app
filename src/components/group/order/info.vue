<template>
    <div class="list-box">
       <div class="list-content">
           <div class="list">
               订单编号：{{order.orderno}}
           </div>
           <div class="list">
               创建时间：{{order.createtime}}
           </div>
       </div>
        <div class="fix">
            <div v-if="order.status==0" class="act" @click="cancel(order.id)">取消订单</div>
            <router-link :to="{name:'pay',query:{oid:order.id,tid:order.teamid,type:'groups'}}"  v-if="order.status==0" tag="div">支付订单</router-link>
            <!--<div v-if="order.status==0">支付订单</div>-->
            <!--<div v-if="order.status==1">取消订单</div>-->
            <div v-if="order.status==2" @click="confirm(order.id)">确认收货</div>
            <div v-if="order.status==-1" @click="del(order.id)">删除订单</div>
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
            cancel(i,stu=1){
                console.log(stu)
                this.$emit('cancel',i,stu)
            },
            confirm(i){
                this.$emit('confirm',i)
            },
            del(i,stu=0){
                this.$emit('del',i,stu)
            },
            remind(i){
                this.$emit('remind',i)
            }

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
        .fix{
            position: fixed;
            bottom:0;
            width: 100%;
            height:.4rem;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content:flex-end;
            .act{
                background: #ffffff!important;
                border: 1px solid #EF4F4F!important;
                color: #EF4F4F!important;
            }
            div{
                min-width: .6rem;
                background: #EF4F4F;
                color: #ffffff;
                padding:.04rem .06rem;
                border-radius: .04rem;
                margin-right:.12rem;
            }
        }
    }
</style>
