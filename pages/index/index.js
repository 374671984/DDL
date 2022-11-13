// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    student_id:'',
    password:'',
    userInfo: {},
  },
  onLoad() {
    this.setData({
      userInfo:app.globalData.userInfo
    })
    if(app.globalData.userInfo){
      wx.switchTab({
        url: '../ddl/ddl'
      })
    }
  },
  getID(event){
    let id = event.detail.value
    this.setData({
      student_id:id
    })
  },
  getPassword(event){
    let pw = event.detail.value
    this.setData({
      password:pw
    })
  },
  login(){
    if(!app.globalData.userInfo){
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
          })
          app.globalData.userInfo = res.userInfo
          wx.setStorageSync('userInfo',res.userInfo)
          app.globalData.avatarUrl = res.userInfo.avatarUrl
          wx.setStorageSync('avatarUrl',res.userInfo.avatarUrl)
          app.globalData.nickName = res.userInfo.nickName
          wx.setStorageSync('nickName',res.userInfo.nickName)
          console.log(res.userInfo)
          console.log(app.globalData.userInfo)
          console.log(app.globalData.avatarUrl)
        },
        fail:(err) => {
          console.log(err)
        }
      })
    }
    var that = this
    wx.request({
      url: 'https://192.168.1.148/hello',
      data: {
        student_id:this.data.student_id,
        password:this.data.password,
      },
      header: {
       "Content-Type": "application/json" ,//用于post
       //"Authorization": "Bearer {{your_token}}",
      },
      method: 'POST',
      success: function (res) {
        console.log("res", res); 
        if(res.data.password){
          //console.log(res.data.data.token)
          // app.globalData.token = res.data.data.token
          //console.log(app.globalData.token)
          // wx.setStorageSync('token',res.data.data.token)
          app.globalData.student_id = that.data.student_id
          wx.setStorageSync('student_id',that.data.student_id)
          app.globalData.password = that.data.password
          wx.setStorageSync('password',that.data.password)
          wx.showToast({
            title: '登陆中',
            icon: 'success',
            duration: 15000
          })
          console.log("登录成功")
          //登录成功跳转页面
          wx.switchTab({
            url: '../ddl/ddl'
          })
        }
        else{
          wx.showToast({
            title: '账号或密码错误',
            icon: 'error',
            duration: 1500
          })
          console.log("账号或密码错误")
        }
      },
      fail: function (res) { 
        wx.showToast({
          title: '服务器开小差了',
          icon: 'error',
          duration: 5000
        })
        console.log("服务器开小差了")
      },
    })
    
  },
})
