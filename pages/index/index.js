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
    if(wx.getUserProfile){
      this.setData({
        userInfo:app.globalData.userInfo
      })
    }
    let list = wx.getStorageSync('list');
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
  login(e){
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
      url: 'http://localhost:8080/courses/user',
      data: {
        Student_id:that.data.student_id,
        Password:that.data.password,
      },
      header: {
       "Content-Type": "application/json" ,//用于post
       //"Authorization": "Bearer {{your_token}}",
      },
      method: 'post',
      success: function (res) {
        console.log("res", res); 
        if(res.data.星期一){
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
            duration: 2000
          })
          console.log("登录成功")
          

              wx.setStorage({
                data: res.data,//需要存储的内容。只支持原生类型、Date、及能
                key: 'list',
              })
            

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

function getCourseName(jsondata) {
  var day1 = jsondata.星期一;
  var day2 = jsondata.星期二;
  var day3 = jsondata.星期三;
  var day4 = jsondata.星期四;
  var day5 = jsondata.星期五;
  var day6 = jsondata.星期六;
  var day7 = jsondata.星期日;
  var list = [];
  var findata = [];
  list.push(day1);
  list.push(day2);
  list.push(day3);
  list.push(day4);
  list.push(day5);
  list.push(day6);
  list.push(day7);

  let arrin = 0;
  let colorid = 1;
  let arr = [];
  let courseSet = new Set();
  let teacherSet = new Set();
  for (let i = 0; i < 7; i++) {
   
    let tmp = list[i];
    let coureprename = '';
    
    for (let index = 0; index < 11; index++) {
    //     { "id":1,"isToday": 5, "jie": 3, "classNumber": 2, "name": "算法设计与分析" ,"address":"5506" },],
      let ma = new Map();
      let mabuf = new Map();
      ma[index] = strHandle(JSON.stringify(tmp[index])) ;
       
      let acourse = {};
      acourse["id"] = colorid;
      acourse["isToday"] = i;
      acourse["jie"] = index + 1;
      acourse["classNumber"] = 1;
      let coursename = String(ma[index].get('courseName'));    
      courseSet.add(coursename);
      if(coursename != "\"}")
      {
        mabuf = map[index].get('class0');
        let teacher = mabuf.get('教师');
        let teandcou = coursename + teacher;
        teacherSet.add(teandcou);
        console.log(teacherSet);
      }    
    }

  }
  arr[0] = courseSet;
  arr[1] = teacherSet;
  return arr;

}
