// pages/remind/remind.js
const app = getApp()
Page({
  data: {
    active: 0,
    ddlList: app.globalData.ddl_list,
    course:'',
    taskname:'',
    taskremark: '',
    date: '',
    type:'',
    course_index: ''
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.data.ddlList)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  this.setData({
    ddlList: app.globalData.ddl_list,
  })
  },
  onClick_remind_item(e){
    this.setData({
      course_index : e.currentTarget.dataset.remindindex,
      course : e.currentTarget.dataset.course,
      taskname : e.currentTarget.dataset.taskname,
      taskremark : e.currentTarget.dataset.taskremark,
      date : e.currentTarget.dataset.deadline,
      type : e.currentTarget.dataset.type,
     }) 
     app.globalData.course = this.data.course
     app.globalData.taskname = this.data.taskname
     app.globalData.taskremark = this.data.taskremark
     app.globalData.deadline = this.data.date
     app.globalData.type = this.data.type
     app.globalData.index = this.data.course_index
     console.log(this.data.course_index)
     console.log(e.currentTarget.dataset.remindindex)
     console.log(app.globalData.course)
     console.log(app.globalData.taskname)
     console.log(app.globalData.taskremark)
     console.log(app.globalData.deadline)
     console.log(app.globalData.type)
     console.log(app.globalData.index)
     wx.navigateTo({
       url: '/pages/edit/edit',
     })
  }
})