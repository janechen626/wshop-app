import {
    GET_USERADDRESS,
    ADDTYPE,
    SET_ADDRESS,
    COUPON,
    COUPONLIST
}
    from
        './mutation-types.js'

// import { setStore, getStore } from '../config/myUtils'

export default {
    // 用户收货地址
    [GET_USERADDRESS](state, data) {
        state.userAddress = {
            mobile: data.mobile,
            realname: data.realname,
            province: data.province,
            city: data.city,
            area: data.area,
            address: data.address,
            id: data.id,
            isdefault: data.isdefault
        }
        // console.log(data)
    },
    [ADDTYPE](state, data) {
        state.addtype = data
    },
    [SET_ADDRESS](state, data) {
        state.orederaddress = data
        console.log('VUEX setaddress')
        console.log(data)
    },
    [COUPON](state, data) {
        state.coupon = data
        // console.log('VUEX coupon')
        // console.log(data)
    },
    [COUPONLIST](state, data) {
        state.couponList = data
        // console.log('VUEX coupon')
        // console.log(data)
    },

}
