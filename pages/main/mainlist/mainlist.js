var app = getApp();
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    stList: [],
    longitude: "",
    latitude: "",
    start:1,
    limit:10,
    total: 0,//数据总条数
    loading: false,//是否正在加载
    loadTips: app.globalData.loading,//上拉加载提示
    showLoadingGif: false,//显示正在加载Gif
    loadMore:false
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
    this.showStlist(false,e.detail.value, false);
  },

  onLoad(option) {
    this.setData({
      longitude: option.longitude,
      latitude: option.latitude,
    })

    this.showStlist(false,'', false);
  },

  showStlist(loadMore,name, sfsx) {
    //不是加载更多  第一次请求或者刷新显示loading提示
    if (!loadMore)
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

        //请求数据成功 
        that.setData({
          loading: false,
        })

        // console.log(re);
        var stList = re.data.reList;
        
        if(stList.length==0){
           //提示没有更多了
           that.setData({
            loadTips: app.globalData.noMore
          })
        }else{
          if(loadMore){
            //下一页的数据拼接在原有数据后面
            that.setData({
              stList: that.data.stList.concat(stList)
            })
          }else{
            //第一页数据直接赋值
            that.setData({
              total: re.data.recount,
              stList: stList,
              loadMore:true
            })
          }

          //集合当前长度大于等于集合总数 并且集合当前长度大于每页加载条数时关闭上拉加载 提示没有更多数据了  防止第一页数据数小于等于limit时出现没有更多数据了
          if (that.data.stList.length >= that.data.total&&that.data.stList.length>that.data.limit) {
            that.setData({
              loading: true,
              showLoadingGif:false,
              loadTips: app.globalData.noMore,
              loadMore:false
            });
          }

        }

        if (sfsx) {
          wx.stopPullDownRefresh();
        }
      },complete:()=>{
        wx.hideLoading();
      },fail:()=>{
        that.setData({
          loading:true,
          loadTips: app.globalData.loadingFailed,
          showLoadingGif: false
        });
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
    //下拉刷新时关闭正在加载和加载更多
    this.setData({
      start: 1,
      loading: false,
    });
    this.showStlist(false,'', true);
  },

  onReachBottom: function (e) {
    var that = this;
    //loading:是否正在加载
    //loadMore:是否上拉加载
    //cb:callback回调
    app.onLoadMore(this.data.loading, this.data.loadMore, function (loadMore, loadTips, loading, showLoadingGif) {
      that.setData({
        start:that.data.start+1,
        loadTips: loadTips,
        loading: loading,
        showLoadingGif: showLoadingGif,
        loadMore:loadMore
      });
      //开启上拉加载
      if (loadMore)that.showStlist(true, that.data.inputVal, true);
    });
  },


});