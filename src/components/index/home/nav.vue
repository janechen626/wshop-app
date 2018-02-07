<template>
    <div class="nav-box" >
        <div class="list"  v-for="(v, i) in nav" :key="i" @click="navgation(v.id)">
            <img v-if="v.thumb" :src="v.thumb"/>
            <img v-if="v.icon" :src="v.icon" alt="">
            <h3 v-if="v.navname">{{v.navname}}</h3>
            <h3 v-if="v.name">{{v.name}}</h3>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {
            nav: {
                type: Array,
                required: true
            },
            jumpTo: {
                type: String,
                required: true
            },
            query:{
                type: Object,
            }
        },
        methods:{
            navgation(o){
                let _this=this
                console.log(this.jumpTo);
                if(_this.$route.name ==='index' && o==18){
                    this.$router.push({name:'groupIndex'})
                }else if(_this.$route.name ==='index' && o==20){
                    this.$router.push({name:'integralIndex'})
                }else {
                    this.$router.push({name:this.jumpTo,query:{id:o}})
                }
            }
        }

    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/common.less';

    .nav-box {
        display: flex;
        flex-wrap: wrap;
        background: #fff;
        padding-bottom: .15rem;
        .list {
            width: 25%;
            margin-top: .15rem;
            img {
                width: .46rem;
                height: .46rem;
            }
            h3 {
                font-size: 12px;
                height: .2rem;
                line-height: .2rem;
                overflow: hidden;
            }
        }
    }
</style>
