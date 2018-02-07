<template>
    <!-- 会员中心模块 -->
    <div class="user">
        <div class="item">
            <div>余额</div>
            <div class="money">{{info.credit2}}</div>
            <router-link class="mint-tab-item" :to="{name:'recharge'}" tag="a">
                <div class="mint-tab-item-label inp">
                    充值
                </div>
            </router-link>
        </div>
        <div class="item userinfo">
            <router-link class="avatar" :to="{name:'userInfo'}" tag="div">
                <img :src="info.avatar" />
            </router-link>
            <div class="nickname">{{info.nickname}}</div>
            <div class="level">{{info.level}}</div>
            <div class="levelname">{{info.levelname}}</div>
        </div>
        <div class="item item3">
            <router-link :to="{name:'integralIndex'}" tag="div">积分</router-link>
            <router-link class="money" :to="{name:'integralIndex'}" tag="div">{{info.credit1}}</router-link>
        </div>
        <!-- <div class="iconfont set">&#xe68f;</div> -->
        <router-link class="mint-tab-item iconfont set" :to="{name:'userInfo'}" tag="a">
            &#xe63b;
        </router-link>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            info: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .user {
        display: flex;
        height: 2.13rem;
        background: #fe5455;
        padding-top: .2rem;
        color: white;
        font-weight: bold;
        font-size: .16rem;
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        .item {
            flex: 1;
            background-color: #fe5455;
            font-size: .12rem;
            height: 1.1rem;
            width: .52rem;
            padding-top: .35rem;
            margin: auto;
            div {
                font-size: .12rem;
                .item {
                    font-size: .12rem;
                }
            }
            .mint-tab-item-label {
                color: #fff;
                .inp {
                    display: inline-block;
                    height: 100%;
                    font-size: .13rem;
                    text-align: left;
                    padding: 0.04rem 0.15rem;
                    border: 1px solid #fff;
                    border-radius: 0.20rem;

                }
            }
            .money {
                color: yellow;
                font-size: .12rem;
            }
        }
        .userinfo {
            height: 1.1rem;
            width: .48rem;
            padding-top: .10rem;
            margin: auto;
            /*border-radius: .48rem;*/
            .avatar {
                height: .48rem;
                width: .48rem;
                background: #fff;
                margin: auto;
                border-radius: 50%;
                border: .02rem solid #fff;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .nickname {
                height: .2rem;
                padding-top: .04rem;
                font-size: .12rem;
                text-align: center;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                color: #fff;
            }
            .level {
                font-size: .12rem;
                text-align: center;
                color: #fff;
            }
        }
        .set {
            position: absolute;
            top: 0.50rem;
            right: 0.15rem;
            font-family: iconfont;
            font-size: .16rem;
            width: 0.20rem;
            height: 0.20rem;
            color: #fff;
        }
    }
</style>