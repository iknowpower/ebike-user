var app = getApp();
Page({
  data: {
    showOneButtonDialog: false,
    oneButton: [{ text: '取消' }],
    tsjyList: [
      { 'commitTimeFormat': '2020-08-08 12:44:33', 'csworkorderDesc': '机器故障。。。' },
      { 'commitTimeFormat': '2020-08-08 12:44:33', 'csworkorderDesc': '机器故障。。。' },
      { 'commitTimeFormat': '2020-08-08 12:44:33', 'csworkorderDesc': '机器故障。。。' },
      { 'commitTimeFormat': '2020-08-08 12:44:33', 'csworkorderDesc': '机器故障。。。' },
      { 'commitTimeFormat': '2020-08-08 12:44:33', 'csworkorderDesc': '机器故障。。。' },
      { 'commitTimeFormat': '2020-08-08 12:44:33', 'csworkorderDesc': '机器故障。。。' },
      { 'commitTimeFormat': '2020-08-08 12:44:33', 'csworkorderDesc': '机器故障。。。' },
      { 'commitTimeFormat': '2020-08-08 12:44:33', 'csworkorderDesc': '机器故障。。。' },
      { 'commitTimeFormat': '2020-08-08 12:44:33', 'csworkorderDesc': '机器故障。。。' },
      { 'commitTimeFormat': '2020-08-08 12:44:33', 'csworkorderDesc': '机器故障。。。' },
      { 'commitTimeFormat': '2020-08-08 12:44:33', 'csworkorderDesc': '机器故障。。。' },
      { 'commitTimeFormat': '2020-08-08 12:44:33', 'csworkorderDesc': '机器故障。。。' }
    ],
    tcount: 1,
    userid: '',
  },

  //投诉建议弹窗的取消按钮点击事件
  tapDialogButton(e) {
    this.setData({
      showOneButtonDialog: false
    })
  },
  //投诉建议按钮点击事件
  tapOneDialogButton(e) {
    this.setData({
      showOneButtonDialog: true
    })
  },
  onShow() {
    var that = this;
    // wx.showLoading();
    // app.getSessionId().then(function(sessionid){    
    // wx.request({
    //   url: app.httpUrl + '/ebike-charge/workOrder/initTsjyWx.x', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
    //   data: {
    //     sessionid: sessionid
    //   },

    //   success: (re) => {
    //     console.log(re.data);
    //     // 授权成功并且服务器端登录成功
    //     wx.hideLoading();
    //     that.setData({
    //       tsjyList: re.data.tsjyList,
    //       tcount:re.data.tcount,
    //       userid:re.data.userid,
    //     });       
    //   },
    //   fail: () => {
    //     wx.hideLoading();
    //   },
    // });
    // })
  },

  //投诉建议
  tsjy(e) {
    wx.navigateTo({
      url: 'newtsjy/newtsjy?userid=' + this.data.userid
    });
  },
  //投诉建议详情页
  tsjymx(e) {
    console.log(e);
    wx.navigateTo({
      url: 'tsjymx/tsjymx?id=' + e.currentTarget.dataset.tsjyid + "&tsjg=" + e.currentTarget.dataset.tsjyjg
    });
  },

  //设备故障
  devicefault(e){

  },
  //其他问题
  otherproblems(e){
    this.setData(
      {showOneButtonDialog: false}
    ),
    wx.navigateTo({
      url: 'newtsjy/newtsjy?userid=' + this.data.userid
    });
  }
});
