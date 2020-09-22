var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 1,
    info: [
      {
        'chargeFinishTime': '2020-08-08 17:56:34',
        'chargeAddr': '钱农西路2#充电站 4号插座',
        'finishReasonDesc': '插头未连接',
      },
      {
        'chargeFinishTime': '2020-08-08 17:56:34',
        'chargeAddr': '钱农西路2#充电站 4号插座',
        'finishReasonDesc': '插头未连接',
      },
      {
        'chargeFinishTime': '2020-08-08 17:56:34',
        'chargeAddr': '钱农西路2#充电站 4号插座',
        'finishReasonDesc': '插头未连接',
      },
      {
        'chargeFinishTime': '2020-08-08 17:56:34',
        'chargeAddr': '钱农西路2#充电站 4号插座',
        'finishReasonDesc': '插头未连接',
      },
      {
        'chargeFinishTime': '2020-08-08 17:56:34',
        'chargeAddr': '钱农西路2#充电站 4号插座',
        'finishReasonDesc': '插头未连接',
      },
      {
        'chargeFinishTime': '2020-08-08 17:56:34',
        'chargeAddr': '钱农西路2#充电站 4号插座',
        'finishReasonDesc': '插头未连接',
      },
      {
        'chargeFinishTime': '2020-08-08 17:56:34',
        'chargeAddr': '钱农西路2#充电站 4号插座',
        'finishReasonDesc': '插头未连接',
      },
      {
        'chargeFinishTime': '2020-08-08 17:56:34',
        'chargeAddr': '钱农西路2#充电站 4号插座',
        'finishReasonDesc': '插头未连接',
      }
     
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    // wx.request({
    //   url: app.httpUrl + '/ebike-charge/logMsg/getLogList.x',
    //   data: {
    //     sessionid: app.globalData.sessionid
    //   },
    //   success: (re) => {
    //       that.setData({
    //         info:re.data.info,
    //         count:re.data.count
    //       })
    //   }
    // });
  },

  goHis() {
    wx.navigateTo({
      url: '../user/hiscd/hiscd',
    })
  }
})