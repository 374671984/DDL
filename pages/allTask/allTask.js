// pages/allTask/allTask.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type_list:[{
      showItem: false,
      type: "课程作业"
    },{
      showItem: false,
      type: "实验"
    },{
      showItem: false,
      type: "实践作业"
    }],
    ddlList: app.globalData.ddl_list,
    course:'',
    taskname:'',
    taskremark: '',
    date: '',
    type:'',
    type_index: '',
    course_index: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onShow(){
    this.setData({
      ddlList: app.globalData.ddl_list
  })
  },
  // 点击三种类型的函数
  onClick_allTask_type(e){
    console.log(e.currentTarget.dataset.typeindex)
    this.setData({
      type_index : e.currentTarget.dataset.typeindex
    })
    const type_list = this.data.type_list
    type_list[this.data.type_index].showItem = !type_list[this.data.type_index].showItem
    this.setData({
      type_list
    })
    console.log(this.data.type_list)
    console.log(this.data.type_index)
  },
// 点击类型里面的课程的跳转函数
onClick_allTask_item(e){
   this.setData({
    course_index : e.currentTarget.dataset.itemindex,
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
   console.log(e.currentTarget.dataset.itemindex)
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