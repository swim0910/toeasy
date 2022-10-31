/**
 * @description 封装异步请求库
 */

import router from "@/routers"
import store from "@/store"
import axios from "axios"

let AxiosInstance = axios.create({
    baseURL: '/swimming',
    timeout: 5000,
})

/**
 * 可以通过请求前的拦截实现--baseURL的参数修改
 * request请求还没发出去时的拦截
 */

/**
 * 可以配置一个对象，这个对象key就是代理地址，然后值为需要代理的url地址
 */
let proxyObj = {
    '/jaychou':[
        '/city/list'
    ],
    '/wangchaoya':[
        '/my/purchase/list'
    ]
}

/**
 * 实现token通用注入控制，有些地址不要token，有些必须有token并且需要注入
 * token--vuex里边
 */

let noTokenUrl = [
    '/user/login','/user/validate/code','/user/app/login',"/city/list"
]
AxiosInstance.interceptors.request.use(function(config){
    // if(config.url === '/city/list'){
    //     config.baseURL = '/jaychou'
    // 
    for (let name in proxyObj){
        let it = proxyObj[name]
        if(it.includes(config.url)){
            config.baseURL = name
            break
        }
    }

    // 实现token拦截与注入
    if(noTokenUrl.includes(config.url)){
        return config
    }else {
        // 判断token是否存在，如果不存在，则请求应中断--因为axios基于Promise封装，所以可以返回一个错误的Promis中断请求
        let token = store.getters['common/token']
        if(!token){
            return Promise.reject({code:0,message:'前端没有数据缓存'})
        }else{
            config.headers.token = token
            return config
        }
    }
})

/**
 * 响应拦截--对于跳过前端拦截，然后进行响应处理
 * 实现token失效处理、验证请求是否安全
 */
AxiosInstance.interceptors.response.use(response=>{
    let {data} = response
    if(data.code === 403 && data.message==='用户不存在或已失效，请重试'){
        alert('用户非法请求，请重新登录！')
        router.push('/login')
        return Promise.reject({code:400,message:'用户非法请求，请重新登录！'})
    }else{
        return response
    }
})


/**
 * 异步请求方法
 * @param {string | {url:string,data:any,params:any,method:'POST'|'GET'|'DELETE'|'PUT'|'PATCH'}} req 
 * @returns 
 */
function ajax(req){
    if(!req) throw new TypeError('请求参数为必传')
    if(!!req.startsWith){
        req = {url:req}
    }
    if(!req.url) throw new TypeError('url参数为必传')
    return new Promise(resolve=>{
      AxiosInstance.request({
            url:req.url,
            method:req.method || 'POST',
         // params查询参数--连接在url地址传递的参数
            params:req.params || {},
         // 请求体参数
            data:req.data || {},
        }).then(data =>{
            resolve(data.data)
        }).catch(e=>{
            resolve(e)
        })  
    })
}

export default ajax