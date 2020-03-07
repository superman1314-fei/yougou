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
  //计算总价格
  handleAllPrice(){
    //定义一个价格为0
      let price = 0
      // 循环找打number 让他加乘价格
      this.data.goods.forEach(v=>{
        price+= v.goods_price * v.number
      })
    //修改数据
      this.setData({
        allPrice: price
      })
      //重新赋值给本地存储
    wx.setStorageSync("goods", this.data.goods)
  },
  //数量的加减
  handleCalc(e){
    //结构出来
    const {index,number} = e.currentTarget.dataset
      // 让number 加上1 页面不会刷新
    this.data.goods[index].number += number
    //判断如果number = 0 就删除改商品
    if (this.data.goods[index].number===0){
      wx.showModal({
        title: '提示',
        content: '确定要删除吗',
        success:(res)=> {
          if (res.confirm) {
            //删除
            this.data.goods.splice(index,1)
          }else{
            //如果按了取消按钮 给number加上1
            this.data.goods[index].number+=1
            //重新计算总价格
            this.handleAllPrice()
          }
          //刷新页面更改goods值
          this.setData({
            goods: this.data.goods
          })
        }
      })
    }
    //刷新页面
    this.setData({
      goods: this.data.goods
    })
    //调用计算总价格
    this.handleAllPrice()
  },
  //input框移出事件
  blurClick(e){
    //输入框的值
    let {value} = e.detail
    const {index} = e.currentTarget.dataset 
    value = Math.floor(Number(value)) 
    if (value<1){
      value=1
    }
    this.data.goods[index].number=value
    console.log(value)
    //刷新页面
    this.setData({
      goods: this.data.goods
    })
    this.handleAllPrice()
  }
})