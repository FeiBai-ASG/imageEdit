import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/rem'
import wx from 'weixin-js-sdk'
import { Base64 } from 'js-base64'

import '@/style/common.less'
import api from './api/api.js'

Vue.prototype.$api = api

Vue.config.productionTip = false
Vue.prototype.wx = wx
Vue.prototype.Base64 = Base64

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
