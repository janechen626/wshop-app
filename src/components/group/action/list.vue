<template>
    <ul>
        <router-link :to="{name:'groupProduct',query:{id:v.id}}" v-for="(v,i) in teams" :key="i"  tag="li">
            <img :src="v.thumb" alt="">
            <div class="title">{{v.title}}</div>
            <p class="price">￥{{v.groupsprice}}<span>￥{{v.price}}</span></p>
        </router-link>
    </ul>
</template>

<script>
    import util from '../../../api/util'
    export default {
        data() {
            return {
 
            }
        },
        props:{
            teams:{
                type:Array,
                required:true
            }
        },
        methods: {
            
        },
        mounted(){
            
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
            display: flex;
            flex-direction: column;
            background: #fff;
            width: 48%;
            margin: 1%;
            > img{
                width: 1.6rem;
                height: 1.6rem;
                margin: 0 auto;
            }
            .title{
                font-size: 15px;
                font-weight: 600;
                text-align: left;
                padding-left:.1rem;
            }
            .price{
                font-size: 14px;
                color: @themeColor;
                text-align: left;
                font-weight: 600;
                padding-left:.1rem;
                span{
                    text-decoration: line-through;
                    font-size: 12px;
                    color: #666;
                    font-weight: 100;
                    margin-left: .05rem;
                }
            }
        }
    }
    
</style>