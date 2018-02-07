<template>
    <div class="main">
        <mt-header title="拼团操作" fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <!-- 拼团商品 信息 -->
            <top-good :goods="goods"></top-good>
            <!-- 操作 按钮 -->
            <t-btn :goods="goods" @regiment="regiment"></t-btn>
            <!-- 拼团 玩法 -->
            <t-role></t-role>
            <!-- 更多好团 -->
            <t-more :teams="teams"></t-more>
        </div>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import topGood from './topgood'
    import tBtn from './btn'
    import tRole from './role'
    import tMore from './more'
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
                    url: 'groups.goods.openGroups',
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
            regiment(){
                let id = this.$route.query.id;
                let typ = this.$route.query.typs;
                this.$router.push({name:'groupConfirm',query:{id:id,typs:'groups'}})
            }
        },
        components:{
            topGood,
            tBtn,
            tRole,
            tMore
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