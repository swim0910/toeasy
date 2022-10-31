/**
 * @description  项目启动文件--定义全局实例、注册全局组件、全局路由、全局状态管理器、全局样式等
 */

import Vue from 'vue'
import App from '@/pages'
import router from './routers'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
//注册全局组件
import MyComponent from './components'
Vue.use(MyComponent)
import './style/index.less'

new Vue({
  // 路由注入
  router,
  // 状态管理器注入
  store,
  render(createElement){
    return createElement(App)
  }
}).$mount('#root')  