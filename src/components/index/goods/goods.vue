<template>
    <transition name="slide" v-if="silde">
        <div class="main">
            <mt-header title="商品详情 ">
                <a slot="left" @click="goBack">
                    <mt-button icon="back"></mt-button>
                </a>
            </mt-header>
            <div class="container">
                <!-- 轮播图 -->
                <mt-swipe class="banner" style="height:3.6rem;" :auto="2000" :show-indicators="true">
                    <mt-swipe-item v-for="(i, x) in slider" :key="x">
                        <img class="silder" :src="i" >
                    </mt-swipe-item>
                </mt-swipe>
                <!-- 秒杀专区 -->
                <div class="good-kill" :class="{pre:killStatus==1}" v-if="killStatus==0 || killStatus==1">
                    <div class="left">
                        <div class="price-box">
                            <div class="price">￥<span>{{killGood.price}}</span></div>
                            <div class="mark-price"><span>{{killGood.tag}}</span><p>￥{{goodsInfo.maxprice}}</p></div>
                        </div>
                        <div class="sale-box" v-if="killStatus==0">
                            <p>已售出 {{killGood.percent}} %</p>
                        </div>    
                    </div>
                    <div class="clock-box">
                        <cut-down :start="killGood.starttime" :end="killGood.endtime" ></cut-down>
                    </div>
                </div>
                <!-- 基本信息 -->
                <div class="base-info">
                    <div class="title"><span v-if="goodsInfo.ispresell == 1">预</span>{{goodsInfo.title}}</div>
                    <div class="subtitle" v-if="goodsInfo.subtitle">{{goodsInfo.subtitle}}</div>
                    <div class="price" v-if="!goodsInfo.seckillinfo">
                        <div class="min-max" v-if="goodsInfo.ispresell > 0 && goodsInfo.preselltimeend == 0 || goodsInfo.preselltimeend > now">￥{{goodsInfo.presellprice}}</div>
                        <div class="min-max" v-else>
                            <span v-if="goodsInfo.minprice == goodsInfo.maxprice">￥{{goodsInfo.minprice}}</span>
                            <span v-else>￥{{goodsInfo.minprice}} ~ ￥{{goodsInfo.maxprice}}</span>
                        </div>
                        <div v-if="goodsInfo.isdiscount && goodsInfo.isdiscount_time >= now">￥{{goodsInfo.productprice}}</div>
                        <div v-else>
                            <span class="market-price" v-if="goodsInfo.productprice > goodsInfo.minprice">￥{{goodsInfo.productprice}}</span>
                        </div>
                    </div>
                    <!-- 限时购 -->
                    <!-- <div class="discount-box" v-if="goodsInfo.istime > 0">
                        <cut-down :start="parseInt(goodsInfo.timestart)" :end="parseInt(goodsInfo.timeend)"></cut-down>
                    </div> -->
                    <div class="btm">
                        <span>快递：{{goodsInfo.dispatchprice == 0 ? '包邮' : goodsInfo.dispatchprice}}</span>
                        <template v-if="!goodsInfo.seckillinfo || goodsInfo.seckillinfo && killGood.status == 1">
                            <span v-if="goodsInfo.showtotal == 1">库存：{{goodsInfo.total}}</span>
                            <span>销量：{{goodsInfo.sales}}{{goodsInfo.unit}}</span>
                        </template>
                        <span v-if='goodsInfo.province != "请选择省份" && goodsInfo.city != "请选择城市"'>{{goodsInfo.province}}{{goodsInfo.city}}</span>
                    </div>
                </div>
                <!-- 会员专区 -->
                <div v-if="goodsInfo.seckillinfo ==''" style="padding-bottom:.1rem;">
                    <div class="vip-discount" v-if="goodsInfo.buyagain > 0">
                        <p>此商品二次购买 可享受<span class='text-danger'>{{goodsInfo.buyagain}}</span> 折优惠</p>
                        <p v-if="!goodsInfo.buyagain_sale">二次购买的时候 不与其他优惠共享</p>
                    </div>
                    <div class="vip-discount" v-if="goodsInfo.isdiscount == 0 || goodsInfo.isdiscount != 0 && goodsInfo.isdiscount_time < now">
                        <p v-if='!goodsInfo.memberprice ==  ""&& goodsInfo.memberprice != goodsInfo.minprice && !goodsInfo.levelbuy == 0'>
                            您的会员等级是<span class='text-danger'>{{goodsInfo.memberprice.levelname}}</span> 可享受<span class='text-danger'>￥{{goodsInfo.memberprice.price}}</span> 的价格
                        </p>
                    </div>
                    <div class="vip-discount" v-if="goodsInfo.citys.length > 0">
                        <p>不配送区域：<span v-for="(v,i) in goodsInfo.citys" :key="i"></span>{{v}}</p>
                    </div>
                </div>
                <!-- 活动时间 -->
                <div class="activity-ct" v-if="goodsInfo.ispresell == 1 && (goodsInfo.preselltimestart < now && goodsInfo.preselltimeend > now || goodsInfo.preselltimeend == 0)">
                    <span>{{goodsInfo.isdiscount_title}}</span>
                    <div>
                        <p v-if="goodsInfo.preselltimeend > 0">结束时间：{{goodsInfo.isdiscount_time}}</p>
                        <p v-if="goodsInfo.presellsendtype > 0">预计发货： 购买后{{goodsInfo.presellsendtime}}天发货</p>
                        <p v-else>{{goodsInfo.presellsendstatrttime}}</p>
                    </div>  
                </div>
                <!-- 特色：正品保证  保修  发票 退换 -->
                <div class="feature" v-if="goodsInfo.hasServices">
                    <div class="item" v-for="(v,i) in services" :key="i"><div class="iconfont">&#xe67f;</div>{{v}}</div>
                </div>
                <!-- 选择规格 -->
                <div class="opitions" @click="popup()" v-if="goodsInfo.canbuy">
                    <div class="title">请选择 <span v-if="goodsInfo.spec_titles">{{goodsInfo.spec_titles}}</span><span v-else>数量</span> 等</div>
                    <div class="iconfont">&#xe61b;</div>
                </div>
                <div class="opitions" v-else>
                    <span v-if="goodsInfo.userbuy == 0">您已经超出最大{{goodsInfo.usermaxbuy}}件购买量</span>
                    <span v-else-if="goodsInfo.levelbuy == 0">您当前会员等级没有购买权限</span>
                    <span v-else-if="goodsInfo.groupbuy == 0">您所在的用户组没有购买权限</span>
                    <span v-else-if="goodsInfo.timebuy == ''">未到开始抢购时间！</span>
                    <span v-else-if="goodsInfo.timebuy == 1">抢购时间已经结束！</span>
                    <span v-else-if="goodsInfo.total <= 0">商品已经售罄！</span>
                </div>
                <!-- 店铺 -->
                <div class="shop-info">
                    <img :src="shopInfo.logo" alt="">
                    <div class="txt-info">
                        <h3>{{shopInfo.shopname}}</h3>
                        <p>{{shopInfo.description}}</p>
                    </div>
                </div>
                <!-- 商品详情 -->
                <div class="title-tab">
                    <div :class=" tabIndex == 0? 'cur' :''" @click="tab(0)">商品详情</div>
                    <div :class=" tabIndex == 1? 'cur' :''" @click="tab(1)">参数</div>
                </div>
                <div class="detail-box">
                    <div class="dec" v-if='tabIndex==0' v-html="goodsInfo.content"></div>
                    <div v-else class="op-box">
                        <div class="list" v-for="(v,i) in params" :key="i">
                            <div>{{v.title}}</div>
                            <div>{{v.value}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 弹出层 -->
            <mt-popup v-model="popupVisible" position="bottom" modal=true>
                <g-options :thumb="thumb" :buyRight="buyRight" :canAddCart="canAddCart" @addCart="addCart" @buynow="buynow" :hasselect="hasselect" :zero="zero" :price="goodsInfo.minprice" :marketprice="marketprice" :total="stock" :maxTotal="goodsInfo.total" :spec="spec" :selectoption="selectoption" :opitiontitle="opitiontitle" :num="num" @reduce="reduce" @add="add" :tselect="tselect" @tabtypes="options"></g-options>
            </mt-popup>

            <!-- 底部固定栏 -->
            <div class="fixed-btm" v-if="goodsInfo.canbuy">
                <div class="left">
                    <div class="list">
                        <div class="iconfont">&#xe67c;</div>
                        <p>客服</p>
                    </div>
                    <div :class="['list',{cur : isfavorite }]" @click="favorite">
                        <div class="iconfont">&#xe613;</div>
                        <p>收藏</p>
                    </div>
                    <div class="list" @click="goCart">
                        <div class="cart-box">
                            <div class="iconfont">&#xe607;</div>
                            <span>{{cartcount}}</span>
                        </div>
                        <p>购物车</p>
                    </div>
                </div>
                <div class="right gay" v-if="goodsInfo.total <= 0" @click="noneGood">售罄</div>
                <div class="right" v-else @click="popup()">立即购买</div>
            </div>
            <transition name="slide">
                <router-view></router-view>
            </transition>
        </div>
    </transition>
</template>

<script>
    import util from '../../../api/util'
    import {_webapp} from '../../../config/hook'
    import {Toast } from 'mint-ui';
    import list from './../../../assets/mixins/list'
    import gOptions from './options'
    import cutDown from '../../common/base/Time'
    export default {
        data() {
            return {
                popupVisible:false,
                silde:true,
                cartcount:'',
                tabIndex:0,
                num: 1,
                selectoption:'请选择',
                opitiontitle:'套餐类型',
                slider:[],
                spec:[//规格
                ],
                services:[//服务
                ],
                opitions:[],
                specs_arr:[],
                specs_id_arr:[],
                tselect:[],
                goodsInfo:{//商品信息
                },
                params:[],
                shopInfo:{//店铺基本信息
                },
                zero:0,//判断是否0库存,
                marketprice:'',
                price:'',
                stock:'',
                hasselect:false,//判断是否选择了规格
                canAddCart: 0,//判断是够能够加入购物车
                thumb:'',
                isfavorite:false,
                buyRight:false,
                //秒杀状态
                killStatus:'',
                killGood:{},
                killOptions:{},//秒杀规格
                now: parseInt(Date.now() / 1e3),
            }
        },
        mixins: [list],
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            tab(i){
              this.tabIndex = i;
            },
            reduce: function (num) {
              if (this.num > 1) {
                this.num--
              }else{
                  Toast({
                    message: '宝贝不能再减少了哦',
                    position: 'middle',
                    duration: 2000
                });
              }
            },
            add: function () {
                //判断是够有购买限制

                console.log(this.goodsInfo.maxbuy)

                if(this.goodsInfo.maxbuy == 0){//没有限制
                    if (this.num < this.stock) {
                        this.num++;
                    }else{
                        Toast({
                            message: `已超出添加限制`,
                            position: 'middle',
                            duration: 2000
                        });
                    }
                }else{
                    if (this.num < this.goodsInfo.maxbuy) {
                        this.num++;
                    }else{
                        Toast({
                            message: `此商品限购${this.goodsInfo.maxbuy}${this.goodsInfo.unit}`,
                            position: 'middle',
                            duration: 2000
                        });
                    }
                }
              
            },
            noneGood(){
                Toast({
                    message: `暂时缺货哦`,
                    position: 'middle',
                    duration: 2000
                });
            },
            options:function(idx,index){
              let _this = this;
              let id = this.spec[idx].items[index].id;
              let title = this.spec[idx].items[index].title;
              this.$set(this.specs_arr, idx, title);//规格名字数组
              this.$set(this.specs_id_arr, idx, id);//规格id数组
              this.$set(this.tselect, idx, index);//索引数组
              let arrbolen = _this.specs_arr.every((item,index,array)=>{
                return (item !== '')
              })
              let new_arr = [];
              for (let i = 0; i < _this.specs_arr.length; i++) {
                if (_this.specs_arr[i]) {
                  new_arr.push(_this.specs_arr[i])
                }
              }
              if (new_arr.length == _this.spec.length) {
                let optionAll = (_this.specs_id_arr).join("_");
                let options = _this.opitions;

                // 秒杀专区的 规格 处理 
                if(_this.killGood.hasOwnProperty('starttime')){
                    //秒杀 商品规格
                    let killOptionId = _this.killOptions.optionid;
                    for(let m in options){
                        if(options[m].id === killOptionId){//遍历options
                            optionAll = options[m].specs//根据optionid找到对应options里的specs
                        }
                    }
                }

                let changeOptions = {};
                
                for (let o in options) {
                  if (options[o].specs === optionAll) {
                    changeOptions = options[o];
                    _this.zero = 1;
                    // 需要传的参数  goodid  total   optionid
                    _this.optionid = changeOptions.id;
                    _this.stock = changeOptions.stock;
                    _this.zero =  _this.stock <= 0 ? 0 : 1;
                    _this.hasselect = true;
                    _this.marketprice = changeOptions.marketprice
                    _this.opitiontitle= changeOptions.title;
                    _this.selectoption='已选：';
                    break;
                  }
                }
              }
            },
            goCart(){
              this.$router.push({name: 'cart'})
            },
            addCart(){
              let _this = this;
              util.request({
                url: "member.cart.add",
                data:{
                  id: _this.$route.query.id,
                  total: _this.num,
                  optionid: _this.optionid,
                },
                method: "post",
                success(res){
                  Toast({
                    message: '成功加入购物车',
                    position: 'middle',
                    duration: 2000
                  });
                  _this.getCart();
                }
              })
              this.popupVisible = false;
            },
            getCart(){
              let _this = this;
              util.request({
                url: 'member.cart.get_cart',
                data: {},
                method: 'get',
                success(res){
                  _this.cartcount = res.data.total;
                }
              })
            },
            buynow(){
                let param = {
                    id:this.$route.query.id,
                    total:this.num,
                    optionid:this.optionid
                }
                this.$router.push({name: 'confirm', query: param})
            },
            getDetail(){
                let _this = this;
                let id = _this.$route.query.id;
                util.request({
                  url: 'goods.get_detail',
                  data: {
                      id:id
                  },
                  method: 'get',
                  success(res) {
                      
                      let result = res.data.goods;
                      _this.slider =  result.thumbs;
                    //   _this.goodsInfo = {
                    //       title: result.title,
                    //       minprice: result.minprice,
                    //       maxprice: result.maxprice,
                    //       productprice: result.productprice,
                    //       sales: result.sales,
                    //       unit: result.unit,
                    //       total: result.total,
                    //       spec_titles: result.spec_titles,
                    //       content: result.content,
                    //       dispatchprice: result.dispatchprice,
                    //   }
                      _this.goodsInfo = result;
                      _this.params = result.params;
                      _this.services = result.services;
                      _this.spec_titles = result.spec_titles;
                      _this.shopInfo = result.shopdetail;
                      _this.canAddCart = result.canAddCart;
                      _this.thumb = result.thumb;    
                      _this.isfavorite = result.isfavorite;
                      //默认库存：总库存  
                      _this.zero = result.total <= 0 ? 0 : 1;
                      _this.stock = result.total;

                  },
                  error:function () {
                      
                  }
                })
            },
            getSpec(){
                let _this = this;
                let id = _this.$route.query.id;
                util.request({
                  url: 'goods.get_picker',
                  data:{
                    id:id
                  },
                  method: 'get',
                  success(res){
                    //判断是否是秒杀
                    if((res.data.seckillinfo).hasOwnProperty('starttime')){
                        console.log('进入秒杀专区')
                        _this.killStatus = res.data.seckillinfo.status;
                        _this.killOptions = res.data.seckillinfo.options;
                        _this.killGood = res.data.seckillinfo;
                    }else{
                        _this.killStatus = -1;//控制秒杀专区不显示
                    }

                    _this.opitions = res.data.options;
                    _this.spec = res.data.specs;
                
                    if( _this.spec.length == 0 && _this.opitions.length == 0){
                        //不需要选择规格,直接购买
                        _this.buyRight = true;
                    }


                  }
                })
            },
            popup(){
              this.popupVisible = true;
            },
            favorite(){
              let _this = this;
              let id = _this.$route.query.id; 
              let isfavorite = _this.isfavorite == true ? 1 : 0
              util.request({
                url: 'member.favorite.toggle',
                data:{
                  id:id,
                  isfavorite:isfavorite
                },
                method: 'get',
                success(res){
                    _this.isfavorite =  res.data.isfavorite ? false : true
                    if(_this.isfavorite){
                        Toast({
                            message: '收藏成功',
                            position: 'middle',
                            duration: 2000
                        });
                    }else{
                        Toast({
                            message: '取消成功',
                            position: 'middle',
                            duration: 2000
                        });
                    }
                }
              })
            },
            init(){
                let promise=new Promise((resolve,reject)=>{
                    this.getDetail();
                    if(_webapp.debug===false){
                        _webapp.checkLogin(res=>{
                            if(res.statusCode ==1){
                                resolve()
                            }else {
                                reject()
                            }
                        })
                    }else {
                        resolve()
                    }

                })
                promise.then(this.getSpec).then(this.getCart)
            }
        },
        beforeRouteEnter(to, from, next){
            console.log(from)
            if(from.name === 'confirm'){
               /* next(vm=>{
                    vm.silde=false
                })*/
            }
            next()
        },
        components: {
            gOptions,
            cutDown
        },
        mounted() {
            this.init()
        },
        activated() {
            this.init()
        },
    }
