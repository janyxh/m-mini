// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: "pages/index/index?compId=2&contentId=168418001228398592",
    imageUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546088235763&di=addb50de2aa991a2c05e9a0cf45b4887&imgtype=0&src=http%3A%2F%2Fimgservice.suning.cn%2Fuimg1%2Fb2c%2Fimage%2FwmD2injjjnu0sakIuuD58w.jpg_200w_200h_4e"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    }); 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      imageUrl: this.data.imageUrl,
      path:"../webview/webview?page=/Goods"
    }
  },
  // 关闭分享窗口, 返回上一页
  closeShare(){
    wx.navigateBack({
      data:1
    })
  },
  /**
   * 复制链接
   */
  copyLink() {
    wx.setClipboardData({
      data: this.data.link,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },

  /**
   * 进入我的分销中心
   */
  toDistribution(){
    wx.navigateTo({
      url: '../webview/webview?page=/Distribution',
    })
  }
})