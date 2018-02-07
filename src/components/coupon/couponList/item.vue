<template>
    <li class="cell">
        <div class="box">
            <div class="left">
                <div class="t-type">{{item.tagtitle}}</div>
                <div class="btm">
                    <img :src="item.thumb" alt="">
                    <div class="txt">
                        <p class="name">{{item.couponname}}</p>
                        <p class="tip">{{item.title2}}</p>
                        <p class="date" v-if="item.timestr == 0">永久有效</p>
                        <p class="date" v-else-if="item.timestr == 1">即 {{item.gettypestr}} 日内 {{item.timedays}} 天有效</p>
                        <p class="date" v-else>有效期 {{item.timestr}}</p>
                    </div>
                </div>
            </div>
            <div class="right">
                <span v-if="item.check == 1">已使用</span>
                <span v-else-if="item.check == 2">已过期</span>
                <router-link v-else :to="{name:'couponDetails',query:{id:item.id}}" tag="span">
                    立即使用
                </router-link>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props:{
            item:{
                type:Object,
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
                justify-content: space-around;
                align-items: center;
                background: #ff6c00;
                width: .88rem;
                height: 1.2rem;
                border-radius: .05rem;
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