var CONFIG = require('../../utils/config.js')

Page({
  data: {
    goodsList: [],
    page: 1,
    limit: 10,
    count: 0,
    scrollTop: 0,
    showPage: false
  },
  onLoad: function () {
    var that = this;

    wx.request({
      url: CONFIG.API_URL.GET_INDEX + "&s=App.Table.FreeQuery&perpage=200",
      method: 'GET',
      data: {
        model_name: 'okayapi_goods',
        where: '[["goods_stock",">",0]]',
        order: '["goods_price ASC"]',
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log('haha',res);

        if (res.statusCode == 200 && res.data.ret == 200) {
          that.setData({ goodsList: res.data.data.list });
        }
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  go: function(event) {
    
  }
})
