 import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //输入框的值
      inputValue :'',
      //搜索建议
      recommend:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  // 是获取input的数据
  valueInput(e){
    const { value } = e.detail
      this.setData({
        inputValue:value
      });
    //发起请求
    request({
      url: '/goods/qsearch',
      data: {
        query: value
      }
    }).then(res => {
      const { message} =res.data
      this.setData({
        recommend:message
      })
    })
  }
  //
})