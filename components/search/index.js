// components/search/index.js

Component({
  /**
   * 组件的属性列表
   */
  //组件传值相当于props
  properties: {
      keyword:{
        type:String,
        value:'搜索' //默认
      },
    align:{
      type:String,
      value: 'center' //left center right 样式
    }
  },
  // 外部样式
  externalClasses: ['background'],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
