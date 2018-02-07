<template>
    <div class="main">
        <mt-header title="收货地址 " fixed>
            <a slot="left" @click="goBack">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="container">
            <ul class="user__list">
                <address-info v-for="(i,index) in lists" :item="i" :isChecked="i.isdefault==1" :key="index"
                              @isdefault="setDefault" @delete="deleteAddress" @edit="edit"
                              @select="confirm"></address-info>
            </ul>
        </div>
        <footer>
            <div class="add" @click="add">
                <span class="iconfont">&#xe6cd;</span>
                添加新地址
            </div>
        </footer>
        <transition name="slide">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
    import util from '../../../../api/util'
    import addressInfo from './addressInfo.vue'
    import {mapState, mapMutations, mapGetters} from 'Vuex';

    export default {
        data() {
            return {
                lists: [],
            }
        },
        methods: {
            goBack() {
                this.$route.query.type=1
                this.$router.go(-1)
            },
            init() {
                return new Promise((resolve,reject)=>{
                    let _this=this
                    console.log('init run')
                    util.request({
                        url: 'member.address.get_list',
                        method: 'get',
                        data: {},
                        success: function (res) {
                            _this.lists = res.data.list
                            resolve()
                        },
                        error: function (error) {
                            console.log(error)
                            reject()
                        },
                        complete: function () {

                        }
                    })
                })


            },
            setDefault(i) {
                let _this = this
                console.log(i)
                 util.request({
                     url:'member.address.set_default',
                     method:'get',
                     data:{
                        id:i
                     },
                     success:function (res) {
                         _this.lists.forEach((item, index) => {
                             if (item.id === i) {
                                 item.isdefault = 1
                             } else {
                                 item.isdefault = 0
                             }
                         })
                        
                     },
                     error:function (error) {
                         console.log(error)
                     },
                     complete:function () {

                     }
                 })

                console.log(_this.lists)
            },
            deleteAddress(i) {
                let index = ''
                //this.lists = this.lists.splice(index, 1)
                let _this = this
                util.request({
                    url:'member.address.delete',
                    method:'get',
                    data:{
                        id:i
                    },
                    success:function (res) {
                        _this.lists.forEach((item, index) => {
                            if (item.id === i) {
                                item.isdefault = 1
                            } else {
                                item.isdefault = 0
                            }
                        })
                         _this.init();
                    },
                    error:function (error) {
                        console.log(error)
                    },
                    complete:function () {

                    }
                })

            },
            edit(i) {
                //app  确认订单
                if(this.$route.name==='addList'){
                    this.$router.push({name:'editAddress',query:{id:i}})
                }
                //积分商城  确认订单
                if(this.$route.name === 'icaddList'){
                    this.$router.push({name:'iceditAddress',query:{id:i}})
                }
                //积分商城  订单详情
                if(this.$route.name === 'iaddList'){
                    this.$router.push({name:'ieditAddress',query:{id:i}})
                }
                //团购  确认订单
                if(this.$route.name === 'gaddList'){
                    this.$router.push({name:'geditAddress',query:{id:i}})
                }

                if(this.$route.name === 'address'){
                    this.$router.push({name:'edit',query:{id:i}})
                }

            },
            confirm(v) {
                let _this = this
                // if (this.$route.name === 'addList' || this.$route.name === 'iaddList' || this.$route.name === 'gaddList') {
                    _this.GET_USERADDRESS(v)
                    _this.$router.go(-1)
                //}
            },
            add(){
                //app  确认订单
                if(this.$route.name === 'addList'){
                    this.$router.push({name:'addAddress'})
                }
                //积分商城  确认订单
                if(this.$route.name === 'icaddList'){
                    this.$router.push({name:'icaddAddress'})
                }
                //积分商城  订单详情
                if(this.$route.name === 'iaddList'){
                    this.$router.push({name:'iaddAddress'})
                }
                //团购  确认订单
                if(this.$route.name === 'gaddList'){
                    this.$router.push({name:'gaddAddress'})
                }

                if(this.$route.name === 'address'){
                    this.$router.push({name:'add'})
                }

            },
            ...mapMutations([
                'GET_USERADDRESS'
            ]),
        },
        beforeRouteUpdate(to, from, next){
            let _this = this
                _this.init().then(next());
            next()
        },
        components: {
            addressInfo
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../../assets/less/index.less';
    .main {
        .page-view(10);
        .container {
            .scroll-view(100%);
            margin-top: .4rem;
            padding-bottom: .5rem;
            .user__list {
                width: 100%;
                padding-bottom: .5rem;
            }
        }
        footer {
            width: 100%;
            position: fixed;
            bottom: 0;
            text-align: center;
            height: .5rem;
            background-color: #fff;
            .add {
                display: inline-block;
                line-height: .5rem;
                color: #FE5455;
                .iconfont {

                }
            }
        }
    }
</style>