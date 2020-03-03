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
     loading: false
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {

   },
   // 是获取input的数据
   valueInput(e) {
     const {
       value
     } = e.detail
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
     if (!this.data.inputValue) {
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
         console.log(res)
         this.setData({
           recommend: message,
           loading: false
           
         })
         //判断inputValue是否是最新的值，如果不是重新发送请求
         if( this.data.inputValue!=this.data.listValue){
           this.getrecommend()
         }
       })
     }
  

   }
 })