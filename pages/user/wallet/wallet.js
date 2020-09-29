var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    account_num: '0.0',
    hbaccount: 0,
    hbaccount_num: '0.0',
    package: 1,
    pkgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.httpUrl + '/ebike-charge/wxxcxUserCenter/initMyWallet.x', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
      data: {
        sessionid: app.globalData.sessionid
      },
      success: (re) => {
        // 授权成功并且服务器端登录成功
        console.log(re.data);
        that.setData({
          account_num: re.data.account_num,
          hbaccount: re.data.hbaccount,
          package: re.data.package
        });

        if (re.data.hbaccount == 1) {
          that.setData({
            hbaccount_num: re.data.hbaccount_num
          });
        }

        if (re.data.package == 1) {
          that.setData({
            pkgList: re.data.pkgList
          });
        }

        console.log(that.data);
      },
      fail: () => {},
    })
  },

  goCharge(e) {
    wx.navigateTo({
      url: 'walletDetail/walletDetail',
    })
  },

  onShow() {
    // 默认查询当月消费记录
    var t = new Date();
    var year = t.getFullYear();
    var month = t.getMonth() + 1;
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    var current = year + "-" + month;
    var start = (year - 1) + "-01-01";
    var end = current + "-01";
    this.setData({
      month: current,
      startDate: start,
      endDate: end,
    });
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.httpUrl + '/ebike-charge/wxxcxUserCenter/getHisCz.x', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
      data: {
        sessionid: app.globalData.sessionid,
        month: this.data.month
      },
      success: (re) => {
        // 授权成功并且服务器端登录成功
        this.setData({
          wdqjl: re.data.wdqjl,
          czList: re.data.czList,
        });
      },
      fail: () => {},
      complete: () => {
        wx.hideLoading();
      }
    });
  },

  getM(e) {
    this.setData({
      month: e.detail.value
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.httpUrl + '/ebike-charge/wxxcxUserCenter/getHisCz.x', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
      data: {
        sessionid: app.globalData.sessionid,
        month: e.detail.value
      },
      success: (re) => {
        // 授权成功并且服务器端登录成功
        this.setData({
          wdqjl: re.data.wdqjl,
          czList: re.data.czList,
        });
      },
      fail: () => {},
      complete: () => {
        wx.hideLoading();
      }
    });
  }
})