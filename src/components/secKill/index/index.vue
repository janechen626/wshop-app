<template>  
    <div class="main">
        <div class="container">
            <div class="sec-kill">
                <div class="time-bar">
                    <div :class="{cur:v.id == timeid}" class="clock" v-for="(v,i) in times" :key="i" @click="timeChange(v)">
                        <p class="time">{{v.time}}:00</p>
                        <p class="txt" v-if="v.status==1">即将开始</p>
                        <p class="txt" v-else>抢购中</p>
                    </div>
                </div>
                <div class="meeting-place" v-if="rooms.length >= 1">
                    <div :class="['title',{cur:v.id == roomid}]" v-for="(v,i) in rooms" :key="i" @click="meetChange(v.id)">{{v.title}}</div>
                </div>
                <div class="kill-content">
                    <div class="top">
                        <p v-if="timeobj.status==0">抢购中 先下单先得哦</p>
                        <p v-else-if="timeobj.status==1">即将开始 先下单先得哦</p>
                        <p v-else>还可以继续抢购哦</p>
                        <!-- <div class="right" v-if="timeobj.status==1">
                            距开始
                        </div>
                        <div class="right" v-else>
                            距结束
                        </div> -->
                        <div class="right">
                            <cut-down :start="timeobj.starttime" :end="timeobj.endtime" ></cut-down>
                        </div>
                    </div>
                    <kill-list :item="list" :timeobj="timeobj"></kill-list>
                </div>
            </div>
        </div>
        <v-tabbar></v-tabbar>
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import util from './../../../api/util'
    import killList from './killList'
    import vTabbar from '../../common/Tabbar/Tabbar'
    import list from './../../../assets/mixins/list'
    import cutDown from '../../common/base/Time'
    export default {
        data() {
            return {
                rooms:[],
                times:[],
                taskid:'',
                roomid:'',
                timeid:'',
                timeobj:{
                    starttime: 0,
                    endtime:0
                }
            }
        },
        mixins: [list],
        methods: {
            init(roomid){
                let _this = this;
                util.request({
                    url: 'seckill',
                    data: {
                        roomid:roomid
                    },
                    method: 'get',
                    success(res){
                        _this.rooms = res.data.rooms;
                        _this.times = res.data.times;
                        // roomid, timeid,taskid 赋值
                        _this.taskid = res.data.taskid;
                        _this.roomid = res.data.roomid;
                        _this.timeid = res.data.timeid;
                        _this.getSeckill();
                    }
                })
            },
            timeChange(v){
                this.timeid = v.id;
                this.getSeckill();
            },
            meetChange(i){
                this.roomid = i;
                this.init(i);
            },
            getSeckill(){
                let _this = this;
                util.request({
                    url: 'seckill.lists',
                    data: {
                        taskid: this.taskid,
                        roomid: this.roomid,
                        timeid: this.timeid
                    },
                    method: 'post',
                    success(res){
                        _this.list = res.data.goods;
                        _this.timeobj = res.data.time;
                        console.log('_this.timeobj',_this.timeobj);
                    }
                })
            }
        },
        components:{
            killList,
            vTabbar,
            cutDown
        },
        mounted(){
            this.init('');
        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/index.less';
.container{
    .sec-kill{
        .time-bar{
            display: flex;
            background: #fff;
            padding: .1rem 0rem;
            .clock{
                display: flex;
                flex-direction: column;
                margin: 0 .2rem;
                .time{
                    font-size: .2rem;
                }
                .txt{
                    font-size: .12rem;
                }
            }
            .cur{
                color: @themeColor;
            }
        }
        .meeting-place{
            display: flex;
            background: #fff;
            margin-top: .1rem;
            .title{
                font-size: .16rem;
                height: .36rem;
                line-height: .36rem;
                padding: 0 .3rem;
            }
            .cur{
                color: @themeColor;
                border-bottom: .02rem solid @themeColor;
            }
        }
        .kill-content{
            .top{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: .12rem .2rem;
            }
        }
    }
}
</style>