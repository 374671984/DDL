// pages/self/self.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    avatarUrl : app.globalData.avatarUrl,
    nickName : app.globalData.nickName,
    signature : app.globalData.signature,
    selfList: [{
      title: '所有任务',
      page: 'allTask',
      img: 'allTask.png',
    }, {
      title: '关于我们',
      page: 'forUs',
      img: 'forUs.png',
    }, {
      title: '设置',
      page: 'setting',
      img: 'setting.png',
    }],
  },
  onLoad() {
    console.log(this.data.signature)
    console.log(this.data.avatarUrl)
    console.log(this.data.nickName)
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
    app.globalData.avatarUrl = avatarUrl
    wx.setStorageSync('avatarUrl', avatarUrl)
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
  nicknameForm:function(e){
    var nickname = e.detail.value.name
    console.log("昵称",e.detail.value.name)
    this.setData({
      nickName : nickname
    })
    app.globalData.nickName = nickname
    wx.setStorageSync('nickName', nickname)
    wx.showToast({
      title: '成功修改昵称',
      icon: 'success',
      duration: 1000
    })
  },
  getNickname:function(e){
    const { nickName } = e.detail.value
    this.setData({
      nickName,
    })
    app.globalData.nickName = nickName
    wx.setStorageSync('nickName', nickName)
  },
  onClickselfTab(e){
    console.log(e.currentTarget.dataset.page)
    if(e.currentTarget.dataset.page === "allTask"){
      wx.navigateTo({
        url: '/pages/allTask/allTask',
      })
    }else{
      wx.navigateTo({
        url: `/pages/self/${e.currentTarget.dataset.page}/${e.currentTarget.dataset.page}`,
      })
    }
    
  }
})