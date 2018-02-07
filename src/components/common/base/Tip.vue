<template>

    <div class="slot">
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
    </div>

</template>
<script>
    export default {
        data () {
            return {}
        },
        props: {
            tip:{
                type: Object,
                required: true,
            }
        },
        methods: {
            go(){
                this.$router.push({name:this.tip.route,query:this.tip.query})
            }
        },
    }
</script>
<style scoped>
    .slot {
        width: 100%;
        /*padding-top: .9rem;*/
    }
    .tip {
        /* width: 1.75rem; */
        margin: 0 auto;
    }
    .logo {
        width: 1.6rem;
        /* height: .76rem; */
        margin: 0.5rem auto .1rem;
    }
    .logo img {
        width: 100%;
        height: 100%;
    }
    .logo .iconfont {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 1rem;
        font-size: .15rem;
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
</style>
