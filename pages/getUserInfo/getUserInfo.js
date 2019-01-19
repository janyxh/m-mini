// pages/getUserInfo/getUserInfo.js

import {url} from "../../utils/const.js"

//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: url,
    userInfo: {},
    hasUserInfo: false,
    page:""
  },

  /**
   * 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('getUserInfo',options)
    // 如果带有页面参数
    if (options.page){
      this.setData({
        page: options.page
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {

  },

  // 获取用户信息
  getUserInfo: function(e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.navigateTo({
      url: `../webview/webview?type=1&page=${this.data.page}`
    })
  }
})