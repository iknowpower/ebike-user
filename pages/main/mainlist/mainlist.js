var app = getApp();
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    stList: [],
    longitude: "",
    latitude: "",
    start:1,
    limit:10
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
    this.showStlist(e.detail.value, false);
  },

  onLoad(option) {
    this.setData({
      longitude: option.longitude,
      latitude: option.latitude,
    })
    this.showStlist('', false);
  },

  showStlist(name, sfsx) {
    wx.showLoading({
      title: '正在加载中',
    })
    let that = this;
    wx.request({
      url: app.httpUrl + '/ebike-charge/wxXcx/getStationListLb.x', // 该url是自己的服务地址，实现的功能是服务端拿到authcode去开放平台进行token验证
      data: {
        longitude: that.data.longitude,
        latitude: that.data.latitude,
        name: name,
        start:this.data.start,
        limit: this.data.limit,
      },
      success: (re) => {
        that.setData({
          stList: re.data
        })

        if (sfsx) {
          wx.stopPullDownRefresh();
        }
      },complete:()=>{
        wx.hideLoading();
      }
    });
  },
  goDevDetail(e) {
    wx.navigateTo({ url: '../../charge/charge?id=' + e.currentTarget.dataset.stid + '&cmpnid=' + e.currentTarget.dataset.cmpnid});
  },

  goNavi(e) {
    wx.navigateTo({
      url: '../../navi/navigation_ride/navigation?jd_start=' + this.data.longitude
        + '&wd_start=' + this.data.latitude
        + '&jd_end=' + e.currentTarget.dataset.jd
        + '&wd_end=' + e.currentTarget.dataset.wd
    });
  },

  onPullDownRefresh() {
    this.showStlist('', true);
  },
});