// pages/personal/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
  //收获地址
  handelArss(){
    wx.chooseAddress()
  },
  //客服
  handelCall(){
    wx.makePhoneCall({
      phoneNumber: '13826707429' //仅为示例，并非真实的电话号码
    })
  }
})