import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //商品内容
    detail:[],
    //索引
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
     request({
       url:'/goods/detail',
       data:{
         goods_id:id
       }
     }).then(res=>{
      //  console.log(res)
       const { message} = res.data
       this.setData({
         detail:message
       })
     })
  },
  handelTap(e){
    const { index } = e.currentTarget.dataset
        this.setData({
          current : index
        })
  }
})