<template>
    <li @click="go">
        <div class="iconfont icon" v-html="info.icon"></div>
        <div class="text">{{info.text}}</div>
        <span class="iconfont right" v-html="info.right"></span>
    </li>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default {
        data() {
            return {

            }
        },
        props:{
            info: {
                type:Object,
                required: true
            }
        },
        methods: {
            go(){
                let params={
                    name:this.info.router,
                    query:this.info.query
                }
                console.log(params)
                if(params.name==""){
                    Toast({
                        message: "亲，功能尚未开通",
                        position: 'middle',
                        duration: 2000
                    });
                }
                this.$router.push({name:this.info.router,query:this.info.query})
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    li {
        position:relative;
        padding:.125rem;
        background: #ffffff;
        /*border-bottom:1px solid #ebebec;*/
        /*border-top:1px solid #ebebec;*/
        display:-webkit-flex;
        margin-top:0.10rem;
        display:flex;
        -webkit-align-items:center;
        align-items:center;
        -moz-transition-duration:300ms;
        transition-duration:300ms;
        transition-property:background-color;
        .icon {
            margin-right:.04rem;
            width:.16rem;
            height:.2rem;
            line-height:.2rem;
            color:#999;
            text-align:center;
        }
        .text {
            flex: 1;
            text-align: left;
            color:#333;
            font-size:.15rem;
            padding: 0 0.08rem;
        }
    }
</style>