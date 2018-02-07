<template>
    <div class="content">
        <div class="content-top">
            <div class="top-img"><img :src="goods.thumb" alt=""></div>
            <div class="top-right">
                <div>￥{{goods.minmoney}}+{{goods.mincredit}}积分</div>
                <div v-if="select!=-1" class="right-ku">库存 : {{total}}</div>
                <div v-if="select!=-1">已选:{{title}}</div>
                <div v-if="select==-1">请选择规格</div>
            </div>
        </div>
        <div class="content-col">
            <div class="col-title">颜色</div>
            <div class="col-btns">
                <div v-for="(v,i) in options" :key="i" class="btns" :class="{'active': select==i}" @click="isActive(i,v.total,v.title,v.id,v.title)">{{v.title}}</div>
            </div>
        </div>
        <div class="fix-btn" v-if="total==0">库存不足</div>
        <div class="fix-btn" v-if="select==-1">选择规格</div>
        <div class="fix-btn act" v-if="total!=0&&select!=-1" @click="pop(id)">确定</div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    export default {
        data() {
            return {
                select:-1,
                total:'',
                title:'',
                titles:'',
            }
        },
        props:{
            options:{
                type: Array,
                required: true
            },
            goods:{
//                type: Object,
                required: true
            }
        },
        methods: {
            isActive(e,tot,til,id,title){
                let that = this;
                that.id=id;
                that.total=tot;
                that.title=til;
                that.select=e;
                that.titles=title;
            },
            pop(i,titles){
                let that = this;
                this.$emit('pops',i,that.titles);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .content{
        .content-top{
            float: left;
            width: 100%;
            height: .7rem;
            .top-img{
                width: .9rem;
                height:.9rem;
                position: relative;
                top:-0.4rem;
                float: left;
                border:2px solid #ffffff;
                box-sizing: border-box;
                border-radius: .06rem;
                img{
                    width: 100%;
                    height:100%;
                    float: left;
                    background: #666;
                    border-radius: .06rem;
                }
            }
            .top-right{
                margin-left:.1rem;
                float: left;
                text-align: left;
                div{
                    font-size: .14rem;
                }
            }
        }
        .content-col{
            border-top:1px solid #f7f7f7;
            float: left;
            width: 100%;
            margin-bottom:.5rem;
            text-align: left;
            padding: .1rem;
            .col-btns{
                margin-top:.08rem;
                .active{
                    background: #F14748!important;
                    color: #ffffff;
                    display: inline-block;
                    padding:.03rem .1rem;
                    font-size: .14rem;
                    border-radius: 0.04rem;
                }
                .btns{
                    display: inline-block;
                    background: #F7F7F7;
                    padding:.03rem .1rem;
                    font-size: .14rem;
                    border-radius: 0.04rem;
                }
            }
        }
        .act{
            background: #F14748!important;
        }
        .fix-btn{
            width: 100%;
            margin-top:.08rem;
            text-align: center;
            height:.4rem;
            line-height:.4rem;
            background: #CCCCCC;
            color: #ffffff;
            position: fixed;
            bottom:0;
            left:0;
        }
    }
</style>