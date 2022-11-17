var colors = require('../../utils/colors.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    weekArray: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周'],
    pageNum: 0, // 当前所在分类的索引
    todayDay: '', // 今日日期
    todayMonth:'', // 今日月份
    todayWeek:'', // 今日周
    day:'', // 日期
    month: '', // 月份
    monthNum:1,
    week: ['一', '二', '三', '四', '五', '六','日'], // 周日为起始日
    nowDay:[1,2,3,4,5,6,7], // 本周的七天日期
    schoolTime: ['2022','02','28'], // 本学期开学时间
    nowWeek: '', // 当前周
    course_time:[
      ['8:40',''],
      ['','10:00'],
      ['10:30',''],
      ['','11:50'],
      ['14:00',''],
      ['','15:20'],
      ['15:50',''],
      ['','17:10'],
      ['18:30',''],
      ['','19:50'],
      ['20:00',''],
      ['','21:20'],
  ],
    wList: [
    
  ]},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nowWeek = this.getNowWeek()
    let nowDay = this.getDayOfWeek(nowWeek)
    let pageNum = nowWeek - 1
    let month = this.getMonth((nowWeek - 1) * 7);
    this.data.todayMonth
    this.setData({
      nowWeek,
      nowDay,
      pageNum,
      todayWeek:nowWeek,
      monthNum: month / 1, // 当前月份数字类型，用于数字运算
      colorArrays: colors // 课表颜色
    })
  
    let list = wx.getStorageSync('list');
    let aaa = getarray(list);
    this.setData({
      wList: aaa,
     
      course_list: aaa
    })
  },

  // 获取第几周后的月份
  getMonth(days) {
    let [year,month,day] = this.data.schoolTime
    var date = new Date(year,month-1,day);    
    date.setDate(date.getDate() + days);//获取n天后的日期      
    var m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);        
    return  m;     
  },

  // 获取第几周后的星期几的日期
  getDay(days) {
    let [year, month, day] = this.data.schoolTime
    var date = new Date(year, month-1, day);
    date.setDate(date.getDate() + days);//获取n天后的日期      
    var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();//获取当前几号，不足10补0    
    return d;
  },

  // 获取当前周
  getNowWeek(){
    var date = new Date();
    let [year, month, day] = this.data.schoolTime
    var start = new Date(year, month-1, day);
    //计算时间差
    var left_time = parseInt((date.getTime()-start.getTime())/1000)+24 * 60 * 60;
    var days = parseInt(left_time/3600/24);
    var week = Math.floor(days / 7) + 1;
    var result = week
    if(week>20 || week <= 0){
      result = this.data.now_week;
    }
    return result
  },

  //获取一周的日期
  getDayOfWeek(week){
    var day = []
    for (var i = -1; i < 6; i++) {
      var days = (week - 1) * 7 + i;
      day.push(this.getDay(days))
    }
    return day
  },

  // 获取课表数据
  async getCourseList(){

  },

  // 点击切换导航的回调
  changeNav(event){
    let pageNum = event.currentTarget.dataset.page
    let nowWeek = pageNum + 1
    let nowDay = this.getDayOfWeek(nowWeek)
    let month = this.getMonth((nowWeek-1)*7)
    this.setData({
      pageNum,
      nowWeek,
      nowDay,
      month,
      monthNum: month / 1, // 当前月份数字类型，用于数字运算
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      todayDay: new Date().getDate(),
      todayMonth: new Date().getMonth() + 1,
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
    })
  },
})
//     { "id":1,"isToday": 5, "jie": 3, "classNumber": 2, "name": "算法设计与分析" ,"address":"5506" },],

