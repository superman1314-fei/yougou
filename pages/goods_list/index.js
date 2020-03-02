import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //关键字
    keyword:"",
    // 列表内容
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //拿到关键词
    const {keyword} = options
    this.setData({
      keyword
    });
    //发起请求
    request({
      url:'/goods/search',
      data:{
        query:this.data.keyword,
        pagenum:1,
        pagesize:10
      }
    }).then(res=>{
      const{message} = res.data
      //价格后面加两个小数点
      const goods = message.goods.map(v=>{
        v.goods_price=Number(v.goods_price).toFixed(2)
        return v
      })
      this.setData({
        goods
      })
      
    })

  }  


})