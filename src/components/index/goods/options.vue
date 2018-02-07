<template>

    <div class="popup-box">
        <img :src="thumb" alt="">
        <div class="popup-info">
          <p class="title" v-if="marketprice">￥{{marketprice}}</p>
          <p class="title" v-else>￥{{price}}</p>
          <p class="balance" v-if="total">库存 <span>{{total}}</span> 件</p>
          <p class="balance" v-else>库存 <span>{{maxTotal}}</span> 件</p>
          <p class="op">{{selectoption}}{{opitiontitle}}</p>
        </div>
        <div class="type-box">
          <div class="types" v-for="(v1,i1) in spec" :key="i1">
              <span class="type-title">{{v1.title}}</span>
              <div class="type">
                <span class="typeitem" :class="{'tActive':tselect[i1]==i2}" v-for="(v2,i2) in v1.items" :key="i2" @click="tabtype(i1,i2)">{{v2.title}}</span>
              </div>
          </div>
        </div>
        <div class="cal-box">
          <p>数量</p>
          <div>
              <button class="reduce-down" @click="reduce(num)">-</button>
              <input class="num-box" disabled v-model="num"/>
              <button class="add-up" @click="add">+</button>
          </div>
        </div>
        <!-- 判断是否有库存 -->
        <div v-if="zero" class="confirm">
          <!-- 判断是否可以直接购买 -->
          <template v-if="buyRight">
            <div @click="addCart()" class="addshop" v-if="canAddCart">加入购物车</div>
            <div @click="buynow">立即购买</div>
          </template>
          <template v-else>
            <template v-if="hasselect">
              <div @click="addCart()" class="addshop" v-if="canAddCart">加入购物车</div>
              <div @click="buynow">立即购买</div>
            </template>
            <div class="gray" v-else>请选择规格</div>
          </template>
          
        </div>
        <div v-else class="confirm">
          <div class="gray">暂无库存</div>
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
        props: {
          zero:{
            type: Number,
            required: true
          },
          spec:{
              type: Array,
              // required: true
          },
          maxTotal:{
            //type: Number,
            // required: true
          },
          total:{
            //type: Number,
            // required: true
          },
          marketprice:{
            //type: Number,
            // required: true
          },
          price:{
            type: Number,
            // required: true
          },
          num:{
            type: Number,
            required: true
          },
          tselect:{
            type: Array,
            required: true
          },
          selectoption:{
            type: String,
            required: true
          },
          opitiontitle:{
            type: String,
            required: true
          },
          hasselect:{
            type:Boolean,
            // required: true
          },
          buyRight:{
            type:Boolean,
            // required: true
          },
          canAddCart:{
            type: Number
          },
          thumb:{
            type: String
          }
        },
        methods: {
          reduce(){
            this.$emit('reduce');
          },
          add(){
            this.$emit('add');
          },
          tabtype(i1,i2){
            this.$emit('tabtypes',i1,i2);
          },
          buynow () {
            this.$emit('buynow');
          },
          addCart () {
            this.$emit('addCart');
          }
        }
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/common.less';

  .popup-box {
    width: 100%;
  }

  .popup-box > img {
    width: .8rem;
    height: .8rem;
    border-radius: .03rem;
    border: @border;
    position: absolute;
    left: .12rem;
    top: -.12rem;
    background: #fff;
  }

  .popup-box > div.popup-info {
    text-align: left;
    position: absolute;
    left: 1.02rem;
    top: .06rem;
    color: #000;
  }

  .popup-box > div.popup-info .title {
    font-size: .16rem;
    color: @themeColor;
  }

  .popup-box > div.popup-info .balance {
    font-size: .14rem;
    margin-left: .02rem;
  }
  div.popup-info .balance span{
    font-size: .14rem;
    color: @themeColor;
  }
  .popup-box > div.popup-info .op{
    font-size: .12rem;
    color: #999;
    .text-overflow(2);
  }
  .popup-box > .confirm {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    color: #fff;
    font-size: .16rem;
    height: .46rem;
    display: flex;
  }
  .confirm>div {
    flex: 1;
    height: 100%;
    background-color: #fd5555;
    line-height: .46rem;
  }
  .confirm .addshop {
    background-color: #fe9402;
  }
  .confirm > div.gray{
      background-color: rgba(0, 0, 0, 0.2);
  }

  .cal-box {
    margin-bottom: .46rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .1rem;
    height: .65rem;
  }

  .cal-box > p {
    font-size: .13rem;
    color: #999;
  }

  .cal-box > div {
    width: 1.4rem;
    border: 1px solid #dedede;
    // height: .35rem;
  }

  .cal-box > div > button {
    float: left;
    height: .33rem;
    line-height: .33rem;
    width: .37rem;
    background: #eee;
    font-weight: bold;
    font-size: .15rem;
    border: none;
  }

  .cal-box > div > button.add-up {
    float: right;
  }

  .cal-box > div > input.num-box {
    width: .62rem;
    height: .33rem;
    text-align: center;
    border: none;
  }
  /*规格*/
  .type-box {
    border-top: @border;
    max-height: 3rem;
    overflow: hidden;
    overflow-y: scroll;
    margin:.8rem .1rem 0;
  }

  .types {
    display: flex;
    flex-direction: column;
    padding:.1rem 0 0;
    border-bottom: @border;
  }

  .type-title {
    text-align: left;
    margin-bottom: .08rem;
    font-size: 14px;
  }

  .type {
    display: flex;
    flex-wrap: wrap;
  }

  .type .typeitem {
    display: inline-block;
    background:#f7f7f7;
    border-radius: .04rem;
    font-size: 13px;
    color: #232326;
    padding: .05rem .08rem;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: .69rem;
    max-width: 98%;
    box-sizing: border-box;
    text-align: center;
    margin-right: .1rem;
  }

  .type .tActive {
    color: red;
    background: @themeColor;
    color: #fff;
  }

  .starActive {
    color: #EC5151;
  }

  .pic-text {
    width: 100%;
  }

  .mint-header {
    z-index: 100;
  }
  
</style>