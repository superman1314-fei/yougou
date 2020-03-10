import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取地址信息
    address: {},
    //本地存储的数据
    goods: [],
    //计算总价格，
    allPrice: 0,
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      address: wx.getStorageSync("address") || {}
    })

  },
  onShow() {
    this.setData({
      goods: wx.getStorageSync("goods")

    })
    this.handleAllPrice()
   

  },
  //点击获取地址信息
  handelGetAddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          address: {
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
  //计算总价格
  handleAllPrice() {
    //定义一个价格为0
    let price = 0
    // 循环找打number 让他加乘价格
    this.data.goods.forEach(v => {
      if (v.select) {
        price += v.goods_price * v.number
      }

    })
    //修改数据
    this.setData({
      allPrice: price
    })

    //重新赋值给本地存储
    wx.setStorageSync("goods", this.data.goods)
  },
  //点击支付判断是否有token值
  handlePay(){
    const token = wx.getStorageSync("token")
    if(!token){
      wx.navigateTo({
        url:'/pages/auth/index'
      })
    }else{
      
      let { allPrice, goods, address} = this.data
      //创建订单需要的值
      // let shuju =goods.filter(v=>{
      //     return v.select
      // })
      goods = goods.map(v => {
        return{
           goods_id:v.goods_id,
           goods_number:v.number,
           goods_price:v.goods_price
        }
        
      }) 
      // console.log(goods)
      //创建订单
      request({
        url: '/my/orders/create',
        method: "POST",
        header: {
          Authorization: token
        },
        data: {
          order_price: allPrice,
          consignee_addr: address.detall + address.name + address.tel,
          goods
        }
      }).then(res => {
        
        const { order_number} = res.data.message
        wx.showToast({
          title: '订单创建成功',
          type: "success"
        })
        request({
          url:"/my/orders/req_unifiedorder",
          method:"POST",
          header:{
            Authorization: token
          },
          data:{
            order_number
          }
        }).then(res=>{
          console.log(res)
          const {pay} =res.data.message
          wx.requestPayment(pay)
        })

        //创建成功后把select为ture的 删除
        const goodsfilter = this.data.goods.filter(v=>{
          return !v.select
        })
        wx.setStorageSync("goods", goodsfilter)
      })
  
    }

  }
})