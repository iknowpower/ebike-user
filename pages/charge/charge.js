var app =getApp();

Page({
  data: {
    stname:'',
    staddr:'',
    czkxs:'（空闲）',
    czzs:'/（总）',
    devDate:[],
    stationid:'',
    cmpnid:''
  },
  onLoad(option) {
    console.log("充电设备页面：",option);
    this.setData({
      stationid:option.id,
      cmpnid:option.cmpnid
    });
  },

  onShow() {
    this.showInfo();
  },

  goCd(e) {
    //充电状态为空闲跳转到支付页面
    if(e.currentTarget.dataset.cdzt == '0'){
      wx.navigateTo({ url: '../paycharge/paycharge?id=' + e.currentTarget.dataset.cdczno});
    // 充电状态为充电中，跳转到充电信息页面
    }else if(e.currentTarget.dataset.cdzt == '1'){
      wx.navigateTo({ url: '../cdxx/cdxx?id=' + e.currentTarget.dataset.cdczno});
    }
  },

  showInfo(){
    wx.showLoading({
      title:'加载中'
    });
     wx.request({
          url: app.httpUrl + '/ebike-charge/wxXcx/getDevInfo.x', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
          data: {
            stationid: this.data.stationid
          },
          success: (re) => {
            console.log(re.data);
              var devDate = re.data.devDate;
              for(var i=0;i<devDate.length;i++){
                  var devczzt = devDate[i].devCzzt;
                  var devczs = devDate[i].plugCount;
                  var czcount;
                  if(devczs%4 != 0){
                      czcount = parseInt(devczs/4) + 1;
                  }else{
                      czcount = parseInt(devczs/4);
                  }
                  devDate[i].czCount = czcount;
                  if(devczzt == '1'){
                  }else{
                      devDate[i].czCount = czcount;
                  }
              }
              this.setData({
                stname:re.data.stname,
                staddr:re.data.staddr,
                czkxs: re.data.czkxs + '（空闲）',
                czzs:'/' + re.data.czzs +'（总）',
                devDate:devDate,
            }); 
          },
          fail: () => {
            // 根据自己的业务场景来进行错误处理
          },
          complete:()=>{
            wx.hideLoading();
          }
     });
  },

  onPullDownRefresh() {
    this.showInfo();
  },
});
