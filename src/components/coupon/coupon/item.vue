<template>
<div>
    <li class="cell" v-for="(v,i) in item" :key="i">
        <div class="box">
            <div class="left">
                <div class="t-type">{{v.tagtitle}}</div>
                <div class="btm">
                    <img :src="v.thumb" alt="">
                    <div class="txt">
                        <p class="name">{{v.couponname}}</p>
                        <div class="tip">
                            <p v-if="v.backtype == 0">{{v.deduct}}</p>
                            <p v-else-if="v.backtype == 1">{{v.discount}}折</p>
                            <p v-else-if="v.backtype == 2">
                                <span v-if="v.backmoney && v.backmoney > 0">送{{v.backmoney}}元余额</span>
                                <span v-if="v.backcredit && v.backcredit > 0">送{{v.backcredit}}积分</span>
                                <span v-if="v.backredpack && v.backredpack > 0">送{{v.backredpack}}元红包</span>
                            </p>
                            {{v.title2}}
                        </div>
                        <p class="date">{{v.usestr}}</p>
                    </div>
                </div>
            </div>
            <router-link :to="{name:'couponDetail',query:{id:v.id}}" tag="div" class="right" >
                <div class="canvas-box" v-if="!v.isdisa">
                  <!-- <canvas></canvas> -->
                  <p>剩余</p>
                  <p>{{v.lastratio}}%</p>
                </div>
                <span>{{v.isdisa?"已发完":"立即" + v.gettypestr}}</span>
            </router-link>
        </div>
    </li>
</div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props:{
            item:{
                type:Array,
                required:true
            }
        },
        methods: {

        },
        components:{

        },
        mounted(){
        },
        created(){

        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .cell{
        padding:.16rem .1rem .1rem;
        background:#fafafa;
        .box{
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            padding: .1rem;
            .left{
                display: flex;
                flex: 1;
                flex-direction: column;
                margin-right: .2rem;
                .t-type{
                    background:#ff6c00;
                    color: #fff;
                    font-size: .12rem;
                    margin-bottom: .16rem;
                    width: 1.2rem;
                    height: .24rem;
                    line-height: .24rem;
                    border-radius: .02rem;
                }
                .btm{
                    display: flex;
                    align-items: center;
                    img{
                        width: .5rem;
                        height: .5rem;
                        margin-right: .1rem;
                    }
                    .txt{
                        p{
                            text-align: left;
                        }
                        .name{
                            font-size:.16rem;
                            color:#051b28;
                            line-height: .3rem;
                            .text-overflow(1);
                        }
                        .tip{
                            font-size:.12rem;
                            color:#999;
                            .text-overflow(2);
                            color: #ff6c00;
                            line-height: .16rem;
                            height: .32rem;
                            display: flex;
                        }
                        .date{
                            color:#999;
                            font-size:.12rem;
                            .text-overflow(2);
                        }
                    }
                }
            }
            .right{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                background: #ff6c00;
                width: .88rem;
                height: 1.2rem;
                border-radius: .05rem;
                .canvas-box{
                    width: .6rem;
                    height: .6rem;
                    border: @border;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    border-radius: 50%;
                }
                span{
                    border:.04rem solid #e65820;
                    color:#ff7038;
                    border-radius: .2rem;
                    background: #fff;
                    font-size: .12rem;
                    padding: .01rem .04rem;
                }
            }
        }
    }
</style>