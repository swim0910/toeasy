import { SYSTEM_TOKEN } from '@/config/common.config'
import store from '@/store'
import { decodeApi } from '@/utils'

/**
 * 路由拦截，拦截用户是否登录--使用登录后的token，缓存时添加时间戳，判断是否过期，是否正确
 * 
 */

export default function incepetor(to,from,next){
    // 是否进行权限拦截,登录拦截在定义路由时可确认并不可修改，所以使用meta参数
    if( to.meta.nologin ){
        next()
        return
    }
    /**  获取token+ (&&&) +timestamp--加密
     * 1.获取数据
     * 2.解密数据
     * 3.判断是否过期  2h过期 2*60*60*1000
     * 4.判断是否正确
     */
    let tokenStr = sessionStorage.getItem(SYSTEM_TOKEN)
    if(!tokenStr){
        next('/')
        return
    }
    let token = decodeApi(tokenStr).split('&&&')
    let nowTime = Date.now()
    if(nowTime-token[1] > 2*60*60*1000){
        alert('token过期')
        return
    }
    // 从vuex中获取token数据与当前缓存token对比,检查token是否正确
    let nowToken = store.getters['common/token']
    if( nowToken !== token[0] ){
        next('/login')
        return
    }
    next()  
}
