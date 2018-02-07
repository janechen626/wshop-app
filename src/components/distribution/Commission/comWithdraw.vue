<template>
<div class="main">
    <mt-header title="申请提现">
        <router-link to="/commission" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
    </mt-header>
    <div class="container">
        <ul>
            <li>我的{{set.commission_ok}}</li>
            <li>￥{{res.commission_ok}}</li>
            <li>
                <span class="title">提现方式</span><p class="right" @click="typeTap"><span>{{type}}</span><span class="iconfont">&#xe61b;</span></p>
            </li>
            <li v-if="typeId==2">
                <span class="title">姓名</span><input class="right" type="text" placeholder="请输入姓名" v-model="realname" />
            </li>
            <li v-if="typeId==2">
                <span class="title">支付宝账号</span><input class="right" type="text" placeholder="请输入支付宝账号" v-model="alipay" />
            </li>
            <li v-if="typeId==2">
                <span class="title">确认账号</span><input class="right" type="text" placeholder="请输入支付宝账号" v-model="alipay1" />
            </li>
            <li v-if="typeId==3">
                <span class="title">选择银行</span><p class="right" @click="bankTap"><span>{{bankname}}</span><span class="iconfont">&#xe61b;</span></p>
            </li>
            <li v-if="typeId==3">
                <span class="title">姓名</span><input class="right" type="text" placeholder="请输入姓名" v-model="realname" />
            </li>
            <li v-if="typeId==3">
                <span class="title">银行卡号</span><input class="right" type="text" placeholder="请输入银行卡号" v-model="bankcard" />
            </li>
            <li v-if="typeId==3">
                <span class="title">确认卡号</span><input class="right" type="text" placeholder="请输入银行卡号" v-model="bankcard1" />
            </li>
        </ul>
        <ul v-if="setArray.charge > 0">
            <li>佣金提现{{set.commission_charge}} {{setArray.charge}}%</li>
            <li v-if="setArray.end > 0">{{set.commission_charge}}金额在￥{{setArray.begin}}到￥{{setArray.end}}间免收</li>
            <li v-if="res.deductionmoney > 0">本次提现将{{set.commission_charge}}金额 ￥ {{res.deductionmoney}}</li>
            <li>本次提现实际到账金额 ￥ {{res.realmoney}}</li>
        </ul>
        <div class="nextStep" disabled @click="submit">下一步</div>
        <input type="">
        <!-- 提现方式 -->
        <mt-popup v-model="typePopup" position="bottom">
            <div class="userpopup">
                <div class="userpopup-tp clearfix">
                    <span class="fl userpopup-lf" @click="cancel">取消</span>
                    <span class="fr userpopup-lr" @click="choose">确定</span>
                </div>
                <mt-picker :slots="typeSlots" value-key="title" @change="typeChange"></mt-picker>
            </div>
        </mt-popup>
        <!-- 银行 -->
        <mt-popup v-model="bankPopup" position="bottom">
            <div class="userpopup">
                <div class="userpopup-tp clearfix">
                    <span class="fl userpopup-lf" @click="cancel">取消</span>
                    <span class="fr userpopup-lr" @click="choose">确定</span>
                </div>
                <mt-picker :slots="bankSlots" value-key="bankname" @change="bankChange"></mt-picker>
            </div>
        </mt-popup>
    </div>
</div>
</template>

