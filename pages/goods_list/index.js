import request from '../../utils/request.js' //请求数据的方法
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
    loding:true,
    //回到顶部
    isShowTop: false
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
    //调用数据
    this.getGoods()

  },
  getGoods(){
    //发起请求
    // 如果showMore没有数据 就不要请求了
    if(this.data.showMore===false) return
    
      request({
        url: '/goods/search',
        data: {
          query: this.data.keyword,//关键词
          pagenum: this.data.pagenum, //页数
          pagesize: 10 //码数
        }
      }).then(res => {
        const { message } = res.data
        //价格后面加两个小数点
        const goods = message.goods.map(v => {
          v.goods_price = Number(v.goods_price).toFixed(2)
          return v
        })

        this.setData({
          //把旧数组和新数组添加到同一个
          goods:[...this.data.goods,...goods],
          loding:false
        });
        //是否还在加载中
        if(this.data.goods.length>=message.total){
          this.setData({
            showMore:false
          })
        }
        })
  },
  //小程序回到顶部
  headTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

onReachBottom(){
  // 判断开关 请求上一次成功后 再请求后面的数据
  if (this.data.loding===false){
    // 每次加载页数加一
    this.setData({
      pagenum: this.data.pagenum + 1,
      loding:true //开关
    })
    this.getGoods() //调用请求
  }
  },
  //监听回到顶部
  onPageScroll(e) {
    const { scrollTop } = e
    //当前状态
    let isShow = this.data.isShowTop
    //大于100就显示回到顶部
    if (scrollTop > 100) {
      isShow = true
    } else {
      isShow = false
    }
    //判断是否相同
    if (isShow == this.data.isShowTop) return
    //赋值
    this.setData({
      isShowTop: isShow
    })
  }

})