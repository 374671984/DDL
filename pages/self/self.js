// pages/self/self.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    avatarUrl : null,
    nickName : null,
    signature : null,
  },
  
  onLoad() {
    this.setData({
        avatarUrl : app.globalData.avatarUrl,
        nickName : app.globalData.nickName,
        signature : app.globalData.signature,
    })
    console.log(this.signature)
    console.log(app.globalData.signature)
  },
  getSignature(event){
    let signature1 = event.detail.value
    app.globalData.signature = event.detail.value
    wx.setStorageSync('signature',event.detail.value)
    //console.log(id)
    this.setData({
      signature:signature1
    })
  },
})