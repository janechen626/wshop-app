<template>
    <div class="act">
        <p>支付开团并邀请<span>{{total}}</span>人参加，人数不足自动退款，详见下方拼团玩法</p>
        <div class="btn">
            <router-link :to="{name:'groupJoin',query:{id:goods.id}}" tag="div">我要参团</router-link>
            <div class="red" @click="regiment">我要开团</div>
        </div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    export default {
        data() {
            return {
 
            }
        },
        props:{
            goods:{
                type: Object,
                required: true
            }
        },
        methods: {
            regiment(){
                this.$emit('regiment');
            }
        },
        computed:{
            total :function(){
                let total = parseFloat(this.goods.groupnum) - 1
                return total;
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .act{
        display: flex;
        flex-direction: column;
        padding: .1rem 0 .2rem;
        background: #fff;
        p{
            font-size: 12px;
            margin-bottom: .1rem;
            span{
                color: @themeColor;
                margin: 0 .02rem;
                font-size: 12px;
            }
        }
        .btn{
            display: flex;
            justify-content: center;
            > div{
                width:42%;
                text-align:center;
                border-radius:3px;
                border: 1px solid #666;
                font-size: 13px;
                padding: .035rem 0;
            }
            > div:first-child{
                margin-right: .15rem;
            }
            .red{
                border: 1px solid @themeColor;
                background: @themeColor;
                color: #fff;
            }
        }
    }
</style>