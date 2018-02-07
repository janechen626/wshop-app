<template>
  <div class="content">
    <mt-header title="购物车" class="is-fixed header"></mt-header>

    <div class="container">
        <div class="goods-content" v-show="getShCartData.length">
          <ul class="goods-list">
            <li class="clearfix" v-for="(v,i) in getShCartData" :key="i">
            <!-- <li class="clearfix" v-for="(v,i) in info.activityList" :key="i"> -->
              <label class="mint-checklist-label fl">
                <div class="mint-checkbox">
                  <input @click="nowChecked(v,i)" type="checkbox" class="mint-checkbox-input" :checked="v.selected == 1" >
                  <span class="mint-checkbox-core"></span>
                </div>
              </label>
              <div @click="goProductDetail(v)">
                <div class="goods-img fl">
                  <img :src="v.thumb">
                </div>
                <div class="goods-info fl">
                  <h3 class="goods-title lr1">{{v.title}}</h3>
                  <div class="goods-option">{{v.optiontitle}}</div>
                  <div class="goods-attr">
                    <span class="goods-price">
                      ¥
                      <span class="goods-intPrice">{{v.marketprice|getIntNmb}}</span>
                      <span class="goods-folatPrice">{{v.marketprice|getFloatNmb}}</span>
                    </span>
                    <del>¥{{v.productprice}}</del>
                  </div>
                  <!--<div class="goods-num">X<i>{{v.total}}</i></div>-->
                </div>
              </div>
              <div class="goods-total fr">
                <div class="goods-del" @click="delItem(v.id)">
                  <i class="iconfont">&#xe6db;</i>
                </div>
                <div class="dt_sku_numm_m clearfix">
                  <span class="dt_subt fl" @click="reduceTotal(v,i)">-</span>
                  <span class="dt_num fl">{{v.total}}</span>
                  <span class="dt_add" @click="addTotal(v,i)">+</span>
                </div>
              </div>
            </li>
          </ul>
      </div>
      <div class="nogoods" v-show="!getShCartData.length">
        <div class="nogoods-tp">
          <img src="../../../assets/images/shoppingCart-02.png">
        </div>
        <div class="nogoods-mid">
          <h3>购物车居然是空的</h3>
          <h4>再忙，也要记得买点什么犒劳自己~</h4>
        </div>
      </div>
      </div>
    
    <div class="total_area clearfix" v-if="!getShCartData.length <= 0">
      <label class="mint-checklist-label fl">
        <span class="mint-checkbox fl">
          <input type="checkbox" class="mint-checkbox-input" value="当前值" :checked="isTrue"  @click="allCheckBox">
          <span class="mint-checkbox-core"></span>
        </span>
        <span class="mint-checkbox-label">全选</span>
      </label>
      <div class="payment fr clearfix">
        <div class="payment-lf fl">
          <div>
            <h3>
              合计:
              <span class="goods-price">
                ¥
                <span class="goods-intPrice">{{defPrice|getIntNmb}}{{defPrice|getFloatNmb}}</span>
                <span class="goods-folatPrice"></span>
              </span>
            </h3>
            <h4>
              不含运费
            </h4>
          </div>
        </div>
        <div class="payment-lr fl lr1" @click="goConfirmorder()">
          结算({{defTotal}})
        </div>
      </div>
    </div>

    <v-tabbar></v-tabbar>
  </div>
