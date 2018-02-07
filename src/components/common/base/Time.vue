<template>
    <div class="interval">
        <div class="title">{{title}}</div>
        <div class="time">
            <span>{{hour | numLen}}</span>:
            <span>{{minute | numLen}}</span>:
            <span>{{second | numLen}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                times: '0',
                hour: '00',
                minute: '00',
                second: '00',
                title: ''
            }
        },
        props: {
            start: {
                type: Number,
                default(){
                    return 0
                }
            },
            end: {
                type: Number,
                default(){
                    return 0
                }
            }
        },
        methods: {
            getTime() {
                // 获取当前时间
                return new Promise((resolve, reject) => {
                    this.times = (new Date().getTime()/1000).toFixed(0)
                    // console.log('this.times')
                    // console.log(this.times)
//                    this.times = t
                    resolve(this.times)
                })
            },
            compare(s) {
                // 比较当前时间与开始或结束时间  返回t时间
                return new Promise((resolve, reject) => {
                    const now = s
                    const start = this.start
                    const end = this.end
                    let t = 0
                    if (now - start < 0) {
                        console.log('未开始')
                        this.title = '距离开始还有'
                        t = start - now
                        console.log('倒计时时间')
                        console.log(t)
                        resolve(t)
                    } else if (now - start > 0 && now < end) {
                        console.log('进行中')
                        this.title = '距离结束还有'
                        t = new Date(end - now)
                        console.log(t)
                        resolve(t)
                    } else {
                        console.log('结束')
                        this.title = '已结束'
                        reject('结束了')
                    }
                })

            },
            action(s) {
                // t倒计时
                console.log('参数s')
                console.log(s)
                return new Promise((resolve, reject) => {
                    if (s < 1) {
                        resolve()
                    } else {
                        console.log('s>1000')
                        console.log(s)
                        let t = s
                        let id = setInterval(() => {
                            t = t - 1
                            this.setTimeCount(t)
                            if (t < 0) {
                                console.log('t小于0结束')
                                clearInterval(id)
                                resolve()
                            }
                        }, 1000)
                    }
                })
            },
            setTimeCount(t) {
                const h = t % 3600
                let hour = t >= 3600 ? (t - h) / 3600 : 0
                const m = h % 60
                let min = h >= 60 ? (h - m) / 60 : 0
                const s = m % 1
                let second = m >= 1 ? (m - s) / 1 : 0
                this.hour = hour
                this.minute = min
                this.second = second
            },
            init() {
                console.log(this.start)
                console.log(this.end)
                this.getTime()
                    .then(this.compare)
                    .then(this.action)
                    .then(() => {
                    this.init()
                }).catch((error) => {
                    console.log('catch')
                    this.hour = '00'
                    this.minute = '00'
                    this.second = '00'
                })
            }
        },
        watch:{
            start(v){
                this.init()
            }
        },
        filters: {
            numLen(value) {
                const len = 2
                let valueLen = String(value).length
                if (valueLen <= len) {
                    return `${'0'.repeat(len - valueLen) + value}`
                } else if (valueLen > len) {
                    return '99'
                }
            }
        },
        mounted(){
            this.init()
        }
    }
</script>
<style scoped>
    .interval {
        width: 1rem;
    }
    .title {
        color: #000;
        font-size: .12rem;
        margin-bottom: .02rem
    }
    .time {
        display: flex;
        justify-content: center;
        color: #999;
    }
    .time span {
        display: block;
        color: #fff;
        width: .2rem;
        height: .2rem;
        background: rgba(51, 51, 51, 0.71);
        font-size: .1rem;
        line-height: .2rem;
        border-radius: .03rem;
        margin: 0 .01rem;
    }
</style>
