/**
 * @description 定义常用方法
 */

/** 加密、解密 */
import { AES, enc } from 'crypto-js'
const SECRET_KEY = 'yyswimming111'

/**
 * 对称加密
 * @param { string } str 需要解密的字符串
 * @returns string 解密后的字符
 */
export function encodeApi(str){
    return AES.encrypt(str,SECRET_KEY).toString()    
}

export function decodeApi(str){
    return AES.decrypt(str,SECRET_KEY).toString(enc.Utf8)
}

/**
 * 
 * @param {string | number | Date} val 日期数据
 * @param {string} type 格式化类型
 * @returns 
 */
 export function myFormat(val, type = 'yyyy-MM-dd hh:mm:ss') {
    let d = new Date(val)
    let yyyy = d.getFullYear()
    let MM = d.getMonth() + 1
    let dd = d.getDate()
    let hh = d.getHours()
    let mm = d.getMinutes()
    let ss = d.getSeconds()

    MM = MM > 9 ? MM : `0${MM}`
    dd = dd > 9 ? dd : `0${dd}`
    hh = hh > 9 ? hh : `0${hh}`
    mm = mm > 9 ? mm : `0${mm}`
    ss = ss > 9 ? ss : `0${ss}`
    let obj = {yyyy, MM, dd, hh, mm, ss}

    // return `${yyyy}年${MM}月${dd}日 ${hh}时${mm}分${ss}秒`
    // return `${MM}月${dd}日 ${hh}时`
    return type.replace(/(yyyy)|(MM)|(dd)|(hh)|(mm)|(ss)/g, function(key) {
        return obj[key]
    })
}
