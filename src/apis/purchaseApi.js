import { DELETE_LIST_URL, PURCHASE_LIST_URL,PAY_LIST_URL,PURCHASE_INFO_URL,PURCHASE_SAVE_URL,PURCHASE_UPDATE_URL} from "@/config/url.config"
import ajax from "./ajax"

export function purchaseListApi(params) {
    return ajax({
        url: PURCHASE_LIST_URL,
        method: 'GET',
        params
    })
}

export function purchaseDeleteApi(id) {
    return ajax({   
        url: DELETE_LIST_URL + id
    })
}

export function purchasePayApi(data) {
    return ajax({       
        url: PAY_LIST_URL,
        data
    })
}



export function purchaseSaveApi(data) {
    return ajax({        
        url: PURCHASE_SAVE_URL,
        data:{data}
    })
}

export function purchaseUpdateApi(data) {
    return ajax({
        url: PURCHASE_UPDATE_URL,
        data
    })
}

export function purchaseInfoApi(id) {
    return ajax({
        url: PURCHASE_INFO_URL,
        method: 'GET',
        params:{id}
    })
}