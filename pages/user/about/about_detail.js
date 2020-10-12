// pages/user/about/about_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_like: true,
    show_unlike:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      content: options.content
    })
  },


  like: function () {
    this.animation.translateY(-50).step()
    this.setData({
      animation: this.animation.export(),
      show_like: false,
      show_unlike:true
    })
  },
  unlike: function () {
    this.animation.translateY(-50).step()
    this.setData({
      animation: this.animation.export(),
      show_like: true,
      show_unlike:false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()
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