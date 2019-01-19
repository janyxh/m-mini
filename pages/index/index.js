//index.js

import { login, getJscode2session } from "../../utils/util.js"
import { urlIndex } from "../../utils/const.js"

//获取应用实例
const app = getApp()

Page({
  data: {
    url: urlIndex,
    code: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo(
  //     url: '../logs/logs'
  //   })
  // },
  // bindViewMop: function () {
  //   wx.navigateTo({
  //     url: '../mop/mop'
  //   })
  // },
  onLoad: function (options) {

    // 登录并获取用户信息
    login(app,()=>{
      getJscode2session(app, data => {
        this.setData({
          url: `${this.data.url}&openid=${data.openid}`
        })
      })
    })

    // 如果存在用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        url: `${this.data.url}?nickName=${encodeURI(encodeURI(app.globalData.userInfo.nickName))}&&avatarUrl=${encodeURI(encodeURI(app.globalData.userInfo.avatarUrl))}`
      })
    }


    // 如果存在code
    if (app.globalData.code) {
      this.setData({
        code: app.globalData.code
      })
      // getJscode2session(app, data => {
      //   app.globalData.openid = data.openid;
      //   app.globalData.unionid = data.unionid;
        
      //   console.log('openId', app.globalData.openid)
      //   console.log('unionid', app.globalData.unionid)
      // })
    }
  },
  bindmessage(e) {//接收web-view传递的参数
    // this.setData({//存储状态
    //   title: e.detail....,
    //   imageUrl: e.detail..
  },
  onShareAppMessage(opt) {
    console.log('转发')
    // let title = "分销中心";
    // let imageUrl = this.data.userInfo.avatarUrl;
    // return {
    //   title: title,
    //   imageUrl: imageUrl,
    //   desc: '佛山第一生活门户',
    //   path: 'pages/index/index',
    //   success: function (res) {
    //     console.log(res)
    //     // 转发成功
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //     // 转发失败
    //   }
    // }
  }
})
