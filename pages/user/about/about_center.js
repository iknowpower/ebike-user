var app = getApp();
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
        console.log(re.data.info);
        if (re.data.info){
            this.setData({
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
  },

  goDetail(e){
    console.log(e.currentTarget.dataset.content);
    wx.navigateTo({
      url: 'about_detail?content=' + e.currentTarget.dataset.content + "&name=" + e.currentTarget.dataset.name,
    })
  }
})