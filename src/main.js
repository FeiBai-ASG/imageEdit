import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/rem'
import wx from 'weixin-js-sdk'

Vue.config.productionTip = false
Vue.prototype.wx = wx

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
