<template>
    <div class="info-box">
        <!-- 商品信息 -->
        <div class="good">
            <div class="head"><span class="iconfont">&#xe6a8;</span> {{shopObj.shopname}}</div>
            <div class="dec">
                <img :src="goodObj.thumb" alt="">
                <div class="right">
                    <div class="name">
                        <p class="t">{{goodObj.title}}</p>
                        <p>{{goodObj.credit}}{{shopObj.credittext}}<span v-if='goodObj.money > 0'>+￥{{goodObj.money}}</span></p>
                    </div>
                    <p class="num">X 1</p>
                </div>
            </div>
        </div>
        <!-- 商品小计 -->
        <ul>
            <li><span>商品小计</span><p>{{goodObj.credit}}{{shopObj.credittext}}<span v-if='goodObj.money > 0'>+￥{{goodObj.money}}</span></p></li>
            <li v-if="goodObj.dispatch == 0 && goodObj.isverify == 0"><span>运费</span><span>{{ goodObj.dispatch > 0 ? goodObj.dispatch :'免运费'}}</span></li>
            <li>
                <p>实付费<span v-if="goodObj.dispatch == 0 && goodObj.isverify == 0"> (含运费)</span></p>
                <p><span class="red">{{goodObj.credit}}{{shopObj.credittext}}</span><span v-if="total > 0">+ ￥{{total}}</span></p>
            </li>
        </ul>
        <!-- 订单信息 -->
        <ul>
            <li><span>订单编号：{{logObj.logno}}</span></li>
            <li><span>创建时间：{{logObj.createtime}}</span></li>
            <li v-if="logObj.status >= 1"><span>支付时间：{{logObj.createtime}}</span></li>
        </ul>
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
                type: Object,
                required: true
            },
            shopObj:{
                type: Object,
                required: true
            }
        },
        methods: {},
        mounted(){},
        computed:{
            total :function(){
                let total = parseFloat(this.goodObj.dispatch) + parseFloat(this.goodObj.money)
                return total;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .info-box{
        display: flex;
        flex-direction: column;
        .good{
            display: flex;
            flex-direction: column;
            border-top: .1rem solid #f7f7f7;
            .head{
                font-size: 12px;
                text-align: left;
                padding: .1rem;
            }
            .dec{
                display: flex;
                width: 100%;
                padding:.1rem;
                > img{
                    width: .6rem;
                    height: .6rem;
                    margin-right: .1rem;
                }
                .right{
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    .name{
                        display: flex;
                        justify-content: space-between;
                        p{
                            font-size: 12px;
                        }
                        .t{
                            font-size: 13px;
                        }
                    }
                    .num{
                        text-align: right;
                        font-size: 12px;
                    }
                }
            }
        }
        ul{
            display: flex;
            flex-direction: column;
            border-top: .1rem solid #f7f7f7;
            li{
                display: flex;
                justify-content: space-between;
                border-bottom: @border;
                padding:.1rem .1rem .06rem;
                span{
                    font-size: 13px;
                }
                p{
                    font-size: 13px;
                }
                .red{
                    color: @themeColor
                }
            }
        }
    }
</style>