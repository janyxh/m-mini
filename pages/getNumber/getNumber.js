// pages/getNumber/getNumber.js
import { getJscode2session } from "../../utils/util.js"
import { url } from "../../utils/const.js"

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: "",
    url: url,
    params: {},
    number: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 如果带有页面参数
    if (options.page) {
      this.setData({
        page: options.page
      })
    }
  },

  // 获取用户绑定的手机号
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log('iv',e.detail.iv)
    console.log('encryptedData',e.detail.encryptedData)
    
    // 不同意授权
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      // 跳转
      wx.navigateTo({
        url: `../webview/webview?type=2&page=${this.data.page}`,
      })
    } else {
      // 同意授权
      this.setData({
        'params.iv': e.detail.iv,
        'params.encryptedData': e.detail.encryptedData
      }) 

      if (app.globalData.session_key) {
        this.setData({
          'params.sessionkey': app.globalData.session_key
        }, () => {
          this.decodeNumber(this.data.params)
        })
      }
    }
  },
  // 解密手机号码
  decodeNumber: function (params) {
    const self = this
    // 调用接口 解密手机号码
    wx.request({
      url: 'http://192.168.0.31:8080/market-mobile/salesman/decryptWXPhone',
      method: 'post',
      data: params,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let { respCode, message } = res.data
        if (respCode === "0000") {
          console.log(wx)
          // 跳转
          wx.navigateTo({
            url: `../webview/webview?type=2&page=${self.data.page}&number=${res.data.data.phoneNumber}`,
          })
        }else{
          wx.showToast({
            title: message,
            duration: 2000
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: "系统繁忙",
          duration: 2000
        })
      }
    })
  },
})