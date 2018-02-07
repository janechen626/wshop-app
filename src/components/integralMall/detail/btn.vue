<template>
    <div class="btn" v-if="goodObj.goodstype == 0 && goodObj.isverify == 0 && logObj.addressid == 0 && logObj.status == 2">
        <div v-if="goodObj.dispatch > 0" @click="payStu">支付运费</div>
        <div v-else>确认兑换</div>
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
            goodObj:{
                type: Object,
                required: true
            },
            logObj:{
                type:Object,
                required: true
            }
        },
        methods: {
            payStu(){
                this.$emit('payStu')
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/index.less';
  .btn{
        position:fixed;
        bottom:0;
        width:100%;
        height:.35rem;
        line-height:.35rem;
        color:#fff;
        text-align:center;
        background:#FF9227;
        > div{
            font-size: 12px;
        }
  }

</style>