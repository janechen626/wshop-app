
<template>
    <li class="user">
        <div class="info" @click.prevent="getMyAddress(item)">
            <span class="name">{{item.realname}}</span>
            <span class="tel">{{item.mobile}}</span>
        </div>
        <div class="area" @click.prevent="getMyAddress(item)">
            {{item.province}}{{item.city}}{{item.area}}{{item.address}}
        </div>
        <div class="set">
            <div :class="['default',{'blue':isChecked}]" @click="isDefault(item.id)">
                <span :class="['iconfont',{'checked':isChecked} ]">&#xe69a;</span>
                <span :class="['title',{'blue':isChecked}]">默认地址</span>
            </div>
            <div class="right">
                <span @click.stop="edit(item.id)"><span class="iconfont edit">&#xe64e;</span>编辑</span>
                <span @click="deleteAddress(item.id)"><span class="iconfont tranch">&#xe6db;</span>删除</span>
            </div>
        </div>
    </li>
</template>

<script>
    import util from '../../../../api/util'
    export default {
        data(){
          return {
              index:0
          }
        },
        props:{
            item: {
                type:Object,
                required: true
            },
            isChecked: {
                type:Boolean,
            }
        },
        methods: {
            goBack(){

            },
            isDefault(i){
                this.$emit('isdefault',i)
            },
            edit(i){
                this.$emit('edit',i)
            },
            deleteAddress(i){
                this.$emit('delete',i)
            },
            getMyAddress(i){
              this.$emit('select',i)
            },
        },
        mounted(){
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../../assets/less/common.less';
    .user {
        height: 1.2rem;
        border-bottom: 1px solid #dadada;
        text-align: left;
        .info {
            display: flex;
            padding: 0 .22rem;
            padding-top: .1rem;
            line-height: .22rem;
            margin-bottom: .04rem;
            .name {
                flex: 1;
                font-size: .12rem;
            }
            .tel {
                text-align: right;
                flex: 1;
                font-size: .1rem;
            }
        }
        .area {
            font-size: .12rem;
            padding: 0 .22rem;
            line-height: .2rem;
            height: .45rem;
            border-bottom: 1px solid #eee;
            .text-overflow(2);
            padding-bottom: .04rem;
        }
        .set {
            display: flex;
            padding: 0 .22rem;
            line-height: .38rem;
            .default {
                font-size: .11rem;
                flex: 1;
                /*color: #0076ff;*/
                color: #000;
                .iconfont {
                    color: #fff;
                    border: 1px solid #000;
                    border-radius: 50%;
                    font-size: .15rem;
                }
                .checked {
                    color: #FE5455;
                    border: none;
                    font-size: .15rem;
                };
                .title {
                    color: #000;
                    font-size: .11rem;
                    display: inline-block;
                    margin-left: .02rem;
                }
                .blue {
                    color: #FE5455;
                }
            }



            .right {
                flex: 1;
                text-align: right;
                span {
                    font-size: .11rem;
                    color: #666;
                    .tranch {
                        font-size: .22rem;
                        position: relative;
                        top:.025rem;

                    }
                    .edit {
                        font-size: .16rem;
                        margin-right: .03rem;
                        position: relative;
                        top:.01rem;
                    }
                }
            }
        }
    }
</style>
