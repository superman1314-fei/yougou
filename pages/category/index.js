import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //数据列表
    list:[],
    content:0//索引
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      request({
        url:"/categories"
      }).then(res=>{
        const {message} =res.data
        this.setData({
          list: message
        })
      })
  },
  handelClick(e){
    const { index } = e.currentTarget.dataset
      this.setData({
        content: index
      })
  }

})