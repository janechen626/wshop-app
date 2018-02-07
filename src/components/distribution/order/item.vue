<template>
    <li class="cell">
        <div class="label" @click="toggle">
            <div class="ordernum">
                <!-- <div class="ordersn">SH2018012317897897897</div> -->
                <div>{{item.ordersn}}({{item.level}})</div>
                <!-- <div class="time">2018-01-25 17:01</div> -->
                <div class="time">{{item.createtime}}</div>
            </div>
            <div class="info">
                <!-- <div class="money">+27.60</div> -->
                <div class="money">+{{item.commission}}</div>
                <!-- <div class="status">已付款</div> -->
                <div class="status">{{item.status}}</div>
            </div>
            <span class="iconfont" v-if="show">&#xe667;</span>  
            <span class="iconfont" v-else>&#xe666;</span>
        </div>
        <div class="detail" v-if="show" v-for="(v,i) in item.order_goods" :key="i">
            <div class="logo">
                <img :src="v.thumb"/>
            </div>
            <div class="info">
                <p>{{v.title}}</p>
                <span>{{v.optionnamex}}{{v.total}}</span>
            </div>
            <div class="expect">
                <div class="plan">预计</div>
                <div class="money">+{{v.commission}}</div>
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
//              required:true
          },
            show: {
              type: Boolean
            }
        },
        methods: {
            toggle(){
                this.$emit('toggle')
//                this.show=!this.show
            }
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
    .cell {
        width: 100%;
        text-align: left;
        box-sizing: border-box;
        padding: .1rem .1rem 0;

        /*display: flex;*/
        .label {
            display: flex;
            height: .6rem;
            padding-bottom: .1rem;
            position: relative;
            .ordernum {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .ordersn {
                    font-size: .14rem;
                }
                .time {
                    font-size: .12rem;
                }
            }
            .info {
                width: .74rem;
                text-align: right;
                color: #333;
                font-size: .13rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-right: .2rem;
                div {
                    font-size: .13rem;
                    line-height: .2rem;
                }
            }
            .iconfont {
                position: absolute;
                right: .01rem;
                top: .15rem;
            }
        };
        .detail {
            display: flex;
            box-sizing: border-box;
            border-top:@border;
            border-bottom:@border;
            padding: .1rem 0;
            .logo {
                display: flex;
                align-items: center;
                margin-right: .1rem;
                img {
                    width: .52rem;
                    height: .52rem;
                    display: block;
                }
            }
            .info {
                display: flex;
                flex-direction: column;
                flex: 1;
                margin-top: .05rem;
                border-right: @border;
                p {
                    font-size: .14rem;
                    .text-overflow(1);
                    padding-right: .1rem;
                    margin-right: .2rem;
                }
                span {
                    font-size: .12rem;
                }
            }
            .expect {
                color: #999;
                text-align: right;
                display: flex;
                justify-content: center;
                flex-direction: column;
                width: .65rem;
                div {
                    font-size: .12rem;
                    line-height: .22rem;
                }
            }

        }
    }
</style>