import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //关键字
    keyword:"",
    // 列表内容
    goods:[],
    //是否没有数据
    showMore:true,
    //页码
    pagenum:1,
    //开关/防抖
    loding:true
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
    this.getGoods()

  },
  getGoods(){
    //发起请求
    if(this.data.showMore===false) return
    setTimeout(v=>{
      request({
        url: '/goods/search',
        data: {
          query: this.data.keyword,
          pagenum: this.data.pagenum,
          pagesize: 10
        }
      }).then(res => {
        const { message } = res.data
        //价格后面加两个小数点
        const goods = message.goods.map(v => {
          v.goods_price = Number(v.goods_price).toFixed(2)
          return v
        })

        this.setData({
          goods:[...this.data.goods,...goods],
          loding:false
        });
        if(this.data.goods.length>=message.total){
          this.setData({
            showMore:false
          })
        }
        })
    },2000)
    

   
  },
onReachBottom(){
  if (this.data.loding===false){
    this.setData({
      pagenum: this.data.pagenum + 1,
      loding:true
    })
    this.getGoods()
  }
  }


})