<template>
    <li class="cell">
        <img :src="item.avatar" alt="">
        <div class="box">
            <div class="left">
                <p class="name">{{item.nickname}}</p>
                <p class="time" v-if="item.isagent == 1 && item.status == 1">成为{{setInfo.textagent}}时间: {{item.agenttime}}</p>
                <p class="time" v-else>注册时间: {{item.createtime}}</p>
            </div>
            <div class="right" v-if="item.isagent == 1 && item.status == 1">
                <p>+{{item.commission_total}}</p>
                <p>{{item.agentcount}}个成员</p>
            </div>
            <div class="right" v-else>
                <p>消费: {{item.moneycount}}{{setInfo.textyuan}}</p>
                <p>{{item.ordercount}}个订单</p>
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
            },
            setInfo:{
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
    @import '../../../assets/less/common.less';

    .cell{
        display: flex;
        padding: .1rem;
        border-bottom: @border;
        >img{
            width: .5rem;
            height: .5rem;
            margin-right: .1rem;
        }
        .box{
            display: flex;
            flex:1;
            .left{
                display: flex;
                flex-direction: column;
                flex: 1;
                p{
                    text-align: left;
                    font-size: .14rem;
                    color:#999;
                    span{
                        font-size: .14rem;
                    }
                }
                .name{
                    font-size: .16rem;
                    color: #000;
                }
            }
            .right{
                width: 1rem;
                border-left: @border;
                p{
                    text-align: right;
                    font-size: .12rem;
                    color:#999;
                    span{
                        font-size: .12rem;
                    }
                }
            }
        }
    }
</style>