// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //获取地址信息
      address:{},
      //本地存储的数据
      goods:[],
      //计算总价格，
      allPrice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      address: wx.getStorageSync("address") || {}
    })
    
  },
  onShow(){
    this.setData({
      goods:wx.getStorageSync("goods")
     
    })
    this.handleAllPrice()
  },
  //点击获取地址信息
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
  },
  handleAllPrice(){
      let price = 0
      this.data.goods.forEach(v=>{
        price+= v.goods_price * v.number
      })
      this.setData({
        allPrice: price
      })
  }

})