<template>
    <div class="page">
        <mt-header title="开始抽奖" fixed>
            <!--<router-link to="/userCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>-->
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="content">
            <div class="text">{{text}}</div>
            <div class="btns" @click="kip" v-if="staus==1">确定</div>
            <div class="btns" @click="goBack" v-if="staus==2">确定</div>
        </div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import {mapState, mapMutations, mapGetters} from 'Vuex';
    import {Toast} from 'mint-ui'
    export default {
        data() {
            return {
                text:'',
                staus:0
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            kip(){
                this.$router.push({name:'integralOrder'})
            },
            loadLog(){
                let that = this;
                if(that.$route.query.type=='1'){
                    that.text= '正在抽奖...';
                    setTimeout(function () {
                        that.getLog();
                    }, 2000)
                }else{
                    that.text= '正在兑换...';
                    setTimeout(function () {
                        that.getLog();
                    }, 500)
                }
            },
            getLog(){
                let that = this;
                util.request({
                    url: 'creditshop.detail.lottery',
                    method: 'post',
                    data: {
                        logid: that.$route.query.logid
                    },
                    success: function (res) {
                        console.log(res);
                        if(that.$route.query.type=='1'){
                            if(res.status==2){
                                that.text='恭喜您，您中奖了！';
                                that.staus=1
                            }else{
                                that.text='很遗憾，您没有中奖！';
                                that.staus=2
                            }
                        }else{
                            if (res.goodstype == '0' && res.status == '2') {
                                that.text='恭喜您，兑换成功！';
                                that.staus=1
                            } else {
                                that.text='恭喜您，兑换成功！';
                                that.staus=1
                            }
                        }

                    },
                    error: function (error) {
                        console.log(error)
                    },
                    complete: function () {

                    }
                })
            },
        },
        components: {
        },
        computed: {
        },
        mounted(){
            this.loadLog()
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    .page {
        .page-view(1);
        .content{
            .scroll-view(100%);
            margin-top:50%;
            .text{

            }
            .btns{
                margin-top:.1rem;
                padding:.06rem .2rem;
                background: #F14748;
                color: #ffffff;
                font-size: .14rem;
                display: inline-block;
                border-radius: .03rem;
            }
        }
    }
</style>
