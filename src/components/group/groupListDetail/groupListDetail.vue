<template>
    <div class="page" style="background: #f7f7f7;">
        <mt-header title="团详情 " fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <div class="top">
                <div class="top-time">
                    <div v-if="act==0">
                        拼团剩余
                        <span class='com-red'>{{days}}</span>天
                        <span class='com-red'>{{hours}}</span>小时
                        <span class='com-red'>{{minutes}}</span>分
                        <span class='com-red'>{{seconds}}</span>秒,还差
                        <span class='com-red'>{{groups.remainnum}}</span>人
                    </div>
                    <div v-if="act==1&&groups.tuan_first_order.success=='-1'">拼团已超时</div>
                    <div v-if="act==1&&groups.tuan_first_order.success=='1'">拼团已成功</div>
                </div>
                <div class="top-content">
                    <div class="top-img" v-for="(v,i) in orders">
                        <img :src="v.avatar" alt="">
                        <div v-if="v.openid==groups.tuan_first_order.openid">团长</div>
                        <div v-if="v.openid!=groups.tuan_first_order.openid" class="act">团员</div>
                    </div>
                </div>
                <div class="top-text">快邀请好友一起来拼团吧!</div>
            </div>

            <div class="content">
                <div class="tab">
                    <div class="tab-list" :class="{'active': select==='0'}" @click="select='0'">拼团详情</div>
                    <div class="tab-list" :class="{'active': select==='1'}" @click="select='1'">商品详情</div>
                </div>
                <div v-if="select==0">
                    <div class="tab-list" v-for="(v,i) in orders">
                        <img :src="v.avatar" alt="">
                        <span>{{v.nickname}}</span>
                        <div v-if="v.openid==groups.tuan_first_order.openid">
                            {{v.paytime}} 开团
                        </div>
                        <div v-if="v.openid!=groups.tuan_first_order.openid">
                            {{v.paytime}} 参团
                        </div>
                    </div>
                </div>
                <div v-if="select==1">
                    <div class="list-main">
                        <div class="main-left">
                            <img :src="goods.thumb" alt="">
                            <span>{{goods.title}}</span>
                        </div>
                        <div class="main-right">
                            <div>
                                <span>￥{{goods.groupsprice}}/{{goods.units}}</span>
                            </div>
                            <div>x{{goods.goodsnum}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 拼团 玩法 -->
            <t-role></t-role>
            <div class='fix'>
                <div class='fix-left' v-if="groups.tuan_first_order.success=='0'&&groups.ismybuy==true">邀请好友来拼团</div>
                <div class='fix-left' v-if="groups.tuan_first_order.success=='0'&&groups.ismybuy==false">我要参团</div>
                <div class='fix-left' v-if="groups.tuan_first_order.success=='1'">团购已成功</div>
                <div class='fix-left' v-if="groups.tuan_first_order.success=='-1'">组团已失败</div>
                <div class="iconfont" @click="goGroup">&#xe64b;</div>
            </div>
        </div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import list from './../../../assets/mixins/list'
    import tRole from '../action/role'
    export default {
        data() {
            return{
                select:"0",
                goods:[],
                groups:{
                    endtime:'',
                    ismybuy:'',
                    now:'',
                    remainnum:'',
                    remainorder:[],
                    showtime:'',
                    starttime:'',
                    tuan_first_order:''
                },
                orders:[],
                shopshare:[],
                days: '',
                hours: '',
                minutes: '',
                seconds: '',
                act: 0
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            goGroup(){
                this.$router.push("/groupIndex")
            },
            getOrderDetail(){
                let that=this;
                util.request({
                    url: 'groups.team.detail',
                    method:'get',
                    data: {
                        teamid:that.$route.query.tid
                    },
                    success(res) {
                        console.log(res);
                        that.goods=res.data.goods;
                        that.groups=res.data.groups;
                        console.log('that.groups')
                        console.log(that.groups)
                        that.orders=res.data.orders;
                        that.shopshare=res.data.shopshare;
                        let endtime = res.data.groups.endtime - 0;
                        setInterval(function () {
                            let nowtime = Date.parse(new Date()) / 1000;
                            if ((endtime - nowtime) >= 0) {
                                let timer = endtime - nowtime;
                                that.days = parseInt(timer / 60 / 60 / 60 / 24, 10);//计算剩余小时
                                that.hours = parseInt(timer / 60 / 60 % 24, 10);//计算剩余小时
                                that.minutes = parseInt(timer / 60 % 60, 10);//计算剩余分钟
                                that.seconds = parseInt(timer % 60, 10);//计算剩余秒数
                            } else {
                                that.act = 1
                            }
                        }, 1000)
                    },
                    error:function (error) {
                        console.log(error)
                    },
                    complete:function () {

                    }
                })
            },
        },
        mounted () {
            this.getOrderDetail();
        },
        components: {
            tRole
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    .page {
        .page-view(1);
        .container {
            background: #f7f7f7;
            .header-height;
            .top{
                background: #ffffff;
                padding:.2rem 0;
                .top-time{
                    >div:first-child{
                        span{
                            color: #FF473F;
                            font-size: .14rem;
                        }
                    }
                    div{
                        font-size: .14rem;
                        font-weight: 600;
                    }
                }
                .top-img{
                    padding:.3rem 0;
                    position: relative;
                    display: inline-block;
                    margin-right:.1rem;
                    .act{
                        background: #F2993F;
                    }
                    img{
                        width: .45rem;
                        height: .45rem;
                        border-radius: .45rem;
                        background: #ffff00;
                    }
                    div{
                        position: absolute;
                        top:.28rem;
                        right:-0.05rem;
                        font-size: .08rem;
                        background: #EF383D;
                        width: .25rem;
                        height: .25rem;
                        border-radius: .3rem;
                        text-align: center;
                        color: #fff;
                        line-height:.25rem;
                        border:1px solid #fff;
                        box-sizing: content-box;
                    }
                }
                .top-text{
                    color: #AFAFAF;
                    font-size: .14rem;
                }
            }
            .content{
                margin-top:.1rem;
                background: #ffffff;
                .tab{
                    display: flex;
                    height: .4rem;
                    justify-content: space-between;
                    border-bottom:1px solid #f7f7f7;
                    background: #ffffff;
                    .active{
                        color: @themeColor;
                        border-bottom: 2px solid @themeColor;
                    }
                    .tab-list{
                        display: flex;
                        width: 50%;
                        justify-content: center;
                        align-items: center;
                    }
                }
                .tab-list{
                    display: flex;
                    justify-content: space-between;
                    padding:0.1rem .1rem 0.1rem .1rem;
                    align-items: center;
                    img{
                        width:.3rem;
                        height:.3rem;
                        border-radius:50%;
                    }
                    span{
                        flex: 1;
                        text-align: left;
                        color: #ABABAB;
                        text-indent: 1em;
                    }
                    div{
                        font-size: .14rem;
                        color: #ABABAB;
                    }

                }
                .list-main {
                    display: flex;
                    justify-content: space-between;
                    padding: .12rem;
                    .main-left {
                        display: flex;
                        align-items: flex-start;
                        width: 82%;
                        text-align: left;
                        img {
                            width: .6rem;
                            height: .6rem;
                        }
                        span {
                            margin-left: .08rem;
                        }
                    }
                    .main-right {
                        color: #666;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        font-size: .12rem;
                        > div:first-child span {
                            font-size: .12rem;
                        }
                        > div:last-child {
                            margin-top: .04rem;
                            width: 100%;
                            text-align: right;
                            font-size: .12rem;
                        }
                    }
                }
            }
            .fix{
                position: fixed;
                bottom:0;
                color: #ffffff;
                height:.45rem;
                line-height:.45rem;
                width: 100%;
                div{
                    float: left;
                    width: 80%;
                    text-align: center;
                    background: #EF383D;
                }
                .iconfont{
                    width: 20%;
                    font-size: .25rem;
                    background: #333333;
                    color: #ffffff;
                }
            }
        }
    }
</style>