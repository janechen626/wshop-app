<template>
    <div class="main">
        <mt-header title="购物车" fixed></mt-header>
        <div class="container">

        </div>
    </div>
</template>

<script>
    import util from '../../../api/util'
    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        components:{

        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/less/index.less';
    .main {
        .page-view(1);
        .container {
            .scroll-view(100%);
            margin-top: .4rem;
        }
    }

</style>