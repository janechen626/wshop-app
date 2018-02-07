<template>
<div class="list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <router-link :to="{name:'integralDetail',query:{id:v.id}}" class="list" v-for="(v,i) in list" :key="i"  tag="div">
        <div class="top">
            <div class="order-id">订单号：{{v.logno}}</div>
            <div class="order-status">{{v.status_name}}</div>
        </div>
        <div class="good-box">
            <img :src="v.thumb" alt="">
            <div class="good-title">
                <span :class="[{lucky : v.type_name == '抽奖'},{acts : v.type_name == '兑换'}]">{{v.goodstype_name}}</span>
                {{v.title}}
            </div>
            <div class="inter">{{v.credit}}积分</div>
        </div>
    </router-link>
</div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        props: {
            list: {
                type: Array,
                required: true
            },
            loading: {
                type: Boolean,
                required: true
            }
        },
        mounted () {

        },
        methods:{
            loadMore(){
                this.$emit('loadmore')
            }
        },
        components: {
        },
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .list-box{
        padding-bottom: .5rem;
        margin-top: .85rem;
        .list{
            display: flex;
            flex-direction: column;
            font-size: 12px;
            border-top: .1rem solid #f7f7f7;
            .top{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: .1rem;
                border-bottom: @border;
                .order-id{
                    font-size: 13px;
                }
                .order-status{
                    font-size: 13px;
                    color: #FF8000;
                }
            }
            .good-box{
                padding: .1rem;
                display: flex;
                align-items: center;
                > img{
                    width: .6rem;
                    height: .6rem;
                    margin-right: .1rem;
                }
                .good-title{
                    flex: 1;
                    text-align: left;
                    font-size: 14px;
                    span{
                        font-size: 10px;
                        background: @themeColor;
                        padding: .01rem .03rem;
                        margin-right: .03rem;
                        color: #fff;
                    }
                    .lucky{
                        background :#FF8000;
                    }
                    .acts{
                        background :#0290BE;
                    }
                }
                .inter{
                    font-size: 14px;
                    color: @themeColor
                }
            }
        }
    }
</style>
