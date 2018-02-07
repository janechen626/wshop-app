<template>
    <div class="title-tab">
        <div :class="['cell',{active:index == select}]" v-for="(i,index) in list" @click="tab(index,i.status)">{{i.title}}</div>
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
            tab(i,index){
                this.select=i
                this.$emit('change',index)
            }
        }
    }
</script>

<style lang="less" scoped>
    .title-tab {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        border-bottom: 0.01rem solid rgba(223, 223, 223, 0.43);
        height: .46rem;
        line-height: .46rem;
        .cell {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            height: .46rem;
            font-size: .14rem;
        }
        .active {
            color: #ef4f4f;
            border-bottom: 2px solid #ef4f4f;
        }

    }
</style>