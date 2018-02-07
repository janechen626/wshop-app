<template>
    <div class="good-list">
        <h2>更多好团</h2>
        <t-list :teams="teams"></t-list>
    </div>
</template>

<script>
    import util from '../../../api/util'
    import tList from './list'
    export default {
        data() {
            return {
 
            }
        },
        props:{
            teams:{
                type:Array,
                required:true
            },
        },
        methods: {
            
        },
        mounted(){
            
        },
        components:{
            tList
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    h2{
        font-size: 12px;
        padding: .12rem;
    }
</style>