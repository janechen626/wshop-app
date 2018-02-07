<template>
    <div class="main">
        <mt-header title="团详情" fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <t-tab :select="select" @change="status"></t-tab>
        <div class="container">
            <!--tab导航栏-->
            <t-tablist :list="list" :loading="loading" @loadmore="loadorder" @cancel="cancel" @confirm="confirm" @remind="remind" @delete="refund">
            </t-tablist>
        </div>
        <group-bar></group-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import groupBar from '../../common/Tabbar/GroupBar.vue'
    import list from './../../../assets/mixins/list'
    import order from './../../../assets/mixins/order'
    import tTab from '../groupList/tab.vue'
    import tTablist from '../groupList/tablist.vue'
    import { MessageBox,Toast } from 'mint-ui'
    export default {
        data() {
            return {
                select:'0',
            }
        },
        mixins: [list,order],
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            status(i){
                this.select=i;
                this.getOrder(i)
            },
            getOrder(status){
                let params = {
                    url: 'groups.team.lists',
                    opt: {
                        success: status,
                    }
                };
                this.scrollTop('.container').then(this.listInit()).then(this.getList(params))
            },
            getInitOrder(){
                this.select='0';
                let params = {
                    url: 'groups.team.lists',
                    opt: {
                        success: 0,
                    }
                };
                this.scrollTop('.container').then(this.getList(params))
            },
            loadorder(){
                let _this=this;
                let params = {
                    url: 'groups.team.lists',
                    opt: {
                        status: _this.select,
                    }
                };
                this.loadMore(params)
            },

        },
        mounted () {
            this.getInitOrder();
        },

        components: {
            tTab,
            tTablist,
            groupBar,
        }

    }
</script>

<style lang="less" scoped>

    @import '../../../assets/less/index.less';

    .main {
        .page-view(10);
        .tab {
            position: fixed;
            top:.4rem;
            width: 100%;
            background-color: #fff;
            z-index: 100;
        }
        .container {
            background: #f7f7f7;
            .scroll-view(100%);
            .header-height;
            padding-top: .8rem;
        }
    }
</style>