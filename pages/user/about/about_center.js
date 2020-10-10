// pages/user/about/about_center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.httpUrl + '/ebike-charge/wxcommon/getCodeList.x', 
      data: {
        code_type: 'EBIKE_CUSTOMER_SERVICE'
      },
      success: (re) => {
        if (re.data.info){
            that.setData({
              aboutList: re.data.info
            });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },
  goAbout(){
    wx.navigateTo({
      url: 'about',
    })
  }
})