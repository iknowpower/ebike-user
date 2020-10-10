// 客服中心
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aCount: 0,
    aList: [
      { 'question': '充电显示设备离线，怎么解决？', 'answer': '在投诉建议中说明具体位置以及二维码下面的编号或者给客服打电话及时反馈。\n设备离线的原因有很多可能，需要现场工作人员去排查故障。' },
      { 'question': '我插上插座没充上电是什么原因？钱会退给我吗？', 'answer': '钱会原路返回到您的账户上。没充上电可能原因是信号差，或者该插座出现故障，建议换其他插座进行充电。' },
      { 'question': '充电充满会自动断开电吗？', 'answer': '会的。' },
      { 'question': '显示特定用户可以使用，我怎么申请权限？', 'answer': '如果是公司的员工向公司申请，如果不是，建议您换一台充电桩呢！' },
      { 'question': '充电车充电最大限制多少功率？', 'answer': '根据国家规定，充电车的功率不得超过500w。' },
      { 'question': '投币、刷卡和扫码充电可以续充吗？', 'answer': '不可以续充，等充电结束可以重新投币充电、刷卡充电或者扫码充电。' },
      { 'question': '在哪可以看见这台充电桩的收费标准？', 'answer': '扫码充电用微信扫一扫可以看到收费标准。\n一般刷卡设备上显示收费标准。\n一般投币充电桩旁边会写收费标准。' }
    ]
  },

  //问答页面
  itemBindTap: function (e) {

    console.log();
    wx.navigateTo({
      url: 'kfzxan/kfzxan?question=' + e.currentTarget.dataset.question + "&answer=" + e.currentTarget.dataset.answer,
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage',{'question':e.currentTarget.dataset.question,'answer':e.currentTarget.dataset.answer})
      }
    })
  },

  //联系客服
  lxkf: function (e) {
    wx.navigateTo({
      url: '../about/about',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})