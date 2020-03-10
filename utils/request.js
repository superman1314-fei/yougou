/**
 * 定义一个路由
 * confing接收 默认一个对象防止外面什么都不传进来
 * success成功的回调函数
 * fail失败的回调函数
 */
const request =(confing={})=>{
  //判断如果没有http开头的就加上基准路径
  if (confing.url.search(/^http/)===-1){
    confing.url = request.defaults.baseURL + confing.url
  }

    return new Promise((resolve,reject)=>{
      wx.showLoading({
        title: '加载中',
        mask:true
      })
      wx.request({
        //展开运算 里面有url,data 等
        ...confing,
        //成功的回调函数
        success(res){
          resolve(res)
        },
        //失败的回调函数
        fail(res){
          reject(res)
        },
        //无论失败还是成功的回调函数
        complete(res){
          request.errors(res)
          wx.hideLoading()
        }
      })
    })
}
//request默认属性
request.defaults={
  //基准路径
  baseURL:''
}
//存储一个错误的回调函数，默认给一个空数组
request.errors=()=>{}
// callback函数 
request.onError=(callback)=>{
  //callback必须是一个函数
  if (typeof callback==="function"){
    //如果是一个函数保存到errors
    request.errors=callback 
  }
}
//暴露request
export default request