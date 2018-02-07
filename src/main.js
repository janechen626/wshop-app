import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
import store from './vuex/'
import './config/rem'
import 'vue2-animate/dist/vue2-animate.css'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import {_webapp} from './config/hook'
// import Vconsole from 'vconsole'
// import common from './assets/mixins/common'
// Vue.use(common);

// var vsconsole = new Vconsole();

Vue.use(Vuex)
Vue.use(MintUI)
Vue.config.productionTip = false


if(_webapp.checkOpenID()){
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: { App }
    })
}else {
    _webapp.getOpenID(function () {
        new Vue({
            el: '#app',
            router,
            store,
            template: '<App/>',
            components: { App }
        })
    })
}









