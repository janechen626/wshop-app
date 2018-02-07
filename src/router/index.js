import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* index */
import Home from '@/components/index/home/index'

const Product = r => require.ensure([], () => r(require('@/components/index/goods/goods.vue')), 'index');
const Category = r => require.ensure([], () => r(require('@/components/index/category/category.vue')), 'index');
const List = r => require.ensure([], () => r(require('@/components/index/list/list.vue')), 'index');
const Search = r => require.ensure([], () => r(require('@/components/index/search/search.vue')), 'index');
const Test = r => require.ensure([], () => r(require('@/components/test.vue')), 'index');

// member
const UserCenter = r => require.ensure([], () => r(require('@/components/member/userCenter/index.vue')), 'member')
const Cart = r => require.ensure([], () => r(require('@/components/member/cart/ShoppingCart.vue')), 'member')
const Address = r => require.ensure([], () => r(require('@/components/member/address/list/addressList.vue')), 'member')
const Add = r => require.ensure([], () => r(require('@/components/member/address/edit/add.vue')), 'member')
const Edit = r => require.ensure([], () => r(require('@/components/member/address/edit/edit.vue')), 'member')
const Favorite = r => require.ensure([], () => r(require('@/components/member/favorite/favorite.vue')), 'member')
const History = r => require.ensure([], () => r(require('@/components/member/history/history.vue')), 'member')
const UserInfo = r => require.ensure([], () => r(require('@/components/member/userInfo/userInfo.vue')), 'member');
const Recharge = r => require.ensure([], () => r(require('@/components/member/recharge/recharge.vue')), 'member');

// order;
const Order = r => require.ensure([], () => r(require('@/components/order/index/index.vue')), 'order');
const Detail = r => require.ensure([], () => r(require('@/components/order/detail/detail.vue')), 'order');
const Pay = r => require.ensure([], () => r(require('@/components/order/pay/pay.vue')), 'order');
const Confirm = r => require.ensure([], () => r(require('@/components/order/confirm/confirm.vue')), 'order');


// integralMall
const integralMall = r => require.ensure([], () => r(require('@/components/integralMall/integralMall.vue')), 'integralMall');
const integralIndex = r => require.ensure([], () => r(require('@/components/integralMall/index/index.vue')), 'integralMall');
const integralType = r => require.ensure([], () => r(require('@/components/integralMall/class/class.vue')), 'integralMall');
const integralOrder = r => require.ensure([], () => r(require('@/components/integralMall/order/order.vue')), 'integralMall');
const integralProduct = r => require.ensure([], () => r(require('@/components/integralMall/goods/goods.vue')), 'integralMall');
const integralDetail = r => require.ensure([], () => r(require('@/components/integralMall/detail/detail.vue')), 'integralMall');
const integralConfirm = r => require.ensure([], () => r(require('@/components/integralMall/confirm/confirm.vue')), 'integralMall');
const integralMake= r => require.ensure([], () => r(require('@/components/integralMall/confirm/make.vue')), 'integralMall');
const integralExchange = r => require.ensure([], () => r(require('@/components/integralMall/exchange/exchange.vue')), 'integralMall');


// 拼团
const Group = r => require.ensure([], () => r(require('@/components/group/group.vue')), 'group');
const GroupIndex = r => require.ensure([], () => r(require('@/components/group/index/index.vue')), 'group');
const Action = r => require.ensure([], () => r(require('@/components/group/action/action.vue')), 'group');
const ActivityList = r => require.ensure([], () => r(require('@/components/group/activityList/activityList.vue')), 'group');
const GroupList = r => require.ensure([], () => r(require('@/components/group/groupList/groupList.vue')), 'group');

const GroupListDetail = r => require.ensure([], () => r(require('@/components/group/groupListDetail/groupListDetail.vue')), 'group');
const GroupOrder = r => require.ensure([], () => r(require('@/components/group/order/order.vue')), 'group');
const GroupOrderDetail = r => require.ensure([], () => r(require('@/components/group/order/orderDetail.vue')), 'group');
const GroupProduct = r => require.ensure([], () => r(require('@/components/group/product/product.vue')), 'group');
const GroupUser = r => require.ensure([], () => r(require('@/components/group/user/user.vue')), 'group');
const groupConfirm = r => require.ensure([], () => r(require('@/components/group/confirm/confirm.vue')), 'group');
// const GroupIndex = r => require.ensure([], () => r(require('@/components/group/index/index.vue')), 'group');
const GroupJoin = r => require.ensure([], () => r(require('@/components/group/groupJoin/join.vue')), 'group');

//秒杀
const SecKill = r => require.ensure([], () => r(require('@/components/seckill/index/index.vue')), 'seckill');


