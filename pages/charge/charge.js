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

  onShow(option) {
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

          wx.hideLoading();
        },
        fail: () => {
          // 根据自己的业务场景来进行错误处理
        },
      });
  },

  upCz(event) {
    var index = event.currentTarget.dataset.index;
    var sfup = event.currentTarget.dataset.sfup;
    var czcount = event.currentTarget.dataset.czcount;
    var up = 'devDate['+index+'].up';
    var czshow = 'devDate['+index+'].czshow';
    var devHeight = 'devDate['+index+'].devHeight';
    if(sfup === 'true'){
        this.setData({
          [up]:'',
          [czshow]:'',
          [devHeight]:'80px',
        })
    }else{
        this.setData({
          [up]:'true',
          [czshow]:'true',
          [devHeight]:(80 + 72*czcount) + 'px',
        })
    } 
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

  onPullDownRefresh() {
    wx.request({
        url: app.httpUrl + '/ebike-charge/wxXcx/getDevInfo.x', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
        data: {
          stationid: this.data.stationid
        },
        success: (re) => {
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
                    devDate[i].czshow='';
                    devDate[i].up='';
                    devDate[i].devHeight='80px';
                    devDate[i].czHeight=69*czcount + 'px';
                }else{
                    devDate[i].czshow='true';
                    devDate[i].up='true';
                    devDate[i].czCount = czcount;
                    devDate[i].devHeight=80 + (72*czcount) + 'px';
                    devDate[i].czHeight=69*czcount + 'px';
                }
            }
            this.setData({
              stname:re.data.stname,
              staddr:re.data.staddr,
              czkxs: re.data.czkxs + '（空闲）',
              czzs:'/' + re.data.czzs +'（总）',
              devDate:devDate
            }); 

            wx.stopPullDownRefresh();
        },
        fail: () => {
          // 根据自己的业务场景来进行错误处理
        },
      });
  },
});
