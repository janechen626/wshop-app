import util from './../../api/util'
import {Indicator} from 'mint-ui';

const list = {
  data () {
    return {
      list: [],
      page: 1,
      psize: 10,
      loading: true
    }
  },
  methods: {
    getList (params, tag = 'list') {
      let _this = this
      return new Promise((resolve, reject) => {
        let obj = {
          'page': _this.page,
          // 'psize':1
        }
        Indicator.open()
        util.request({
          url: params.url,
          data: Object.assign(obj, params.opt),
          method: 'get',
          success (res) {
            _this.list = [..._this.list, ...res.data[tag]]
              console.log(_this.list)
            if (res.data[tag].length >= _this.psize) {
              if(obj.page==1){
                // console.log("_this.$el.querySelector('.activityList').scrollTop")
                setTimeout(()=>{
                    _this.loading = false
              },1000)

              }else {
                  _this.loading = false
              }
            } else {
              _this.loading = true
              console.log('请求成功并且长度<psize')
            }
              Indicator.close()
              console.log(res)
            resolve(res)
          },
          error (res={}) {
            Indicator.close()
            reject(res)
          },

        })
      })
    },
    loadMore (params, tag = 'list') {
      return new Promise((resolve,reject)=>{
          console.log('loadmore')
          this.page = this.page + 1
          this.getList(params, tag)
      })
    },
    listInit () {
      return new Promise((resolve,reject)=>{
          this.loading = true
          this.list = []
          this.page = 1
          resolve()
      })
    },
    getParams (params) {
      return Object.assign({
        page: this.page,
        psize: this.psize
      }, params)
    },
    scrollTop(s){
        return new Promise((resolve,reject)=>{
            this.$el.querySelector(s).scrollTop=0
            console.log(`this.$el.querySelector(${s})的高度为${this.$el.querySelector(s).scrollTop}`)
            resolve()
        })
    }
  },
  mounted () {

  }
}
export default list
