import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //商品内容
    detail:[],
    //索引
    current:0,
    //预览图片
    picsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
     request({
       url:'/goods/detail',
       data:{
         goods_id:id
       }
     }).then(res=>{
      //  console.log(res)
       const { message} = res.data
       const picsList = message.pics.map(v=>{
         return v.pics_big
       })
       this.setData({
         detail:message,
         picsList
       })
     })
  },
  //当前索引
  handelTap(e){
    const { index } = e.currentTarget.dataset
        this.setData({
          current : index
        })
  },
  handelImage(e){
    // 图片的当前索引
    const { index } = e.currentTarget.dataset
    wx.previewImage({
        
      current: this.data.picsList[index], // 当前显示图片的http链接
      urls: this.data.picsList // 需要预览的图片http链接列表
    })
  },
  //跳转到购物车
  handelcat(){
    wx.switchTab({
      url: '/pages/cart/index'
    })
  },
  //加入购物车
  handelAddCat(){
      var goods = wx.getStorageSync("goods") || [];
     const exit= goods.some(v=>{
       const isExit = this.data.detail.goods_id == v.goods_id
       if (isExit){
       
          v.number+=1;
         wx.showToast({
           title: '数量+1',
           icon: 'success'
           
         })
        }
       return isExit
      })
      if(!exit){
        goods.unshift({
          goods_img: this.data.detail.goods_small_logo,
          goods_price: this.data.detail.goods_price,
          goods_name: this.data.detail.goods_name,
          goods_id: this.data.detail.goods_id,
          number: 1
        })
        wx.showToast({
          title: '加入成功',
          icon: 'success'
         
        })
      }

    wx.setStorageSync("goods", goods)
  
  }
})