</script>

<style lang="less" scoped>
@import '../../../assets/less/index.less';
/*弹出框样式*/
  .mint-popup-bottom {
    width: 100%;
  }
.main{
    .page-view(10);
    .container{
        .scroll-view(100%);
        .text-danger{
            color: @themeColor;
        }
        .silder{
            width: 100%;
        }
        .good-kill{
            display: flex;
            justify-content: space-between;
            .left{
                flex:1;
                background: @themeColor;
                color: #fff;
                display: flex;
                font-size: .12rem;
                padding: .08rem;
                .price-box{
                    flex:1;
                    display: flex;
                    .price{
                        margin-right: .1rem;
                        span{
                            font-size:.32rem;
                        }
                    }
                    .mark-price{
                        span{
                            font-size:.088rem;
                            border: 1px solid #fff;
                            border-radius: .05rem;
                            color: #eab5ab;
                            padding: .01rem .05rem;
                        }
                        p{
                            font-size:.12rem;
                            color: #fe9d9d;
                            text-decoration: line-through;
                            margin-top: .02rem;
                        }
                    }
                }
                .sale-box{
                    width:1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    p{
                        font-size:.12rem;
                    }
                }
            }
            .clock-box{
                width:1rem;
                background: #eee031;
                color: @themeColor;
                display: flex;
                justify-content: center;
                align-items: center;
                p{
                    font-size:.12rem;
                }
            }
        }
        .pre{
            background: #02b94f;
            .left{
                background: none
            }
            .clock-box{
                background: none
            }
            .mark-price{
                span{
                    color:#c8ffe8 !important;
                }
                p{
                    color:#c8ffe8 !important;
                }
            }
            .clock-box{
                p{
                    color:#c8ffe8 !important;
                }
            }
        }
        .base-info{
            display: flex;
            flex-direction: column;
            // border-bottom: @border;
            padding: .1rem;
            .title{
                font-size: 15px;
                text-align: left;
            }
            .subtitle{
                text-align: left;
                color: @themeColor;
                margin-top: .1rem;
            }
            .price{
                display: flex;
                align-items: baseline;
                margin-top: .1rem;
                margin-bottom: .02rem;
                .min-max{
                    font-size: 18px;
                    font-weight: 600;
                    color: @themeColor;
                }
                .market-price{
                    font-size: 12px;
                    color: #666;
                    text-decoration: line-through;
                    margin-left: .1rem;
                }
            }
            .btm{
                display: flex;
                justify-content: space-between;
                align-items: center;
                span{
                    color: #C0C0C0;
                    font-size: 12px;
                }
            }
        }
        .vip-discount{
            margin:0.05rem .1rem;
            p{
                text-align: left;
                font-size:.14rem;
            }
            span{
                font-size:.14rem;
            }
        }
        .activity-ct{
            display: flex;
            align-items: center;
            padding: .12rem;
            span{
                font-size: 12px;
                background:#07B40A;
                color:#fff;
                width: .4rem;
                margin:0;
                margin-right: .1rem;
            }
            p{
                flex: 1;
                font-size: 13px;
                color:#666;
                text-align: left;
            }
        }
        .feature{
            border-top: @border;
            display: flex;
            justify-content: space-between;
            padding: .1rem;
            align-items: center;
            .item{
                display: flex;
                font-size: 12px;
                .iconfont{
                    margin: .02rem .05rem 0 0;
                    color: #07B40A;
                    font-size: 12px;
                }
            }
        }
        .opitions{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: @border;
            border-top: @border;
            padding: .1rem;
            margin:0 0 .08rem;
            >span{
                font-size: 14px;
            }
            .title{
                font-size: 14px;
                span{
                    font-size: 14px;
                }
            }
        }
        .shop-info{
            display: flex;
            align-items: center;
            border-bottom: @border;
            border-top: @border;
            padding: .1rem;
            img{
                width: .52rem;
                height: .52rem;
                margin-right: .06rem;
            }
            .txt-info{
                display: flex;
                flex-direction: column;
                text-align: left;
                h3{
                    font-size: 16px;
                }
                p{
                    font-size: 14px;
                }
            }
        }
        .title-tab{
            display: flex;
            border-bottom: @border;
            height: .46rem;
            line-height: .46rem;
            >div{
                flex: 1;
                height: .46rem;
                font-size: 14px;
            }
            .cur{
                color: @themeColor;
                border-bottom: 2px solid @themeColor;
            }
        }
        .detail-box{
            margin-bottom: .5rem;
            .op-box{
                display: flex;
                flex-direction: column;
                .list{
                    display: flex;
                    align-items: center;
                    border-bottom: @border;
                    margin:0 .1rem;
                    padding: .1rem 0;
                    >div{
                        text-align: left;
                        color: #666;
                        font-size: 14px;
                    }
                    > div:first-child{
                        width: 0.8rem;
                        color: #000;
                        margin-right: .1rem;
                    }
                    > div:nth-child(2){
                        flex: 1;
                    }
                }
            }
        }
    }
    .fixed-btm{
        background: #fff;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: .5rem;
        display: flex;
        align-items: center;
        box-shadow:0 0 4px rgba(0,0,0,0.1);
        .left{
            flex: 1;
            display: flex;
            .list{
                display: flex;
                flex: 1;
                flex-direction: column;
                .iconfont{
                    color:#999;
                    font-size: 20px;
                }
                p{
                    font-size: 12px;
                    color:#999;
                }
                .cart-box{
                    position: relative;
                    span{
                        position: absolute;
                        top: 0;
                        right: 28%;
                        font-size: .1rem;
                        width: .15rem;
                        height: .15rem;
                        line-height: .15rem;
                        background: #ef4f4f;
                        border-radius: 50%;
                        color: #fff;
                        text-align:center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
            .cur{
                .iconfont{
                    color: @themeColor
                }
                p{
                    color: @themeColor
                }
            }
        }
        .right{
            width: 38%;
            background: @themeColor;
            color: #fff;
            height: 100%;
            line-height: .5rem;
            font-size: 14px;
        }
        .gay{
            background: rgba(0, 0, 0, 0.2);
        }
    }


}
</style>

