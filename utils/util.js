import { appid, secret } from "./const.js"


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// -------------------------------------------  登录 并获取用户信息  ----------------------------------------------

function login(app,fn){
  // 登录
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        //发起网络请求
        app.globalData.code = res.code;
        console.log("code", app.globalData.code)
        fn && fn(app)
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  })
  // 获取用户信息
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            app.globalData.userInfo = res.userInfo
            console.log('appUserInfo', app.globalData.userInfo)

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (app.userInfoReadyCallback) {
              app.userInfoReadyCallback(res)
            }
          }
        })
      }
    }
  })
}


// -------------------------------------------- 根据code获取session_key和openid---------------------------

function getJscode2session(app,fn){
  wx.request({
    url: 'https://api.weixin.qq.com/sns/jscode2session', // 仅为示例，并非真实的接口地址
    data: {
      appid: appid,
      secret: secret,
      js_code: app.globalData.code,
      grant_type: "authorization_code"
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {

      app.globalData.openid = res.data.openid;
      app.globalData.session_key = res.data.session_key;

      console.log('openId', app.globalData.openid)
      console.log('session_key', app.globalData.session_key)
      fn && fn(res.data)
    }
  })
}


module.exports = {
  formatTime: formatTime,
  login: login,
  getJscode2session: getJscode2session
}
