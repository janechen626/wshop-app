<template>
    <router-link tag="div" :to="{name:'product',query:{id:item.goodsid}}" class="list">
        <div class="top-bar">
            <p><span class="iconfont">&#xe653;</span>{{item.merchname}}</p>
            <p><span class="time" v-if="item.createtime">{{item.createtime}}</span><span class="iconfont">&#xe61b;</span></p>
        </div>
        <div class="good-info">
            <label class="mint-checklist-label fl" v-if="checkShow">
                <div class="mint-checkbox">
                    <input type="checkbox" class="mint-checkbox-input" :checked="item.checked" @click="chooseCheck">
                    <span class="mint-checkbox-core"></span>
                </div>
            </label>
            <img :src="item.thumb" alt="">
            <div class="txt">
                <p class="title">{{item.title}}</p>
                <p><span class="price">￥{{item.marketprice}}</span><span class="market-price">￥{{item.productprice}}</span></p>
            </div>
        </div>
    </router-link>
</template>
<script>
    import { Checklist, MessageBox, Toast } from 'mint-ui';
    export default {
        data() {
            return {

            }
        },
        props: {
            item:{
                type: Object,
                required: true
            },
            checkShow:{
                type: Boolean,
                required: true
            },
        },
        methods: {
            chooseCheck(){
                this.$emit('chooseCheck')
            }
        },
        mounted(){
            
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .list{
        display: flex;
        flex-direction: column;
        border-bottom: @border;
        .top-bar{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .1rem;
            border-top: @border;
            p{
                display: flex;
                align-items: center;
                font-size: .14rem;
                .time{
                    font-size: .13rem;
                }
            }
            .iconfont{
                margin-right: .05rem;
            }
        }
        :first-child{
            border-top: none;
        }
        .good-info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: @border;
            margin: 0 .1rem;
            padding: .1rem 0;
            >img{
                width: .5rem;
                height: .5rem;
                border-radius: .06rem;
                margin-right: .1rem;
            }
            .txt{
                flex: 1;
                p{
                    text-align: left;
                }
                .title{
                    .text-overflow(1);
                    font-size: .14rem;
                    margin-bottom: .03rem;
                }
                .price{
                    color: @themeColor;
                }
                .market-price{
                    text-decoration: line-through;
                    color: #999;
                    font-size: .13rem;
                    margin-left: .05rem;
                }
            }
        }
    }
</style>