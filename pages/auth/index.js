// pages/auth/index.js
import requert from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //点击aip
  bindgetuserinfo(e) {
    const { encryptedData, iv, rawData, signature } = e.detail;
    //登录api
    wx.login({
      success(res) {
        if (res.code) {
          //获取到res.code
          const data = {
            encryptedData,
            iv, 
            rawData,
            signature,
            code: res.code
          }
          requert({
            url: '/users/wxlogin',
            method: "POST",
            data
          }).then(res=>{
            const { token } = res.data.message;
            //保存token
            wx.setStorageSync("token", token);
            //返回上一级
            wx.navigateBack();
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  }
})