import {USER_UPDATE_URL,USER_PHOTO_URL} from '@/config/url.config'
import ajax from "./ajax"

export function userUpdateApi(data){
    return ajax({
        url:USER_UPDATE_URL,
        data
    })
}

export function photoUpdateApi(data){
    return ajax({
        url:USER_PHOTO_URL,
        data
    })
}