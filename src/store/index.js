/**
 * @description 定义数仓,进行各类业务数据的注入
 */

import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import persistedStatePlugin from 'vuex-persistedstate'
import common from './common'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 使用插件属性给vuex添加插件
    plugins:[
        // 数据持久化插件
        // 前端持久化：sessionStorage,localStorage
        persistedStatePlugin({
            // 配置数据存储位置
            storage: window.sessionStorage
        }),
    ],
    modules:{
        common
    }
})

export default store