<template>

    <div class="main">
        <!--个人信息模块-->
        <mt-header fixed title="个人信息">
            <router-link to="/userCenter" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!--个人信息 内容模块-->
        <div class="container">
            <ul class="userinfo-list">

                <li class="cell">
                    <span class="left">昵称</span>
                    <input type="text" v-model="member.nickname" class="right" placeholder="请输入昵称">
                </li>
                <li class="cell" @click="toastPhone">
                    <span class="left">手机号码</span>
                    <input type="text" v-model="member.mobile" class="right" placeholder="请输入手机号码">
                    <!--<div class="mobile"></div>-->
                </li>
                <li class="cell">
                    <span class="left">微信号</span>
                    <input type="search" v-model="member.weixin" class="right" placeholder="请输入微信号">
                </li>
                <li class="cell">
                    <span class="left">真实姓名</span>
                    <input type="search" name="" class="right" placeholder="请输入真实姓名">
                </li>
               <!-- <li class="cell" @click="setBirthday">
                    <span class="left">出生日期</span>
                <input type="text" v-model="birthday" disabled class="right" placeholder="请选择出生日期">
                </li>-->
                <li class="cell" @click="setCity">
                    <span class="left">所在城市</span>
                    <input type="text" v-model="addressInfo" disabled class="right" placeholder="请选择所在城市">
                </li>

            </ul>

            <!-- 保存按钮 模块-->

            <button class="postUserInfo-item" @click="postUserInfo">
                确认修改
            </button>
        </div>
        <!-- 所在城市 -->
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
        <!-- 出生日期 -->
         <mt-datetime-picker ref="datapicker" type="date" v-model="value" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
             @confirm="handleChange"  class="myBirthPicker">
        </mt-datetime-picker>

    </div>
</template>

<script>

    
    import util from '../../../api/util.js';
    import {
        memberInfo,
        PUT_USERINFO,
        PUT_USERAVATARS,
        USERPHOTO
    } from '../../../api/api.js';
    import { Toast } from 'mint-ui'
    import {address, slots} from '../../../assets/js/address';
    import {members} from "../../../config/url";

    export default {
        data() {
            return {
                mypopup:false,
                slots: slots,
                member:{},
                city:'',
                setbirthday: '',
                value:''
            }
        },
        methods:{
            postUserInfo(){
                let _this=this;
                let params={
                    'memberdata[realname]':_this.member.realname,
                    'memberdata[mobile]':_this.member.mobile,
                    'memberdata[weixin]':_this.member.weixin,
                    'memberdata[birthday]':'',
                    'memberdata[city]':_this.addressInfo
                }
                util.request({
                    url: 'member.info.submit',
                    method: 'post',
                    data: params,
                    success: function () {
                        Toast({
                            message: `修改信息成功`,
                            position: 'middle',
                            duration: 2000
                        });
                        setTimeout(() => {
                            _this.$router.go(-1)
                        }, 2000);
                    },
                    error: function () {
                        
                    }
                })
                
            },
            toastPhone(){

            },
            init(){
                let _this=this;
                util.request({
                    url:'member.info',
                    method:'get',
                    data:{},
                    success:function (res) {
                        console.log('res.data')
                        console.log(res.data)
                        _this.member = res.data.member
                    },
                    error:function () {
                        
                    }
                })
            },
            cityCancel(){
                this.mypopup = false;
            },
            cityConfirm(){
                this.mypopup = false;
            },
            setCity(){//所在城市显示
                this.initAddress()
                this.mypopup = true;
            },
            initAddress() {//城市初始化
                this.slots[0].values = address.filter((item, index) => {
                    if (item.apid === 0) {
                        return item;
                    }
                });
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
                    this.city=`${left['aname']} ${center['aname']} ${right['aname']}`
                }
            },
            handleChange(){
                console.log(this.value)
                console.log(this.value)
            },
        },
        computed:{
            addressInfo(){
                if(this.city){
                    return this.city
                }else {
                    return this.member.city
                }
            },
            birthday(){
                if (this.setbirthday) {
                    return '1111'
                }else {
                    return this.member.birthday
                }
            },
            datastr(){
                return this.member.birthday.split('-')
            }
        },
        mounted(){
            this.init()

        }

    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(10);
        .container {
            .scroll-view(100%);
            margin-top: .4rem;
        }
    }
    .header {
        font-size: 0.20rem;
        height: 0.16rem;
      }
      .mint-header {
          font-size: 0.16rem;
      }
      .userinfo-list {
        margin-top: 0.10rem;
        overflow: hidden;
      }
    
      .cell {
        padding: 0rem 0.10rem;
        height: 0.5rem;
        background: #fff;
        border-bottom: 0.01rem solid #F3F4F5;
        position: relative;
        display: flex;
      }
      .cell .left {
        width: .64rem;
        line-height: 0.5rem;
        color: #333;
        text-align:justify;
        font-size: .14rem;
        /*text-align-last:justify;*/
      }
      .cell .right {
        flex: 1;
        margin-left: .2rem;
        box-sizing: border-box;
        padding: .1rem 0;
        left: .3rem;
        color: #727272;
        font-size: 0.14rem
      }
    
    
      .userinfo-header {
        margin-bottom: 0.1rem;
        line-height: .5rem;
        position: relative;
        align-items: center;
      }
      .userinfo-header .left {
        width: .64rem;
    
      }
      .userinfo-header .logo {
        width: 0.25rem;
        height: 0.25rem;
        background-size: cover;
        font-size: 0.12rem;
        color: #969696;
        border-radius: 50%;
        display: flex;
        position: absolute;
        right: .2rem;
      }
      .logo img {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 50%;
        align-items: center;
      }
    
      .postUserInfo {
        width: 100%;
        margin-top: 0.2rem;
      }
    
      .postUserInfo-item {
          width: 94%;
          border-radius:.05rem;
          box-sizing:border-box;
          cursor:pointer;
          font-family:inherit;
          font-size:.15rem;
          height:.4rem;
          line-height:.4rem;
          padding:0 .1rem;
          position:relative;
          text-align:center;
          text-decoration:none;
          text-overflow:ellipsis;
          white-space:nowrap;
          margin:0.5em;
          -webkit-user-select:none;
          user-select:none;
          transition-duration:300ms;
          transition-property:background-color;
          display:inline-block;
          z-index:100;
          background:#fe5455;
          color:#fff;
          border:1px solid #fe5455;
      }
    
      .picker-toolbar .mint-datetime-action {
        color: #979696 !important;
      }
    
      .mint-popup.mint-popup-bottom {
        width: 100%;
        background: #fff;
      }
    
      .userpopup-tp {
        padding: 0.12rem 0.33rem;
        font-size: 0.16rem;
        color: #2C2C2C;
        border-bottom: 0.01rem solid #ddd;
      }
    
      .userpopup-lf {
        font-size: 0.135rem;
        color: #979696;
      }
    
      .userpopup-lr {
        font-size: 0.135rem;
        color: #F5751D;
      }
      .picker-item {
        font-size: 0.16rem;
      }
    </style>