//分销  ComWithdraw
const Distribution = r => require.ensure([], () => r(require('@/components/distribution/index/index.vue')), 'distribution');
const Commission = r => require.ensure([], () => r(require('@/components/distribution/Commission/Commission.vue')), 'distribution');
const ComWithdraw = r => require.ensure([], () => r(require('@/components/distribution/Commission/comWithdraw.vue')), 'distribution');
const DistributionOrder = r => require.ensure([], () => r(require('@/components/distribution/order/order.vue')), 'distribution');
const Withdrawals = r => require.ensure([], () => r(require('@/components/distribution/Withdrawals/Withdrawals.vue')), 'distribution');
const Partner = r => require.ensure([], () => r(require('@/components/distribution/partner/partner.vue')), 'distribution');
const QCode = r => require.ensure([], () => r(require('@/components/distribution/qCode/qCode.vue')), 'distribution');

//优惠券
const CouponList = r => require.ensure([], () => r(require('@/components/coupon/couponList/couponList.vue')), 'coupon');
const Coupon = r => require.ensure([], () => r(require('@/components/coupon/coupon/coupon.vue')), 'coupon');
const CouponDetail = r => require.ensure([], () => r(require('@/components/coupon/couponDetail/couponDetail.vue')), 'coupon');
const CouponDetails = r => require.ensure([], () => r(require('@/components/coupon/couponDetail/couponDetails.vue')), 'coupon');
const Exchange = r => require.ensure([], () => r(require('@/components/coupon/exchange/exchange.vue')), 'coupon');
const useCoupon = r => require.ensure([], () => r(require('@/components/coupon/useCoupon/useCoupon.vue')), 'coupon');
const ChoseCoupon = r => require.ensure([], () => r(require('@/components/coupon/choseCoupon/chose.vue')), 'coupon');




