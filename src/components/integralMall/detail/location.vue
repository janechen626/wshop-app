<template>
    <div>
        <!-- 收货地址 -->
        <div class="location" v-if="logObj.isaddress == 0 && logObj.ischangeaddress == 1" @click="tap">
            <div class="iconfont">&#xe636;</div>
            <p v-if='!addressInfo.province'>请选择收货地址</p>
            <div class='del-dec' v-if='addressInfo.province'>
                <p><span>{{addressInfo.realname}}</span><span>{{addressInfo.mobile}}</span></p>
                <p>{{addressInfo.province + addressInfo.city + addressInfo.area + " " + addressInfo.address}}</p>
            </div>
        </div>
        <!-- 选择地址 -->
        <div class='loc-del' v-if='logObj.isaddress == 1'>
            <div class="iconfont">&#xe636;</div>
            <div class='del-dec'>
                <p><span>{{logObj.address.realname}}</span><span>{{logObj.address.mobile}}</span></p>
                <p>{{logObj.address.province + logObj.address.city + logObj.address.area + " " + logObj.address.address}}</p>
            </div>
        </div>
        <!-- 物流信息 -->
        <ul v-if="logObj.isexpress == 1">
            <li>快递公司：{{logObj.expresscom}}</li>
            <li>快递单号：{{logObj.expresssn}}</li>
        </ul>
    </div>
</template>

<script>
    import util from '../../../api/util'
    export default {
        data() {
            return {

            }
        },
        props:{
            logObj:{
                type:Object,
                required: true
            },
            addressInfo:{
                type:Object,
                required: true
            }
        },
        methods: {
            tap(){
                this.$emit('tap');
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .location{
        display: flex;
        align-items: center;
        border-top: .1rem solid #f7f7f7;
        padding: .1rem;
        align-items: center;
        p{
            font-size: 14px;
        }
        .iconfont{
            margin-right: .05rem;
        }
    }
    .loc-del{
        display: flex;
        padding: .1rem;
        border-top: .1rem solid #f7f7f7;
        border-bottom: .1rem solid #f7f7f7;
        align-items: center;
    }
    .del-dec{
        p{
            text-align: left;
            font-size: 12px;
            margin: .02rem;
            span{
                font-size: 13px;
                margin-right: .1rem;
            }
        }
    }
    ul{
        display: flex;
        flex-direction: column;
        border-top: .1rem solid #f7f7f7;
        li{
            display: flex;
            justify-content: space-between;
            border-bottom: @border;
            padding:.1rem .1rem .06rem;
            font-size: 13px;
        }
    }

</style>