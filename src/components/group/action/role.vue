<template>
    <div class="role">
        <div class="title">
            <p>拼团玩法</p>
            <p>查看详情</p>
        </div>
        <div class="step">
            <div class="blk">
                <span>1</span>
                <div>
                    <p>选择</p>
                    <p>心仪商品</p>
                </div>
            </div>
            <div class="blk">
                <span>2</span>
                <div>
                    <p>支付开团</p>
                    <p>或参团</p>
                </div>
            </div>
            <div class="blk">
                <span>3</span>
                <div>
                    <p>邀请好友</p>
                    <p>参团支付</p>
                </div>
            </div>
            <div class="blk">
                <span>4</span>
                <div>
                    <p>达到人数</p>
                    <p>团购成功</p>
                </div>
            </div>
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
        props:{
            
        },
        methods: {
            
        },
        mounted(){
            
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .role{
        display: flex;
        flex-direction: column;
        background: #fff;
        margin-top: .1rem;
        .title{
            display: flex;
            justify-content: space-between;
            p{
                font-size: 12px;
                padding: .1rem;
            }
        }
        .step{
            display: flex;
            justify-content: space-around;
            padding-bottom: .15rem;
            .blk{
                display: flex;
                align-items: center;
                > span{
                    font-size: 10px;
                    color:#666;
                    width:.15rem;
                    height:.15rem;
                    border:1px dashed #666;
                    border-radius:.15rem;
                    margin-right: .05rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                > div{
                    p{
                        font-size: 12px;
                        text-align: left;
                    }
                }
            }
        }
    }
</style>