<script>
    import util from '../../../api/util'
    import {Toast, Picker, Popup } from 'mint-ui';
    export default {
        data() {
            return {
                set:{},
                typePopup: false,
                bankPopup:false,
                typeSlots: [
                    {
                        flex: 1,
                        values: [],
                        className: 'slot1',
                        textAlign: 'center'
                    }
                ],
                bankname:'',
                res:{},
                typeId:0,//支付方式
                bankSlots: [
                    {
                        flex: 1,
                        values: [],
                        className: 'slot2',
                        textAlign: 'center'
                    }
                ],
                bankId:'',
                setArray:{},
                type:'',//提现方式
                realname:'',
                //支付宝提交参数
                alipay:'',
                alipay1:'',
                //银行卡
                bankcard:'',
                bankcard1:''
            }
        },
        methods: {
            init(){
                let _this = this;
                util.request({
                    url: 'commission.apply',
                    data:{},
                    method:'get',
                    success(res){
                        _this.res =  res.data;
                        _this.set =  res.data.set.texts;
                        _this.setArray = res.data.set_array;
                        _this.typeSlots[0].values =  res.data.type_array;
                        _this.bankSlots[0].values =  res.data.banklist;
                        _this.bankname = res.data.banklist[0].bankname;
                    }
                })
            },
            typeTap(){//提现方式
                this.typePopup = true;
            },
            typeChange(picker, values) {
                let txt = picker.getSlotValue(0);
                if(txt){
                    this.type = txt['title'];
                    this.typeId = txt['type'];
                }
            },
            cancel(){
                this.typePopup = false;
                this.bankPopup = false;
            },
            choose(){
                this.cancel();
            },
            bankTap(){//银行
                this.bankPopup = true;
            },
            bankChange(picker, values) {
                let txt = picker.getSlotValue(0);
                if(txt){
                    this.bankname = txt['bankname'];
                    this.bankId = txt['id'];
                }
            },
            submit(){
                let _this = this;
                let params = {
                    type: _this.type,
                }
                //提现到余额宝
                if(_this.typeId == 2){
                    if(_this.realname == ''){
                        Toast({
                            message: `请填写姓名`,
                            position: 'bottom',
                            duration: 2000
                        });
                        return false;
                    }
                    if(_this.alipay == '' || _this.alipay1 == ''){
                        Toast({
                            message: `请填写支付宝帐号`,
                            position: 'bottom',
                            duration: 2000
                        });
                        return false;
                    }
                    if(_this.alipay1 != _this.alipay){
                        Toast({
                            message: `两次填写的支付宝不一致`,
                            position: 'bottom',
                            duration: 2000
                        });
                        return false;
                    }
                    params = {
                        type: _this.typeId,
                        realname: _this.realname,
                        alipay: _this.alipay,
                        alipay1: _this.alipay1,
                    }
                }
                //提现到银行卡
                if(_this.typeId == 3){
                    if(_this.realname == ''){
                        Toast({
                            message: `请填写姓名`,
                            position: 'bottom',
                            duration: 2000,
                        });
                        return false;
                    }
                    if(_this.bankname == ''){
                        Toast({
                            message: `请选择提现银行`,
                            position: 'bottom',
                            duration: 2000
                        });
                        return false;
                    }
                    if(_this.bankcard == '' || _this.bankcard1 == ''){
                        Toast({
                            message: `请填写银行卡号`,
                            position: 'bottom',
                            duration: 2000
                        });
                        return false;
                    }
                    if(_this.bankcard != _this.bankcard1){
                        Toast({
                            message: `两次填写的银行卡号不一致`,
                            position: 'bottom',
                            duration: 2000
                        });
                        return false;
                    }
                    params = {
                        type:  _this.typeId,
                        realname: _this.realname,
                        bankname: _this.bankname,
                        bankcard: _this.bankcard,
                        bankcard1: _this.bankcard1
                    }
                }
                util.request({
                    url: 'commission.apply',
                    data: params,
                    method:'post',
                    success(res){
                        Toast({
                            message: `提现申请成功，请等待审核`,
                            position: 'bottom',
                            duration: 3000
                        });
                        setTimeout(()=>{
                            _this.$router.push({name:'withdrawals'})
                        },2000)
                    },
                    error(res){
                        Toast({
                            message: res.data.message,
                            position: 'bottom',
                            duration: 2000
                        });
                    }
                })
            }
        },
        components:{

        },
        mounted(){
            this.init();
        },
        created(){

        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main{
        .page-view(100);
        .container {
            .scroll-view(100%);
            ul{
                li{
                    text-align: left;
                    border-bottom: @border;
                    display: flex;
                    align-items: center;
                    padding: .15rem 0;
                    margin: 0 .1rem;
                    font-size: .14rem;
                    span{
                        font-size: .13rem;
                    }
                    .title{
                        width: 1.2rem;
                    }
                    .right{
                        flex: 1;
                        font-size: .13rem;
                    }
                    p.right{
                        display: flex;
                        justify-content: space-between;
                    }
                }
                :last-child{
                    border-bottom: none;
                }
            }
            .nextStep{
                background:#04be02;
                color:#fff;
                border:1px solid #04ab02;
                margin: .2rem .1rem;
                padding: .07rem;
                border-radius: .05rem;
            }
        }
    }
</style>
