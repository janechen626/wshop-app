<template>
    <div class="info">
        <img :src="goods.thumb" alt="">
        <div class="right">
            <h3>{{goods.title}}</h3>
            <div class="btm">
                <p>{{goods.groupnum}}人团：<span class="red">{{goods.groupsprice}}</span>/{{goods.goodsnum}}{{goods.units}}</p>
                <p>已经<span class="bold">{{goods.teamnum}}</span>人参团</p>
            </div>
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
            
        },
        mounted(){
            
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .info{
        display: flex;
        margin-top: .4rem;
        padding: .1rem;
        border-bottom: @border;
        background: #fff;
        > img{
            width: .7rem;
            height: .7rem;
            margin-right: .1rem;
        }
        .right{
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;
            h3{
                font-size: 16px;
                text-align: left;
            }
            .btm{
                display: flex;
                justify-content: space-between;
                p{
                    font-size: 12px;
                }
                span{
                    font-size: 12px;
                    font-weight: 600;
                }
                .red{
                    color: @themeColor;
                    margin-left: .05rem;
                }
                .bold{
                    margin: 0 .02rem;
                }
            }
        }
    }
</style>