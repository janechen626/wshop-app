<template>
    <div class="join-list">
        <p class="tip">以下小伙伴正在发起拼团，您可以直接参加</p>
        <ul>
            <li v-for="(v,i) in teams" :key="i">
                <div class="box">
                    <img :src="v.avatar" alt="">
                    <div class="center">
                        <div>
                            <p>{{v.nickname}}</p>
                            <p>剩余：<g-counter :endtime='v.endtime'></g-counter></p>
                        </div>
                        <p>还差<span>{{v.num}}</span>人成团</p>
                    </div>
                    <div class="btn" @click="goJoin">去参团</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import gCounter from './cutDown'
    export default {
        data() {
            return {
 
            }
        },
        props:{
            teams:{
                type: Array,
                required: true
            }
        },
        methods: {
            goJoin(){
                this.$emit('goJoin');
            },
        },
        mounted(){
            
        },
        components:{
            gCounter
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .join-list{
        .tip{
            font-size: 12px;
            padding: .1rem;
            background: #fff;
            text-align: left;
            margin-top: .1rem;
        }
        ul{
            li{
                background: #FFECF1;
                padding: .1rem;
                .box{
                    display: flex;
                    align-items: center;
                    background: #fff;
                    border-radius: .2rem;
                    > img{
                        width: .26rem;
                        height: .26rem;
                        margin-left: .15rem;
                    }
                    .center{
                        display: flex;
                        flex: 1;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 .1rem;
                        p{
                            font-size: 12px;
                            text-align: left;
                            span{
                                font-size: 12px;
                                margin: 0 .01rem;
                                color: @themeColor;
                            }
                        }
                    }
                    .btn{
                        font-size: 14px;
                        background: @themeColor;
                        color: #fff;
                        height: .36rem;
                        line-height: .36rem;
                        padding: 0 .1rem;
                        border-radius: 0 .2rem .2rem 0;
                    }
                }
            }
        }
    }
</style>