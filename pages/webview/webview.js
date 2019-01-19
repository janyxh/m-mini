// pages/webview/webview.js
import {url} from "../../utils/const.js"

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: url,
    code: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.type   1 用户授权后跳转 2 获取用户绑定手机号后跳转 
    
    // 获取用户信息后跳转

    // 如果存在用户信息
    if (options.type === "1" && options.page && app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
          url: `${this.data.url}${options.page}?nickName=${encodeURI(encodeURI(app.globalData.userInfo.nickName))}&&avatarUrl=${app.globalData.userInfo.avatarUrl}`
        })
    }else if (options.type === "2" && options.page && options.number){
      // 获取手机号后跳转
      console.log(this.data.url)
      this.setData({
        url: `${this.data.url}${options.page}?number=${encodeURI(encodeURI(options.number))}`
      })
     } else if(options.page){
      this.setData({
        url: `${this.data.url}${options.page}`
      })
    }
  }
})