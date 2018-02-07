<template>
    <ul>
            <router-link :to="{name:'product',query:{id:v.goodsid}}" tag="li" v-for="(v,i) in item" :key="i">
            <img :src="v.thumb" alt="">
            <div class="good-dec">
                <p class="title">{{v.title}}</p>
                <div class="btm">
                    <div class="left"><p class="kill-price">￥{{v.price}}</p><p class="price">￥{{v.marketprice}}</p></div>
                    <div class="right">
                        <p class="ing" v-if="timeobj.status==0">抢购中</p>
                        <p class="pre" v-else-if="timeobj.status==1">即将开始</p>
                        <p class="ing" v-else>还可以继续抢购哦</p>
                    </div>
                </div>
            </div>
        </router-link>
    </ul>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default {
        data() {
            return {

            }
        },
        props:{
            item: {
                type:Array,
                required: true
            },
            timeobj: {
                type:Object,
                required: true
            }
        },
        methods: {
            
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    ul{
        display: flex;
        flex-direction: column;
        background: #fff;
        margin-bottom: .49rem;
        li{
            display: flex;
            justify-content: space-between;
            padding: .05rem .15rem;
            border-bottom: @border;
            img{
                width: .8rem;
                height: .8rem;
                margin-right: .1rem;
            }
            .good-dec{
                flex: 1;
                display: flex;
                flex-direction: column;
                text-align: left;
                .title{
                    .text-overflow(2);
                    margin-bottom: .1rem;
                }
                .btm{
                    display: flex;
                    justify-content: space-between;
                    .left{
                        .kill-price{
                            color: @themeColor;
                            font-size: .18rem;
                        }
                        .price{
                            color: #999;
                            font-size: .14rem;
                            text-decoration: line-through;
                        }
                    }
                    .right{
                        p{
                            color: #fff;
                            height: .3rem;
                            line-height: .3rem;
                            padding: 0 .1rem;
                            font-size: .15rem;
                            display: block;
                            border-radius: .05rem;
                        }
                        .ing{
                            background: @themeColor;
                        }
                        .pre{
                            background: #06BE01;
                        }
                    }
                }
            }
        }
    }
</style>