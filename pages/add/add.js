// pages/add/add.js
const app = getApp()
Page({
  data: {
    //课程名
    Course: '',
    //任务名
    taskName: '',
    //任务备注
    taskRemark: '',
    //日期
    date: '',
    //日历弹出层，默认隐藏
    show: false,
    //是否设置提醒
    isChecked_warn: false,
    //是否同步
    isChecked_syn: false,
    //任务类型，默认为课程作业
    radio: '1',
    ddlList: [],
    type:'',
    courseList:[],
  },
  onLoad(){
    if(app.globalData.ddl_list){
      this.setData({
        ddlList : app.globalData.ddl_list
      })
    }
    console.log(app.globalData.ddl_list)
  },
  gotoAllTask(){
    wx.navigateTo({
      url: '/pages/allTask/allTask',
    })
  },
  // 获取课程名称
  onConfirmCourse(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      Course: value
    });
    this.setData({ showPop: false });
  },

  onCancelCourse() {
    this.setData({ showPop: false });
  },

  //获取任务名称
  getTaskname(e) {
    this.setData({
      taskName: e.detail.value
    })
  },
  //获取任务备注
  getTaskremark(e) {
    this.setData({
      taskRemark: e.detail.value
    })
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },
  onChange_warn({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData(
      {
        checked: detail,
        isChecked_warn: detail.value
      }
    ),
    console.log(this.data.isChecked_warn)
  },
  onChange_syn({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData(
      {
        checked: detail,
        isChecked_syn: detail.value
      }
    )
  },
  onChange1(event) {
    this.setData({
      radio: event.detail.value
    });
  },
  //课程选择弹出层
  showPopup() {
    this.setData({
      courseList: ['软件工程', '计算机操作系统', '计算机图形学', '嵌入式系统', '软件体系结构', '人工智能', '虚拟现实', '机器学习', '形式与政策', 'Linux操作系统实践', '软件工程实践']//测试用数据
    });
    this.setData({ showPop: true });
  },
  // 课程选择关闭
  onClosePop() {
    this.setData({ show: false });
  },
  submit() {
    switch (this.data.radio) {
      case "1":
        this.setData({
          type: '课程作业'
        });
        console.log(this.data.radio);
        break;
      case "2":
        this.setData({
          type: '实验'
        });
        break;
      case "3":
        this.setData({
          type: '实践作业'
        });
        break;
    }
    if (this.data.Course == "" || this.data.taskName == "" || this.data.date == "") {
      wx.showToast({
        icon: 'error',
        title: '请输入完整数据'
      })
    } else {
      //需要同步的情况
      if (this.data.isChecked_syn == true) {
        wx.request({
          url: '接口地址',
          header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          data: {
            status: 0,
            TableName: this.data.Course + "",
            TaskID: this.data.taskName,
            Content: this.data.taskRemark,
            DDL: this.data.date,
            Type: this.data.type //1为课程作业，2为实验，3为实践作业
          },
          method: 'POST',
          success: res => {
            if (res.data == 'sucess') {
              wx.showToast({
                title: '同步创建成功',
              })
            } else {
              wx.showToast({
                title: '同步创建失败',
                icon: 'error'
              })
            }
          }
        })
      } else {//不需要同步的情况
        this.data.ddlList.push({
          type: this.data.type,
          deadline: this.data.date,
          Course: this.data.Course,
          taskName: this.data.taskName,
          taskRemark: this.data.taskRemark,
          isRemind : this.data.isChecked_warn
        });
        wx.showToast({
          title: '创建成功',
          icon: 'error'
        })
        console.log(this.data.ddlList)
        app.globalData.ddl_list = this.data.ddlList
        wx.setStorageSync('ddl_list', this.data.ddlList);
      }
    }
  }
});


