<!--列表 -->
<template>
        <ul ref="lists"  class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <slot>
                <div class="tip">
                    <div class="logo">
                        <img v-if="tip.img" :src="tip.img"/>
                        <span v-if="tip.icon" class="iconfont" v-html="tip.icon"></span>
                    </div>
                    <p>{{tip.title}}</p>
                    <button v-if="tip.btn" @click="go">{{tip.btn}}</button>
                </div>
            </slot>
        </ul>
</template>

<script>
    import InfiniteScroll from 'mint-ui'
    import defaultImg from '../../../assets/images/good-tip.png'

    export default {
        data() {
            return {
                length: true
            }

        },
        methods: {
            loadMore() {
                this.$emit('loadMore')
            }
        },
        props: {
            loading: {
                type: Boolean,
//                required:true
            },
            tip:{
                type:Object,
                default(){
                    return {
                        img: defaultImg,
                        title: '暂时没有哦！',
                        btn:''
                    }
                }
            }
        },
    }
</script>

<style lang="less" scoped="">
    @import '../../../assets/less/index.less';

    .list {
        width: 100%;
        .tip {
            margin: 0 auto;
            .logo {
                width: 1.6rem;
                /* height: .76rem; */
                margin: 0.5rem auto .1rem;
                img {
                    width: 100%;
                    height: 100%;
                }
                .iconfont {
                    display: block;
                    width: 100%;
                    height: 100%;
                    /*font-size: 1rem;*/
                    font-size: .15rem;
                }
            }
            p {
                font-size: .16rem;
                width: 100%;
                color: #bbbbbb;
            }
            button {
                width: .7rem;
                height: .35rem;
                border-radius: .03rem;
                margin-top: .15rem;
                background: #ff4f4f;
                outline: none;
                color: #ddd;
            }
        }
    }





</style>
