<template>
    <div class="main">
        <mt-header title="订单详情" fixed>
            <router-link to="/integralOrder" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="container">
            <topTip :goodObj="goodObj" :shopObj="shopObj"></topTip> 
            <t-location :logObj="logObj" :addressInfo="addressInfo" @tap="tap"></t-location>
            <t-info :goodObj="goodObj" :logObj="logObj" :shopObj="shopObj"></t-info>
            <t-btn :goodObj="goodObj" :logObj="logObj" @payStu="payStu"></t-btn>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import {mapState, mapMutations, mapGetters} from 'Vuex';
    import {Toast} from 'mint-ui';
    import topTip from './topTip'
    import tLocation from './location'
    import tInfo from './info'
    import tBtn from './btn'
    export default {
        data() {
            return {
                goodObj:{},
                logObj:{},
                shopObj:{},
                addressInfo:{}
            }
        },
        methods: {
            getInfo(){
                let _this = this;
                util.request({
                    url: 'creditshop.log.detail',
                    data:{
                        id: this.$route.query.id
                    },
                    method:'get',
                    success(res){
                        _this.goodObj = res.data.goods;
                        _this.logObj = res.data.log;
                        _this.shopObj = res.data.shopset;
                    }
                })
            },
            tap(){
                this.$router.push({name:'iaddList'})
            },
            payStu(){
                let _this = this;
                if(_this.addressInfo.address){
                    util.request({
                        url: 'creditshop.log.paydispatch',
                        data:{
                            id: _this.$route.query.id,
                            addressid : _this.addressInfo.id
                        },
                        method:'post',
                        success(res){
                            _this.$router.push({name: 'pay', query: {id: res.data.orderid}})
                        },
                        error: function (res) {
                            Toast({
                                message: `${res.message}`,
                                position: 'middle',
                                duration: 2000
                            });
                        }
                    })
                }else{
                    Toast({
                        message: '请选择收货地址',
                        position: 'middle',
                        duration: 2000
                    });
                    return false;
                }
                
            },
            ...mapMutations({

            }),
        },
        beforeRouteUpdate(to, from, next){
            let _this = this
            if(from.name === 'iaddList'){
                if(from.query.type !== 1){
                    _this.addressInfo = _this.userAddress
                } 
            }
            next()
        },
        components:{
            topTip,
            tLocation,
            tInfo,
            tBtn
        },
        computed: {
            ...mapState([
                'userAddress'
            ]),
        },
        mounted(){
            this.getInfo();
        }

    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(100);
    }

</style>