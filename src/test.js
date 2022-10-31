function ajax(){
    let cb = function(resolve, reject){
        setTimeout(function() {
            let result = 120
            // 成功返回
            resolve(result)
            // 失败返回
            // reject(result)
        },1000)
    }
    let myPromise = new Promise(cb)
    return myPromise
} 
// ES7 规定await语法的方法必须使用async声明它是一个异步方法,内部需要执行异步方法来
async function created() {
    // let resolveCallback = function(res){
    //     console.log('----------------resolve回调后的值为:',res)
    //     return ajax()
    // }
    
    // ajax()
    // .then(resolveCallback)
    // .then(function (uRes){
    //     console.log('----------------resolve第二次回调后的值为:',uRes)
    //     return ajax()
    // })
    // .then(function (SRes){
    //     console.log('----------------resolve第三次回调后的值为:',SRes)
    // })
    // .catch(function(e){
    //     console.log('----------------reject回调后的值:',e)
    // })

    // ES7 同步方法 async + await(不支持reject回调)
    // let result = await ajax().catch(e=>{
    //     console.log('---------请求失败',e)
    // })
    // console.log('-----------------第一次回调的值:',result)

    let loginRes = await ajax()
    console.log('--------------------resolve第一次回调的结果',loginRes)
    let userinfoRes = await ajax()
    console.log('--------------------resolve第二次回调的结果',userinfoRes)
    let userrightRes = await ajax()
    console.log('--------------------resolve第三次回调的结果',userrightRes)
}
created()