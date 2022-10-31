/**
 * @description 通用vuex模块
 */

import { decodeApi, encodeApi } from "@/utils"

function rightsAct({ commit }, args){
        // todo 业务数据请求
        commit('setuserRights',[])
}

const actions = {
        // 每个action方法都会被vuex进行二次处理,会把第一个参数设置为store实例对象
        // 当前只需要commit方法,可以使用解构引入
        rightsAct
}

// 页面刷新时，会重置对象，页面刷新数据会丢失
const common = {
        namespaced:true,  // 是否开启命名空间
        // 定义数据对象，并初始化数据
        state:{
            // token为登录请求回来后立即使用的数据,不能在vuex中进行异步处理,只能mutation
            token:'',
            userInfo:{},
            // 可以在vuex中异步请求,登录时不会立即使用该数据
            userRights:[],
        },
    getters:{
        token(_state){
            return decodeApi(_state.token)
        },
        userInfo(_state){
            return _state.userInfo
        },
        userRights(_state){
            return _state.userRights
        }
    },
    actions,
    mutations:{
        setToken(_state,_token){
            // 持久化,为保证安全性,存储时加密,调用方法时解密
            _state.token = encodeApi(_token)
        },
        setuserInfo(_state,_userInfo){
            _state.userInfo = _userInfo
        },
        setuserRights(_state,_userRights){
            // 数据更新消息发布
            _state.userRights = _userRights
        }
    }
}
export default common