import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/rem'
import wx from 'weixin-js-sdk'
import { Base64 } from 'js-base64'

import '@/style/common.less'
import api from './api/api.js'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer, {
  defaultOptions: {
    inline: false,
    button: true, // 右上角按钮
    navbar: false, // 底部缩略图
    title: false, // 当前图片标题
    toolbar: false, // 底部工具栏
    tooltip: false, // 显示缩放百分比
    movable: true, // 是否可以移动
    zoomable: true, // 是否可以缩放
    rotatable: true, // 是否可旋转
    scalable: false, // 是否可翻转
    transition: true, // 使用 CSS3 过度
    fullscreen: false, // 播放时是否全屏
    keyboard: false // 是否支持键盘
  }
})

Vue.prototype.$api = api

Vue.config.productionTip = false
Vue.prototype.wx = wx
Vue.prototype.Base64 = Base64

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
