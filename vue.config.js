/**
 * @description vue脚手架配置文件，配置更新后，需要重启服务器
 */

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    port:12123,
    open:true,
    // host:'localhost',
    // 配置请求代理
    proxy:{
      // 需要设置一个和后端商量后，接口不会用到的一个字符做代理字段，请求时，请求地址需要包含这个字符，才会做以下代理
      // http://localhost:8693/swimming/user/validate/code  请求本地服务器 + path(path.includes('/swimming'))
      '/swimming':{
        // 设置代理目标 http://www.shuiyue.info:20000/swimming/user/validate/code
        target:'http://www.shuiyue.info:20000',
        // 替换代理字段 http://localhost:8693/swimming/user/validate/code
        pathRewrite:{'/swimming':''}
      },
      '/jaychou':{
        target:'http://www.shuiyue.info:15666',
        pathRewrite:{'/jaychou':''}
      },
      '/wangchaoya':{
        target:'http://www.shuiyue.info:21000',
        pathRewrite:{'/wangchaoya':''}
      }
    }
  }
})
