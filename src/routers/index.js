/**
 * @description 定义路由、实现路由拦截、路由固定数据配置
 */

import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router)

import Login from '@/pages/login'
import NotFound from '@/pages/common/NotFound.vue'
import incepetor from './inceptor'
import routes from './routes'


const router = new Router({
    mode:'history',
    routes:[
        // 重定向
        {path:'/',redirect:'/login'},
        {path:'/login',component: Login,meta:{ nologin:true}},
        ...routes,
        // 通配页面--地址不存在于路由表中时，显示页面
        {path:'*',component: NotFound}
    ]
})

router.beforeEach(incepetor)

export default router
