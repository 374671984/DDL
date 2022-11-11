// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    token: wx.getStorageSync('token'),
    userInfo: wx.getStorageSync('userInfo'),
    student_id: wx.getStorageSync('student_id'),
    password: wx.getStorageSync('password'),
    avatarUrl: wx.getStorageSync('avatarUrl'),
    nickName: wx.getStorageSync('nickName'),
    signature: wx.getStorageSync('signature'),
  }
})
