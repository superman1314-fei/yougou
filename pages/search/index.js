 import request from "../../utils/request.js"
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     //输入框的值
     inputValue: '',
     //上一个输入框的值
     listValue:'',
     //搜索建议
     recommend: [],
     //节流 /开关
     loading: false,
     //本地存储
     localKey:[]
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
     //获取本地数据
      let arr = wx.getStorageSync('localKey')
      //  判断arr是否是数据 如果不是就让它等于一个数组
          if(!Array.isArray(arr)){
            arr=[]
          }
          //赋值
        this.setData({
          localKey:arr
        })
   },
   // 是获取input的数据
   valueInput(e) {
     const {value} = e.detail
     this.setData({
       inputValue: value
     });

     this.getrecommend()
   },
   //点击取消清除内容
   handleClick(){
     this.setData({
       inputValue: '',
       recommend: []
     })
   },
   //封装方法
   getrecommend() {
     //判断如果没有值就就不用发起请求
     if (!this.data.inputValue.trim()) {
       this.setData({
         recommend: []
       })
       return
     }
     if (this.data.loading===false){
       this.setData({
         loading:true,
         listValue:this.data.inputValue
       })
       //发起请求
       request({
         url: '/goods/qsearch',
         data: {
           query: this.data.inputValue
         }
       }).then(res => {
         const {
           message
         } = res.data
        //  console.log(res)
         this.setData({
           recommend: message,

           loading: false
           
         })
         console.log(this.data.recommend)
         //判断inputValue是否是最新的值，如果不是重新发送请求
         if( this.data.inputValue!=this.data.listValue){
           this.getrecommend()
         }
       })
     }
  

   },
   //搜索建议点击外面清空
   handelClick(e){
     const { onlyid } = e.target.dataset
     if (!onlyid){
       this.setData({
         //清空搜索建议
         recommend: []
       })
     }
     
   },
   //按下回车键跳转列表页
   handelConfirm(){
    //  let arr = wx.getStorageSync('localKey')
    //  if(!Array.isArray(arr)){
    //    arr=[]
    //  }
   
     //本地存储
     let arr = this.data.localKey
     arr.unshift(this.data.inputValue) //把数据添加到前面
     //数组去重
     arr = [...new Set(arr)]
     wx.setStorageSync('localKey', arr)
     wx.redirectTo({
       url: "/pages/goods_list/index?keyword=" + this.data.inputValue
     })
   },
   //清除历史记录
   handelreset(){
     //从本地缓存中移除指定 key
     wx.removeStorageSync('localKey')
     //清空页面的数据
     this.setData({
       localKey: []
     })
   }
 })