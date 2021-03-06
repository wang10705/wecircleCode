import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'
import service from '@/utils/service'

import './assets/common.css'
import './assets/weui.min.css'
import './assets/animate.css'

// window.onerror = (msg, url, line, col, error) => {
//   // 直接将错误提示出来，可根据情况自行选择

//   weui.topTips(msg)
// }

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(VueSocketio, socketio(service.baseServer, {
  path: '/socket'
}))// 与服务端链接
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

// import Vue from 'vue'
// import App from './App.vue'

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
  const router = new createRouter()
  const store = new createStore()

  sync(store, router)

  const app = new Vue({
    // 根实例简单的渲染应用程序组件。
    router: router,
    store: store,
    render: h => h(App)
  })

  return { app, router, store }
}
