<template>
    <div>倒计时:{{time}}</div>
</template>

<script>
    import util from '../../../api/util'
    export default {
        data() {
            return {
			    now: 0
            }
        },
        props:{
            endtime:{
                type: Number,
                // required: true
            }
        },
        methods: {
            formate(time){

                if(time >= 0){

                    let d = parseInt(time / 60 / 60 / 24);//计算剩余天
                    let h = parseInt(time / 60 / 60 % 24);//计算剩余小时
                    let m = parseInt(time / 60 % 60);//计算剩余分钟
                    let s = parseInt(time % 60);//计算剩余秒数

                    h = h < 10 ? h : h;
                    m = m < 10 ? m : m;
                    s = s < 10 ? s : s;

                    return d + '天' + h + '小时' + m + '分钟' + s + '秒';

                }else{

                    return '活动已经结束'

                }

                
            }
        },
        computed:{
            time: function(){
                let time = this.formate(new Date(this.endtime).getTime() - this.now);
                return time;
            }
        },
        mounted(){
            let _this = this;
                setInterval(function(){
                    _this.now = new Date().getTime();
                }, 1000);
            }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';

    div{
        font-size: 12px;
    }
</style>