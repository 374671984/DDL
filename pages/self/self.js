// pages/self/self.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    avatarUrl : null,
    nickName : null,
    signature : null,
    selfList: [{
      title: '所有任务',
    }, {
      title: '关于我们',
    }, {
      title: '设置',
    }],
  },
  onLoad() {
    this.setData({
        avatarUrl : app.globalData.avatarUrl,
        nickName : app.globalData.nickName,
        signature : app.globalData.signature,
    })
    console.log(this.data.signature)
    console.log(this.data.avatarUrl)
    console.log(this.data.nickName)
  },
  // 获取个性签名
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