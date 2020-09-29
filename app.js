
App({
  codeid:'',
  httpUrl:'https://xcx.ebike-charge.com',//生产
  //httpUrl:'https://xcxbeta.ebike-charge.com',
  //测试smsappletbeta.ebike-charge.com',//阿土本地测试
  globalData: {
    hasLogin: false,
    userPhone:'',
    userRegion:'',
    apiW:0,
    apiH:0,
    sessionid:null,
    expiredTime: 0,
    office_tel:'0571-81110722'
  },
  onLaunch:function(options) {    
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.apiW = res.windowWidth;
        this.globalData.apiH = res.windowHeight - 40;
      }
    })
  },

  getSessionId() {
    return new Promise((resolve, reject) => {
      var sessionId = this.globalData.sessionId;
      var expiredTime = this.globalData.expiredTime;
      var now = +new Date();
      // session不为空并且不过期
      if (this.globalData.sessionid != null && ((now - expiredTime) <= 1 * 24 * 60 * 60 * 1000)) {
        resolve(this.globalData.sessionid);
      } else {
        var that = this;
          wx.login({
            success: (res)=> {
              if (res.code) {
                //TODO
                console.log('获取微信用户登录态成功！');
                wx.request({
                  url: that.httpUrl + '/ebike-charge/wxXcx/getXcxMsg.x',
                  data: {
                    code: res.code
                  },
                  success: (xcxre)=> {
                    console.log('后台获取微信用户SESSION成功！',xcxre.data.sessionid);
                    // 授权成功并且服务器端登录成功
                    that.globalData.sessionid = xcxre.data.sessionid;
                    that.globalData.expiredTime = +new Date();
                    that.globalData.hasLogin = true;
                    that.globalData.userPhone = xcxre.data.phone;
                    that.globalData.userRegion = xcxre.data.region;
                    resolve(xcxre.data.sessionid);
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          });
         }      
       });
  },
});