</template>
<script>
import { Header, Checklist, MessageBox, Toast } from 'mint-ui';
import util from '../../../api/util'
import list from './../../../assets/mixins/list'
import { mapMutations, mapGetters } from 'Vuex';
import vTabbar from '../../common/Tabbar/Tabbar'
export default {
  data() {
    return {
      value1: [],
      getShCartData: [], //商品列表
      defPrice: 0,  //购物车总的价格
      defTotal: 0,  //购物车总的数量
      isTrue: false,  //全选状态
      goodsId: '',
      optionId: '',
      cartids: '',
      total: '',
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    mycartsInt() {  //购物车初始化
      let _this = this;
      util.request({
        url: 'member.cart.get_cart',
        data: {},
        method: 'post',
        success(res){
          // _this.getShCartData = res.data.list;
          _this.getShCartData = res.data.merch_list[0].list;
          _this.isTrue = res.data.ischeckall;//全选状态
          _this.defPrice = res.data.totalprice;
          _this.defTotal = res.data.total;
        }
      })
    },
    defState() { //初始化购物车总价和总数
      let _this = this;
        _this.isTrue = true;
      let allPrice = 0;
      let allTotal = 0;

      _this.getShCartData.map((v, i, arr) => {
        _this.getShCartData[i].selected = 1;
        allPrice += (Number(_this.getShCartData[i].marketprice) * Number(_this.getShCartData[i].total));
        allTotal += Number(_this.getShCartData[i].total);
      });
      _this.defPrice = allPrice;
      _this.defTotal = allTotal;
    },
    cartCalc(v){//添加或减少购物车商品数量
      let _this=this
      let params = {
        id: v.id,
        optionid: v.optionid,
        total: v.total
      }
      util.request({
        url: 'member.cart.update',
        data: params,
        method: 'post',
        success(res){
          _this.mycartsInt();
        }
      })
    },
    addTotal(v, i) {//加
        console.log('add')
      let _this = this;
      v.total++;
      if (_this.getShCartData[i].selected == true) {
        _this.defPrice = Number(_this.defPrice) + Number(v.marketprice);  //总价 + 当前价格
        _this.defTotal++;  //总数++
        _this.cartCalc(v);
      }
    },
    reduceTotal(v, i) {//减
      let _this = this
      let total = v.total;
      if (total > 1) {
        v.total--;
        if (_this.getShCartData[i].selected == true) {
          _this.defPrice = Number(_this.defPrice) - Number(v.marketprice);
          _this.defTotal--  //总数--
           _this.cartCalc(v);
        }
      }else{
        Toast({
          message: '数量不可小于1',
          position: 'middle',
          duration: 2000
        });
      }
    },
    allCheckBox() {//全选
      let _this = this;
      _this.isTrue = !_this.isTrue;  
      if (_this.isTrue === true) {
        _this.defState();
      } else {
        _this.getShCartData.map((v, i, arr) => {
          _this.getShCartData[i].selected = 0;
        })
        _this.defPrice = 0;
        _this.defTotal = 0;
      }
    },
    nowChecked(v, i) {//单选
      let _this = this;
      let myArr = [];
      _this.getShCartData[i].selected = !_this.getShCartData[i].selected;

      if (_this.getShCartData[i].selected == 1) {
        console.log('单机选中了',_this.defPrice)
        _this.defPrice += (Number(v.total) * Number(v.marketprice)); // 总价=当前单价*数量
        _this.defTotal += (Number(v.total));
      } else {
        console.log('单机取消选中',_this.defPrice)
        _this.defPrice -= (Number(v.total) * Number(v.marketprice));// 总价=当前单价*数量
        _this.defTotal -= (Number(v.total));
      }

      _this.getShCartData.map((v, i, arr) => {
        if (_this.getShCartData[i].selected == 1) {
          myArr.push(_this.getShCartData[i].selected);
          myArr.length == _this.getShCartData.length ? _this.isTrue = true : _this.isTrue = false;
        } else {
          _this.isTrue = false;
        }
      })
      
    },
    
    delGoods(v, i) {//删除
      MessageBox({ title: '确认要删除此商品吗?', message: '点击确认删除', showCancelButton: true }).then(action => {
        if (action == 'confirm') {//表示点击了确定
          let _this = this;
          let cartIds = [];

          if (this.getShCartData[i].selected == true) {
            _this.defPrice -= (Number(v.marketprice) * Number(v.total));
            _this.defTotal -= Number(v.total);
          }
          // _this.getShCartData.splice(i, 1);

          _this.getShCartData.map((v, i, arr) => {
            if (_this.getShCartData[i].selected == 1) {
              cartIds.push(_this.getShCartData[i].id);
            } 
          })

          util.request({
            url: 'member.cart.remove',
            data: {
              ids: cartIds
            },
            method: 'post',
            success(res){
              console.log('删除购物车',res)
               _this.mycartsInt();
            }
          })


        } else if (action == 'cancel') {//表示点击了取消
          console.log('点击了取消')
        }
      })
    },
    delItem(id){
        MessageBox({ title: '确认要删除此商品吗?', message: '点击确认删除', showCancelButton: true }).then(action => {
            if (action == 'confirm') {//表示点击了确定
                let _this = this;
                util.request({
                    url: 'member.cart.remove',
                    data: {
                        ids: [id]
                    },
                    method: 'post',
                    success(res){
                        console.log('删除购物车',res)
                        _this.mycartsInt();
                    }
                })
            } else if (action == 'cancel') {//表示点击了取消
                console.log('点击了取消')
            }
        })
    },
    goConfirmorder() {//确认订单
      let _this = this;

      if (Number(_this.defPrice) === 0) {
        Toast({
          message: '请选择商品',
          position: 'middle',
          duration: 2000
        });
        return;
      }

      util.request({
        url: 'order.create',
        data: {},
        method: 'get',
        success(res){
          _this.$router.push({ name: 'confirm' });
        }
      })

    },
    goProductDetail(v) {
      let goodsId = v.goodsid;
      this.$router.push({ name:'product', query: { id: goodsId } })
    }
  },
  filters: {
    getIntNmb: function(val) {
      val = Number(val).toFixed(2);
      var numIndex = val.indexOf('.');
      if (numIndex != -1) {
        return val.substring(0, numIndex)
      } else {
        return val
      }
    },
    getFloatNmb: function(val) {
      val = Number(val).toFixed(2);
      var numIndex = val.indexOf('.');
      if (numIndex != -1) {
        return val.substring(numIndex, val.length);
      } else {
        return ''
      }
    }
  },
  activated() {
    //this.mycartsInt();
  },
  mounted () {
    this.mycartsInt();
  },
  components: {
    vTabbar,
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/less/index.less';
.container {
    .scroll-view(100%);
}
.content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: @background;
  overflow: auto;
}


.router-link-active {
  color: #666;
}

.goods-list .mint-checklist-label {
  height: .5rem;
  width: 0.3rem;
  text-align: left;
  margin-top: 0.20rem;
  padding: 0rem;
}

.goods-list {
  padding-top: 0.45rem;
  margin-bottom: 1.1rem;
}

.goods-list li {
  height: 1rem;
  padding: 0.1rem;
  background: #fff;
  margin-top: 0.05rem;
}

.goods-img {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.1rem;
}

.goods-img img {
  display: block;
  width: 100%;
  height: 100%;
}

.goods-info {
  width: 1.66rem;
}

.goods-title {
  font-size: 0.14rem;
  color: #27272f;
  text-align: left;
}

.goods-attr {
  color: @themeColor;
  line-height: 0.2rem;
  position: relative;
  text-align: left;
  padding: 0.05rem 0rem;
  font-size: 0.28rem;
}

.goods-price {
  font-size: 0.12rem;
}

.goods-intPrice {
  font-size: 0.2rem;
}

.goods-folatPrice {
  font-size: 0.12rem;
}

.goods-attr del {
  color: #bebebe;
  font-size: 0.12rem;
}

.goods-num {
  text-align: left;
  font-size: 0.12rem;
  color: #27272f;
}

.goods-num i {
  font-size: 0.14rem
}

.goods-info .goods-option {
  font-size: 0.1rem !important;
  text-align: left;
  color: #999;
}


.mint-checkbox {
  font-size: 0.28rem;
}

.mint-checkbox-core {
  width: 0.2rem;
  height: 0.2rem;
  background: #FCFCFC;
  position: relative;
  bottom: .03rem;
}

.mint-checkbox-core::after {
  border: 0.02rem solid transparent;
  border-left: 0;
  border-top: 0;
  content: " ";
  top: 0.03rem;
  left: 0.06rem;
  position: absolute;
  width: 0.04rem;
  height: 0.08rem;
}

.dt_sku_numm_m {
  width: 1rem;
  border: 0.01rem solid #e2e2e2;
  position: absolute;
  bottom: 0rem;
  right: 0rem;
}

.dt_sku_numm_m span {
  float: left;
  width: 33.3%;
  height: 0.25rem;
  line-height: 0.25rem;
  text-align: center;
  font-size: 0.2rem;
  color: #6b6b6b;
  overflow: hidden;
}

.dt_sku_numm_m .dt_num {
  border: 0.01rem solid #e2e2e2;
  border-bottom: none;
  border-top: none;
  font-size: 0.15rem;
  color: #27272f;
}

.goods-del {
  position: absolute;
  top: 0rem;
  right: 0rem;
  font-size: 0.25rem;
}

.goods-del i {
  font-size: 0.28rem;
  color: #999;
}

.goods-total {
  height: 100%;
  position: relative;
}

.total_area {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  height: 0.50rem;
  padding: 0rem 0rem 0rem 0.1rem;
  border-top: 1px solid #e7e7e7;
  background: #fff;
}

.total_area .mint-checklist-label {
  padding: 0rem;
  display: block;
  width: .6rem;
  height: 0.50rem;
  line-height: 0.50rem;
  text-align: left;
  font-size: 0.28rem
}

.mint-checkbox-label {
  font-size: 0.14rem;
  color: #051b28;
  position: relative;
  bottom: .02rem;
}

.payment-lf {
  height: 0.50rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-lf h3 {
  font-size: 0.14rem;
  margin-right: 0.1rem;
}

.payment-lf h4 {
  font-size: 0.12rem;
  margin-right: 0.1rem;
  text-align: right;
}

.payment-lr {
  width: 1.10rem;
  height: 0.50rem;
  line-height: 0.50rem;
  font-size: 0.16rem;
  background: @themeColor;
  color: #fff;
  text-align: center;
}

.mint-checkbox-input:checked+.mint-checkbox-core {
  background-color: @themeColor;
  border-color: @themeColor;
}

.goods-price {
  color: @themeColor;
}

.mint-msgbox-confirm {
  color: @themeColor !important;
}

.nogoods {
  margin-top: 1.5rem;
}

.nogoods-tp {
  width: 1rem;
  height: 1rem;
  margin: 0 auto;
  /*border-radius: 50%;*/
  overflow: hidden;
}

.nogoods-tp img {
  display: block;
  width: 100%;
}

.nogoods h3 {
  color: #666;
  font-size: 0.16rem;
  text-align: center;
}

.nogoods h4 {
  color: #999;
  font-size: 0.14rem;
  margin-top: 0.2rem;
  text-align: center;
}

.nogoods-mid {
  margin-top: 0.2rem;
  font-size: 0.14em;
  color: #666;
}
</style>






