<template>
    <div class="title-tab">
        <div :class="['cell',{active:0 == select}]" @click="tab(0)">全部优惠券</div>
        <div :class="['cell',{active:index == select}]" v-for="(i,index) in list" @click="tab(i.id)" :key="index">{{i.name}}</div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    export default {
        data() {
            return {
                select:0
            }
        },
        props:{
            list:{
                type:Array,
                required:true
            }
        },
        methods: {
            tab(i){
                this.select = i
                this.$emit('change',i)
            }
        }
    }
</script>

<style lang="less" scoped>
    .title-tab {
        border-bottom: 0.01rem solid rgba(223, 223, 223, 0.43);
        height: .46rem;
        line-height: .46rem;
        .cell {
            height: .46rem;
            font-size: .14rem;
            width: 1rem;
        }
        .active {
            color: #ef4f4f;
            border-bottom: 2px solid #ef4f4f;
        }

    }
</style>