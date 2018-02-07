<template>
    <div class="search-bar">
        <div class="search">
            
            <input type="search" v-model="keywords" placeholder="请输入关键字"/>
        </div>
        <div class="submit" @click="submit"><div class="iconfont icon">&#xe651;</div></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                keywords:''
            }
        },
        props: {

        },
        methods: {
            submit(){
                this.$emit('submit',this.keywords)
            }
        }
    }
</script>

<style lang="less" scoped="">
    @import '../../../assets/less/index.less';

    .search-bar {
        width: 96%;
        display: flex;
        position:relative;
        background:#fff;
        font-size:.12rem;
        align-items:center;
        border: 1px solid @themeColor;
        border-radius: .2rem;
        margin: 0.1rem auto;
        .search {
            flex: 1;
            border-radius:5px;
            height:.29rem;
            align-items:center;
            margin-right: .1rem;
            display: flex;
            .icon {
                width: .29rem;
                height: .29rem;
                background-color: #fff;
                line-height: .32rem;
            }
            input {
                display: block;
                flex: 1;
                width: 100%;
                height: 100%;
                text-align: center;
                font-size: 14px;
                color: #000;
                border-radius: .2rem;
            }
            input::-webkit-input-placeholder{
                color: @themeColor
            }
            input::-moz-placeholder{
                color: @themeColor
            }
            input::-ms-input-placeholder{
                color: @themeColor
            }
            input::-webkit-input-placeholder{
                color: @themeColor
            }
        }
        .submit {
            display:block;
            box-sizing:border-box;
            text-align:center;
            text-decoration:none;
            border-radius:5px;
            -webkit-tap-highlight-color:transparent;
            overflow:hidden;
            color:#000000;
            width:.52rem;
            height:.3rem;
            line-height:.3rem;
            padding:0;
            margin:0;
            background: @themeColor;
            border-radius: 0 .2rem .2rem 0;
            .icon{
                background: @themeColor;
                color: #fff;
                border-radius: 0 .2rem .2rem 0;
                font-size:21px;
            }
        }
    }
    /*.search::before {
        content: '\e628';
        position: absolute;
    }*/

</style>
