
App({
  codeid:'',
  //httpUrl:'https://xcx.ebike-charge.com',//生产
  //httpUrl:'https://xcxbeta.ebike-charge.com',
  httpUrl:'https://iesmsappletbeta.ebike-charge.com',//阿土本地测试
  globalData: {
    hasLogin: false,
    userPhone:'',
    userRegion:'',
    apiW:0,
    apiH:0,
    sessionid:null,
    expiredTime: 0,
    office_tel:'0571-81110722',
    loading:"正在加载...",
    noMore:"-没有更多了-",
    loadingFailed:"加载失败了,请刷新",
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

  // 上拉加载  
  // loading:是否正在加载
  // loadMore:是否上拉加载
  // cb:callback回调
  onLoadMore: function(loading,loadMore,cb){
    //没有正在加载的情况下
    if(!loading){
      //集合长度大于总数 关闭上拉加载
      if(loadMore){
        //参数一:是否加载更多loadMore 
        //参数二:提示文字loadTips  
        //参数三:是否显示上拉加载的提示文字loading 
        //是否显示上拉加载gif showLoadingGif 
        cb(true,this.globalData.loading,true,true);
      }else{
        cb(false,this.globalData.noMore,true,false);
      }
      cb(this.globalData.loadRe);
    }
  },
});
