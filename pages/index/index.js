  //引入api
  import request from '../../utils/request.js'
Page({
  data:{
    //背景图
    banners: [],
    //导航菜单栏
    menus:[],
    //楼层
    floors:[]
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
    request({
      url:"/home/floordata"
    }).then(res=>{
      console.log(res)
      const{message} = res.data
      this.setData({
        floors: message
      })
    })
  }
})