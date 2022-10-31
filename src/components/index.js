/**
 * @description 定义对象插件或则函数插件
 */

// 引入需要注册的组件

import PageLayout from './PageLayout'
import { myFormat } from '@/utils'

// 定义对象插件
const myPlugin = {
    // 必须有一个install属性，它是一个函数，会入参一个VueConstructor
    install: function(VueConstructor) {
        VueConstructor.component("PageLayout", PageLayout)
        VueConstructor.filter('dateFormat', myFormat)
    }
}
export default myPlugin