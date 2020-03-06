// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //获取地址信息
      address:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      address: wx.getStorageSync("address") || {}
    })
    
  },
  handelGetAddress(){

    wx.chooseAddress({
      success:(res) =>{
        this.setData({
          address:{
            //姓名
            name: res.userName,
            // 手机号
            tel: res.telNumber,
            //地址
            detall: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        });
        //保存地址信息
        wx.setStorageSync("address", this.data.address)
      }
    })
  }

})