function strHandle(str) {
  var arr = str.split('":"');
  var arr1 = arr[1].split(/[\[\]:]/);
  let map = new Map();
  let map_in = new Map();
  let a = 0;
  var name;
  map.set("courseName", arr1[0]);
  for (let index = 0; index < arr1.length; index++) 
  {
    
    var tmp = judgeSingle(arr1[index]);
    if (tmp != null) {
    
      map_in.set("单双周标志", tmp);
    }

    if(judegeClass(arr1[index]))
    {
      map_in.set("教室", arr1[index]);

    }
    if ((tmp = judegeTeacher(arr1[index])) != null)
    {
      map_in.set("教师", tmp);

    }
    if(((tmp = judgeWeek(arr1[index])) != null))
    {
      map_in.set("周数", tmp);
      
      map.set("class" + a, map_in);
      map_in = new Map();
      a = a + 1;
    }
  }
  map.set("number", a);
  return map;
}
function judgeSingle(str) {
  if ((str.indexOf('单') >= 0)) {
    return '单';
  }
  if ((str.indexOf('双') >= 0)) {
    return '双';
  }
  return null;
}
function judgeWeek(str) {
  var weeklist = null;
  if (str.indexOf('-') >= 0 && str.indexOf('旗山') < 0) {
    weeklist = str.match(/\d+/g);
  }
  return weeklist;
}
function judegeTeacher(str) {
  var teacher = null;
  if (str.indexOf('-') >= 0 && str.indexOf('旗山') < 0) 
  {
    let tmp = str.split(/[\d]/);
    teacher = tmp[0];
   }
  return teacher;
}
function judegeClass(str) {
  
  if (str.indexOf('-') >= 0 && str.indexOf('旗山') >= 0) 
  {
      return true;
  }
  return false;
}
function getarray(jsondata) {
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
for(let weekindex = 0;weekindex < 22;weekindex++){
  let aday = [];
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
      if(index <= 0)
      {
        coureprename = coursename;
      }

      if(coursename != "\"}")
      {
        mabuf = ma[index].get('class0');
        if (mabuf.get('单双周标志')) {
          if(mabuf.get('单双周标志') == '单' && weekindex % 2 == 0)
          {
            let weekarrange = mabuf.get('周数');
            let we1 = parseInt(weekarrange[0]);
            let we2 = parseInt(weekarrange[1]);
            if (weekindex >= we1 && weekindex <= we2) {
              if(index >= 1 && coureprename == coursename)
              {         
                aday[arrin-1].classNumber = aday[arrin-1].classNumber + 1;
      
              }
              else
              {
                coureprename = coursename;
                colorid = (colorid + 1)%10 + 1;
                acourse["name"] = String(ma[index].get('courseName'));
               
                acourse["address"] = mabuf.get('教室');  
          
                aday[arrin] = acourse;
                arrin = arrin + 1;
      
              }
            }
          }
          if(mabuf.get('单双周标志') == '双' && weekindex % 2 == 1)
          {
            let weekarrange = mabuf.get('周数');
            let we1 = parseInt(weekarrange[0]);
            let we2 = parseInt(weekarrange[1]);
            if (weekindex >= we1 && weekindex <= we2) {
              if(index >= 1 && coureprename == coursename)
              {         
                aday[arrin-1].classNumber = aday[arrin-1].classNumber + 1;
      
              }
              else
              {
                coureprename = coursename;
                colorid = (colorid + 1)%10 + 1;
                acourse["name"] = String(ma[index].get('courseName'));
               
                acourse["address"] = mabuf.get('教室');  
          
                aday[arrin] = acourse;
                arrin = arrin + 1;
      
              }
            }
          }
        }
        else
        {
          let weekarrange = mabuf.get('周数');
          let we1 = parseInt(weekarrange[0]);
          let we2 = parseInt(weekarrange[1]);
          if (weekindex >= we1 && weekindex <= we2) {
            if(index >= 1 && coureprename == coursename)
            {         
              aday[arrin-1].classNumber = aday[arrin-1].classNumber + 1;
    
            }
            else
            {
              coureprename = coursename;
              colorid = (colorid + 1)%10 + 1;
              acourse["name"] = String(ma[index].get('courseName'));
             
              acourse["address"] = mabuf.get('教室');  
        
              aday[arrin] = acourse;
              arrin = arrin + 1;
    
            }
          }
        }



      }    
    }

  }
  findata[weekindex] = aday;
}

 

  return findata;
}

function getWeek(str)
{
  let week = str.split('-');
  let week1 = parseInt(week[0]);
  let week2 = parseInt(week[1]);
  let weeklist = [];
  weeklist[0] = week1;
  weeklist[1] = week2;
  return weeklist;
}
