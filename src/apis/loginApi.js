import { AUTO_LOGIN_URL, CITY_LIST_URL, USER_INFO_URL, USER_LOGIN_URL, USER_RIGHTS_URL, VDT_CODE_URL } from "@/config/url.config"
import ajax from "./ajax"

export function vdtCodeApi(phone){
    return ajax({
        // url地址为常量
        // url:'/user/validate/code',
        url:VDT_CODE_URL,
        // method:'POST',
        data:{ phone },
    })
}

export function cityListApi(){
    return ajax({
        url:CITY_LIST_URL,
        method:'GET'
    })
}

export function userInfoApi(id){
    return ajax({
        url: USER_INFO_URL,
        method:'GET',
        params:{ id }
    })
}

export function loginApi(data){
    return ajax({
        url:USER_LOGIN_URL,
        data
    })
}

export function rightsApi(ids){
    return ajax({
        url:USER_RIGHTS_URL,
        method:'GET',
        params:{ids}
    })
}

export function autoLoginApi(){
    return ajax({
        url:AUTO_LOGIN_URL,
    })
}