export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Home,
            meta: { keepAlive: true },
            children: [

                {
                    path: '/list',
                    name: 'list',
                    component: List
                },
                {
                    path: '/search',
                    name: 'search',
                    component: Search
                }
            ]
        },
        {
            path: '/category',
            name: 'category',
            component: Category,
            meta: { keepAlive: true },
            children: [
                {
                    path: '/category/list',
                    name: 'lists',
                    component: List
                },
                {
                    path: '/category/search',
                    name: 'csearch',
                    component: Search
                }
            ]
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            meta: { keepAlive: false },
            children: [
                {
                    path: '/cart/product',
                    name: 'cartproduct',
                    component: Product
                }
            ]
        },
        {
            path: '/userCenter',
            name: 'userCenter',
            component: UserCenter,
            // meta: { keepAlive: true },
            meta: { keepAlive: false },
            children: [
                {
                    path: '/address',
                    name: 'address',
                    component: Address,
                    children: [
                        {
                            path: '/userCenter/add',
                            name: 'add',
                            component: Add,
                        },
                        {
                            path: '/userCenter/edit',
                            name: 'edit',
                            component: Edit,
                        }
                    ]
                },
                {
                    path: '/favorite',
                    name: 'favorite',
                    component: Favorite,
                    children: [
                        {
                            path: '/favorite/product',
                            name: 'favoriteproduct',
                            component: Product,
                        }
                    ]
                },
                {
                    path: '/history',
                    name: 'history',
                    component: History,
                    children: [
                        {
                            path: '/history/product',
                            name: 'historyproduct',
                            component: Product,
                        }
                    ]
                },
                {
                    path: '/userInfo',
                    name: 'userInfo',
                    component: UserInfo,
                },
                {
                    path: '/recharge',
                    name: 'recharge',
                    component: Recharge,
                },
                {
                    path:'/distribution',
                    name:'distribution',
                    component:Distribution,
                    meta: { keepAlive: false },
                    children:[
                        {
                            path:'/commission',
                            name:'commission',
                            component:Commission,
                            children:[
                                {
                                    path:'/commission/comWithdraw',
                                    name:'comWithdraw',
                                    component:ComWithdraw,
                                },
                            ]
                        },
                        {
                            path:'/distributionOrder',
                            name:'distributionOrder',
                            component:DistributionOrder,
                        },
                        {
                            path:'/withdrawals',
                            name:'withdrawals',
                            component:Withdrawals,
                        },
                        {
                            path:'/partner',
                            name:'partner',
                            component:Partner,
                        },
                        {
                            path:'/qCode',
                            name:'qCode',
                            component:QCode
                        }
                    ]
                },
                {
                    path:'/couponList',
                    name:'couponList',
                    component: CouponList,
                },
                {
                    path:'/coupon',
                    name:'coupon',
                    component: Coupon,
                    children:[
                        {
                            path:'/couponDetail',
                            name:'couponDetail',
                            component: CouponDetail,
                            children:[
                                {
                                    path:'/exchange',
                                    name:'exchange',
                                    component: Exchange,
                                },
                            ]
                        },
                        {
                            path:'/couponDetails',
                            name:'couponDetails',
                            component: CouponDetails,
                            children:[
                                /*{
                                    path:'/exchanges',
                                    name:'exchanges',
                                    component: Exchange,
                                },*/
                            ]
                        },
                    ]
                },
            ]
        },

        {
            path: '/confirm',
            name: 'confirm',
            component: Confirm,
            meta: { keepAlive: false },
            children: [
                {
                    path: '/confirm/address',
                    name: 'addList',
                    component: Address,
                    children: [
                        {
                            path: '/confirm/address/add',
                            name: 'addAddress',
                            component: Add,
                        },
                        {
                            path: '/confirm/address/edit',
                            name: 'editAddress',
                            component: Edit,
                        }
                    ]
                },
                {
                    path:'/choseCoupon',
                    name:'choseCoupon',
                    component:ChoseCoupon
                }
            ]
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        },
        // 订单
        {
            path: '/order',
            name: 'order',
            component: Order,
            meta: { keepAlive: false },
            children: [
                {
                    path: '/detail',
                    name: 'detail',
                    component: Detail
                },

            ]
        },

        //积分商城
        {
            path: '/integralMall',
            name: 'integralMall',
            component: integralMall,
            meta: { keepAlive: true },
            children: [
                {
                    path: '/integralIndex',
                    name: 'integralIndex',
                    component: integralIndex,
                    children: [
                        {
                            path: '/integralExchange',
                            name: 'integralExchange',
                            component: integralExchange,
                        }
                    ]
                },
                {
                    path: '/integralType',
                    name: 'integralType',
                    component:integralType,
                    
                },
                {
                    path: '/search',
                    name: 'isearch',
                    component: Search
                },
                {
                    path: '/integralOrder',
                    name: 'integralOrder',
                    component: integralOrder,
                    children: [
                        {
                            path: '/integralDetail',
                            name: 'integralDetail',
                            component:integralDetail,
                            children: [
                                {
                                    path: '/integralDetail/address',
                                    name: 'iaddList',
                                    component: Address,
                                    children: [
                                        {
                                            path: '/integralDetail/address/add',
                                            name: 'iaddAddress',
                                            component: Add,
                                        },
                                        {
                                            path: '/integralDetail/address/edit',
                                            name: 'ieditAddress',
                                            component: Edit,
                                        }
                                    ]
                                }
                
                            ]
                        }
                    ]
                },
                {
                    path: '/integralProduct',
                    name: 'integralProduct',
                    component: integralProduct,
                },
                {
                    path: '/integralConfirm',
                    name: 'integralConfirm',
                    component: integralConfirm,
                    children: [
                        {
                            path: '/integralConfirm/address',
                            name: 'icaddList',
                            component: Address,
                            children: [
                                {
                                    path: '/integralConfirm/address/add',
                                    name: 'icaddAddress',
                                    component: Add,
                                },
                                {
                                    path: '/integralConfirm/address/edit',
                                    name: 'iceditAddress',
                                    component: Edit,
                                }
                            ]
                        }

                    ]
                },
                {
                    path: '/integralMake',
                    name: 'integralMake',
                    component: integralMake,

                }
            ]
        },

        //拼团
        {
            path: '/group',
            name: 'group',
            component: Group,
            meta: { keepAlive: true },
            children: [
                // 首页
                {
                    path: '/groupIndex',
                    name: 'groupIndex',
                    component: GroupIndex,
                    children:[
                        {
                            path: '/group/product',
                            name: 'groupProduct',
                            component: GroupProduct,
                        }
                    ]
                },
                {
                    path: '/groupConfirm',
                    name: 'groupConfirm',
                    component: groupConfirm,
                    children: [
                        {
                            path: '/groupConfirm/address',
                            name: 'gaddList',
                            component: Address,
                            children: [
                                {
                                    path: '/groupConfirm/address/add',
                                    name: 'gaddAddress',
                                    component: Add,
                                },
                                {
                                    path: '/groupConfirm/address/edit',
                                    name: 'geditAddress',
                                    component: Edit,
                                }
                            ]
                        }
        
                    ]
                },
                {
                    path: '/groupAction',
                    name: 'groupAction',
                    component: Action
                },
                {
                    path: '/groupJoin',
                    name: 'groupJoin',
                    component: GroupJoin
                },
                // 活动列表
                {
                    path: '/activityList',
                    name: 'activityList',
                    component: ActivityList,
                    children:[
                        {
                            path: '/activity/product',
                            name: 'activityProduct',
                            component: GroupProduct,
                        }
                    ]
                },

                // 订单
                {
                    path: '/groupOrder',
                    name: 'groupOrder',
                    component: GroupOrder,
                    children:[
                        {
                            path: '/GroupOrderDetail',
                            name: 'GroupOrderDetail',
                            component: GroupOrderDetail,
                        }
                    ]
                },

                // 我的团
                {
                    path: '/groupList',
                    name: 'GroupList',
                    component: GroupList,
                },
                {
                    path: '/GroupListDetail',
                    name: 'GroupListDetail',
                    component: GroupListDetail,
                }
            ]
        },
        //支付
        {
            path: '/pay',
            name: 'pay',
            component: Pay,
            meta: { keepAlive: false },
        },
        {
            path: '/product',
            name: 'product',
            component: Product,
            meta: { keepAlive: false },
        },
        //秒杀
        {
            path: '/seckill',
            name: 'seckill',
            component: SecKill,
            meta: { keepAlive: false },
        }
    ]
})