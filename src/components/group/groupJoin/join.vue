<template>
    <div class="main">
        <mt-header title="参团" fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <!-- 拼团商品 信息 -->
            <top-good :goods="goods"></top-good>
            <!-- 参团列表 -->
            <j-list :teams="teams"></j-list>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import topGood from '../action/topgood'
    import jList from './list'
    export default {
        data() {
            return {
                goods:{},
                teams:[]
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            getInfo(){
                let _this = this;
                util.request({
                    url: 'groups.goods.fightGroups',
                    data:{
                        id: this.$route.query.id
                    },
                    method:'get',
                    success(res){
                        _this.goods = res.data.goods;
                        _this.teams = res.data.teams;
                    }
                })
            },
            goJoin(){
                let id = this.$route.query.id;
                let tid = this.teams.id;
                this.$router.push({name:'groupConfirm',query:{id:id,typ:'groups',tid:tid}})
            }
        },
        components:{
            topGood,
            jList
        },
        computed: {
        },
        mounted(){
            this.getInfo();
        }

    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(100);
        .container{
            .scroll-view(100%);
            background: #f7f7f7;
        }
    }

</style>