var app = getApp();
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    stList: [],
    cmpnid:''
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  confirm: function (e) {
    this.showStlist(e.detail.value,'search');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cmpnid: options.cmpn_id
    })

    this.showStlist('','show');
  },

  showStlist(name,type) {
    wx.showLoading({
      title: '正在加载中',
    })
    let that = this;
    wx.request({
      url: app.httpUrl + '/ebike-charge/cmpn/getCmpnRel.x', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
      data: {
        cmpnid:that.data.cmpnid,
        name: name
      },
      success: (re) => {
        if(type == 'search' && re.data.reList.length == '0'){
          wx.showModal({
            title: '提示',
            content: '您搜索的电站不参与此活动',
            showCancel:false
          })
        }else{
          that.setData({
            stList: re.data.reList
          })
        }
      },complete:()=>{
        wx.hideLoading();
      }
    });
  },
})