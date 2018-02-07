<template>
    <div class="top-tip">
        <p class="font-14">{{goodObj.status_name}}</p>
        <p class="font-12">商品金额：{{goodObj.credit}}{{shopObj.credittext}}</p>
        <div class="status iconfont">&#xe630;</div>
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
            shopObj:{
                type:Object,
                required: true
            }
        },
        methods: {
            
        },
        mounted(){
            console.log('测试',this.goodObj)
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .font-14{
        font-size: 14px;
    }
    .font-12{
        font-size: 12px;
    }
    .top-tip{
        position: relative;
        display: flex;
        flex-direction: column;
        background: #FF9227;
        padding: .15rem .1rem;
        margin-top: .4rem;
        p{
            text-align: left;
            color: #fff;
            margin-bottom: .03rem;
        }
        .status{
            position: absolute;
            font-size: .42rem;
            right: .1rem;
            top: .09rem;
            color: #fff;
        }
    }

</style>