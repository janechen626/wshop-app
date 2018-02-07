<template>
    <div class="main" style="background: #f7f7f7;">
        <mt-header title="添加地址 " fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <div class="cont-list">
                <div>收件人</div>
                <input type="text" v-model="info.realname" placeholder="收件人">
            </div>
            <div class="cont-list">
                <div>联系电话</div>
                <input type="text" v-model="info.mobile" placeholder="联系电话">
            </div>
            <div class="cont-list" @click="setCity">
                <div>所在地区</div>
                <input type="text" v-model="addr" disabled placeholder="所在地区">
            </div>
            <div class="cont-list">
                <div>详细地址</div>
                <input type="text" v-model="info.address" placeholder="街道，楼牌号等">
            </div>
        </div>
        <footer class="fixed" @click="submit">
            保存地址
        </footer>
        <mt-popup v-model="mypopup" position="bottom" class="cityPopup">
            <div class="userpopup">
                <div class="userpopup-tp clearfix">
                    <span class="fl userpopup-lf" @click="cityCancel">取消</span>
                    选择地址
                    <span class="fr userpopup-lr" @click="cityConfirm">确定</span>
                </div>
                <mt-picker :slots="slots" value-key="aname" @change="cityValuesChange" class="myCityPopup"></mt-picker>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import util from '../../../../api/util'
    import {Toast, Picker, Popup, DatetimePicker, Checklist} from 'mint-ui';
    import {address, slots} from '../../../../assets/js/address';
    export default {
        data() {
            return {
                mypopup: false,
                slots: slots,
                getAddress:'',
                info:{
                    realname:'',
                    mobile:'',
                    province:'',
                    city:'',
                    area:'',
                    address:'',
                    id:'',
                }
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            init(){
                let _this=this;
                let id=this.$route.query.id;
                util.request({
                    url: 'member.address.get_detail',
                    method: 'get',
                    data: {
                        id:id
                    },
                    success: function (res) {
                        _this.info=res.data.detail
                    },
                    error:function () {

                    }
                })
            },
            initAddress() {//城市初始化
                this.slots[0].values = address.filter((item, index) => {
                    if (item.apid === 0) {
                        return item;
                    }
                });
            },
            setCity(){//所在城市显示
                this.initAddress()
                this.mypopup = true;
            },
            cityConfirm(){//城市确认
                this.mypopup = false;
            },
            cityCancel(){//城市取消
                this.mypopup = false;
            },
            cityValuesChange(picker, values) {
                let left=picker.getSlotValue(0)
                let center=picker.getSlotValue(1)
                let right=picker.getSlotValue(2)
                if(left){
                    this.slots[1].values = address.filter(item => item.apid === left.aid ? true : false)
                }
                if(center){
                    this.slots[2].values = address.filter(item => item.apid === center.aid ? true : false)
                }
                if(right){
                    this.info.province=left['aname']
                    this.info.city=center['aname']
                    this.info.area=right['aname']
                }


            },
            submit(){
                let _this=this
                let params= {
                    realname:_this.info.realname,
                    mobile:_this.info.mobile,
                    province:_this.info.province,
                    city:_this.info.city,
                    area:_this.info.area,
                    address:_this.info.address,
                }
                util.request({
                    url:'member.address.submit',
                    method:'post',
                    data:params,
                    success:function (res) {
                        console.log(res)
                        Toast({
                            message: `添加地址成功`,
                            position: 'middle',
                            duration: 2000
                        });
                        setTimeout(() => {
                            _this.$router.go(-1)
                        }, 2000);

                    },
                    error:function (error) {
                        console.log(error)
                    }
                })
            }
        },
        mounted(){

        },
        computed:{
            addr(){
                if(this.info.province){
                    return `${this.info.province} ${this.info.city} ${this.info.area}`
                }else {
                    return ''
                }

            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../../assets/less/index.less';
    .fixed{
        width: 95%;
        height:.4rem;
        line-height:.4rem;
        font-size: .14rem;
        text-align: center;
        margin-top:.12rem;
        margin-left:2.5%;
        color: #ffffff;
        background: #EF4F4F;
        border-radius: .05rem;
    }
    .container{
        margin-top:.42rem;
        .cont-list{
            display: flex;
            padding:.12rem;
            background: #ffffff;
            margin-bottom:.01rem;
            div{
                font-size: .14rem!important;
                width: .8rem;
                text-align: left;
            }
            input{
                font-size: .14rem;
                display: block;
                flex: 1;
                color: #727272;
            }
        }
    }

</style>