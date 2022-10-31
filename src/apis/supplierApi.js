import { SUPPLIER_INFO_URL,SUPPLIER_ADD_URL } from "@/config/url.config"
import ajax from "./ajax"

export function supplierApi(params){
    return ajax({
        url:SUPPLIER_INFO_URL,
        method:'GET',
        params
    })
}
// export function supplierAddApi(params){
//     return ajax({
//         url:SUPPLIER_ADD_URL,
//         params
//     })
// }