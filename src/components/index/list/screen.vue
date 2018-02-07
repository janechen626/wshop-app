<template>
    <div :class="['screen',{in : screenShow}]">
        <div class="attribute">
            <div :class="['item',{active:filterBtn.isrecommand}]">
                <div class="btn" @click="filter('isrecommand')"><span>√</span>推荐商品</div>
            </div>
            <div :class="['item',{active:filterBtn.isnew}]">
                <div class="btn" @click="filter('isnew')"><span>√</span>新品上市</div>
            </div>
            <div :class="['item',{active:filterBtn.ishot}]">
                <div class="btn" @click="filter('ishot')"><span>√</span>热卖商品</div>
            </div>
            <div :class="['item',{active:filterBtn.isdiscount}]">
                <div class="btn" @click="filter('isdiscount')"><span>√</span>促销商品</div>
            </div>
            <div :class="['item',{active:filterBtn.issendfree}]">
                <div class="btn" @click="filter('issendfree')"><span>√</span>卖家包邮</div>
            </div>
            <div :class="['item',{active:filterBtn.istime}]">
                <div class="btn" @click="filter('istime')"><span>√</span>限时抢购</div>
            </div>
        </div>
        <div class="title">选择分类</div>
        <div class="cate">
            <div class="item">
                <div :class="{cur:selected == i}"  @click="tab(i,v.id)" v-for="(v,i) in cateList" :key="i">{{v.name}}</div>
            </div>
            <div class="item">
                <template v-for="(v,i) in cateList">
                    <div :class="{cur:selected2 == i2}" @click="tab2(i2,v1.id)" v-if="selected == i" v-for="(v1,i2) in v.child" :key="i2">{{v1.name}}</div>
                </template>
            </div>
        </div>
        <div class="btns">
            <div class="cancle" @click="cancle">取消筛选</div>
            <div class="confirm" @click="sub">确认</div>
        </div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    export default {
        data() {
            return {

            }
        },
        props: {
            screenShow: {
                type: Boolean,
                required: true
            },
            cateList:{
                type: Array,
                required: true
            },
            selected:{
                // type :Number,
                // required: true
            },
            selected2:{
                // type :Number,
                // required: true
            },
            filterBtn:{
                type: Object,
                required: true
            }
        },
        methods: {
            sub:function(){
                this.$emit('sub');
            },
            cancle:function(){
                this.$emit('cancle');
            },
            tab:function(i,id){
                this.$emit('tab',i,id);
            },
            tab2:function(i,id){
                this.$emit('tab2',i,id);
            },
            filter:function(n){
                this.$emit('filter',n);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .screen{
        background:#fff;
        width:100%;
        position:fixed;
        top:1.17rem;
        left:0;
        z-index:1;
        opacity:0;
        transition-property:height, opacity, -webkit-transform;
        transition-property:height, opacity, transform;
        transition-property:height, opacity, transform, -webkit-transform;
        transition-duration:300ms;
        -webkit-transform:translate3d(0px, -100%, 0px) scaleY(0);
        transform:translate3d(0px, -100%, 0px) scaleY(0);
        .attribute{
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            .item{
                width: 28%;
                margin: .03rem 0.05rem;
                .btn{
                    border: 1px solid #999;
                    color: #999;
                    font-size: 13px;
                    border-radius: 5px;
                    padding: .04rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    >span{
                        display: none;
                        font-size: 12px;
                        margin-right: .03rem;
                    }
                }
            }
            .item.active{
                .btn{
                    border: @themeColor 1px solid;
                    color: @themeColor;
                    >span{
                        display: block;
                    }
                }
                
            }
        }
        .title{
            padding:0 0.06rem;
            line-height:.3rem;
            font-size:14px;
            color:#999;
            position:relative;
            text-align:center;
            border-top: @border;
            border-bottom: @border;
        }
        .cate{
            height:2.4rem;
            position:relative;
            display:-webkit-box;
            display:-webkit-flex;
            display:-ms-flexbox;
            display:flex;
            margin:0.06rem 0;
            padding:0 0.06rem;
            .item{
                width:100%;
                height:inherit;
                overflow-y:auto;
                position:relative;
                -webkit-overflow-scrolling:touch;
                >div{
                    height:.3rem;
                    line-height:.3rem;
                    font-size:14px;
                    text-align:center;
                    color:#666;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    overflow:hidden;
                    padding:0 0.04rem;
                    display:block;
                }
                >div.cur{
                    background-color:rgba(223, 223, 223, 0.43)
                }
            }
            .item:first-child{
                border-right:@border;
            }
        }
        .btns{
            padding:.1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: @border;
            .cancle{
                color:#666;
                font-size: 15px;
            }
            .confirm{
                color:#fd5454;
                font-size: 15px;
            }
        }
    }
    .screen.in{
        transition-duration:0.3s;
        opacity:1;
        height:auto;
        -webkit-transform:translate3d(0px, 0px, 0px) scaleY(1);
        transform:translate3d(0px, 0px, 0px) scaleY(1);
    }
</style>