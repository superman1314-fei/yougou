  //引入api
  import request from '../../utils/request.js'
Page({
  data:{
    //背景图
    banners: [],
    //导航菜单栏
    menus:[],
    //楼层
    floors:[],
    //回到顶部
    isShowTop:false
},
  onLoad() {
    request({
      url:"/home/swiperdata"
    }).then(res=>{
      const {message} = res.data
      this.setData({
        banners: message
      })
    })
    //导航菜单栏请求数据
    request({
      url:'/home/catitems'
    }).then(res=>{
      const {message} = res.data
      const newData = message.map((v,i)=>{
        if(i===0){
          v.url="/pages/category/index"
        }
        return v
      })
      this.setData({
        menus: newData
      })
    })
    //楼层请求数据
    request({
      url:"/home/floordata"
    }).then(res=>{
      const{message} = res.data
      this.setData({
        floors: message
      })
    })
   
  },
  //小程序回到顶部
   headTop() {
     wx.pageScrollTo({
       scrollTop: 0,
       duration: 300
     })
  },
  //监听回到顶部
  onPageScroll(e){
    const {scrollTop}= e
    //当前状态
    let isShow = this.data.isShowTop
    //大于100就显示回到顶部
    if (scrollTop>100){
      isShow=true
    }else{
      isShow=false
    }
    //判断是否相同
    if (isShow==this.data.isShowTop) return
  //赋值
    this.setData({
      isShowTop:isShow
    })
  }
})