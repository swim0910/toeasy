import { ANALYSIS_COLLECTION_URL, ANALYSIS_PAYMENT_URL } from "@/config/url.config"
import ajax from "./ajax"

export function collectionApi() {
    return ajax({
        url: ANALYSIS_COLLECTION_URL,
        method: 'GET'
    })
}

export function paymentApi() {
    return ajax({
        url: ANALYSIS_PAYMENT_URL,
        method: 'GET'
    })
}