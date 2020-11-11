var app = getApp();
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    stList: [],
    longitude: "",
    latitude: "",
    start: 1,
    limit: 10,
    total: 0,//数据总条数
    loadFlag: '',
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
    this.setData({
      start: 1,
      total: 0,//数据总条数
      loadFlag: '',
    });
    this.showStlist(e.detail.value, false);
  },

  onLoad(option) {
    this.setData({
      longitude: option.longitude,
      latitude: option.latitude,
      loadTips: app.globalData.loadTips,
      noMore: app.globalData.noMore,
      loadingFailed: app.globalData.loadingFailed,
    })

    this.showStlist('', false);
  },

  showStlist(name, sfsx) {
    const param = {
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      name: name,
      start: this.data.start,
      limit: this.data.limit
    }
    app.request('/ebike-charge/wxXcx/getStationListLb.x',param)
    .then(re=>{
      console.log(re.data);
      var stList = re.data.reList;
        if (this.data.start == 1) {
          this.setData({
            total: re.data.recount,
            stList: stList
          })
        } else {
          this.setData({
            stList: this.data.stList.concat(stList)
          })
          if (this.data.stList.length >= this.data.total) {
            this.setData({
              loadFlag: '2'
            })
          } else {
            this.setData({
              loadFlag: ''
            })
          }
        }
    })
    .catch((e)=>{
      // console.log(e);
      this.setData({
        loadFlag: '3'
      });
    })
    .finally(()=>{
      if (sfsx) {
        wx.stopPullDownRefresh();
      }
    });
  },
  goDevDetail(e) {
    wx.navigateTo({ url: '../../charge/charge?id=' + e.currentTarget.dataset.stid + '&cmpnid=' + e.currentTarget.dataset.cmpnid });
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
    //下拉刷新时关闭正在加载和加载更多
    this.setData({
      start: 1,
      total: 0,//数据总条数
      loadFlag: '',
    });
    this.showStlist(this.data.inputVal, true);
  },

  onReachBottom() {
    app.getLoadFlag(this.data.stList.length, this.data.total, this.data.start)
    .then(loadFlag=>{
      this.setData({
        loadFlag: loadFlag
      })
      if (loadFlag == '1') {
        this.setData({
          start: this.data.start + 1
        })
        //开启上拉加载
        this.showStlist(this.data.inputVal, false);
      }
    });
  },
});