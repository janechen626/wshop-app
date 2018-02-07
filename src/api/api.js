import axios from 'axios'
import qs from 'qs'
// import { _webapp } from '../config/hook'

let util = {
  siteInfo: {
    siteroot: 'https://wshop.wshoto.com/app/wshoto_shop_v3_api.php',
    uniacid: '1',
    acid: '1',
    comefrom: 'app',
    multiid: '',
    version: '1.0.0'
  },
  /**
   构造微擎地址,
   @params action 微擎系统中的controller, action, do，格式为 'wxapp/home/navs'
   @params querystring 格式为 {参数名1 : 值1, 参数名2 : 值2}
   */
  url (name) {
    const url = `${util.siteInfo.siteroot}?i=${util.siteInfo.uniacid}&comefrom=${util.siteInfo.comefrom}&r=${name}`
    return url
  },
  getQuery (url) {
    var theRequest = []
    if (url.indexOf('?') !== -1) {
      var str = url.split('?')[1]
      var strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        if (strs[i].split('=')[0] && unescape(strs[i].split('=')[1])) {
          theRequest[i] = {
            'name': strs[i].split('=')[0],
            'value': unescape(strs[i].split('=')[1])
          }
        }
      }
    }
    return theRequest
  },
  /*
  * 获取链接某个参数
  * url 链接地址
  * name 参数名称
  */
  getUrlParam (url, name) {
    var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`) // 构造一个含有目标参数的正则表达式对象
    var r = url.split('?')[1].match(reg)  // 匹配目标参数
    if (r != null) return unescape(r[2])
    return null // 返回参数值
  },
  instance: axios.create({
    // baseURL: 'https://some-domain.com/api/',
    transformRequest: [function (data) {
      data = qs.stringify(data)
      return data
    }]
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // // URL参数
    // params: {
    //
    // }
  }),
  // opt: {type: 请求方法,url:url, parmas: 参数, callback:回调函数}
  request: (opt = {
    method: 'get',
    success: {},
    error: {},
    complete: {},
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }) => {
    let url = opt.url
    if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
      url = util.url(url)
    }
    let requestData = {
      url: url,
      method: opt.method,
      data: {},
      params: {}
    }

    if (opt.method !== 'get' && opt.method !== 'delete') {
      requestData.data = opt.data
    } else {
      requestData.params = opt.data
    }

    console.log(requestData)

    util.instance.request(requestData)
      .then(res => ({
        'errno': res.data.error / 1,
        'message': res.data.message,
        'data': res.data
      }))
      .then(res => {
        res.error = res.error / 1

        if (res.errno === 0) {
          opt.success({
            'message': res.message,
            'data': res.data
          })
        } else {
          opt.error({
            'message': res.message,
            'data': res.data
          })
        }

        return res
      })
      .then(opt.complete)
  }
}

export default util
