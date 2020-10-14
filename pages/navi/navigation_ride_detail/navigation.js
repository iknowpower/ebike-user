var amapFile = require('../../../libs/amap-wx.js');
var config = require('../../../libs/config.js');

Page({
  data: {
    steps: {}
  },
  onLoad: function(option) {
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    let that = this;
    console.log(option);
    myAmapFun.getRidingRoute({
      origin:  option.jd_start + "," + option.wd_start,
      destination: option.jd_end + "," + option.wd_end,
      success: function(data){
        console.log(data.paths[0].steps);
        if(data.paths && data.paths[0] && data.paths[0].steps){
          that.setData({
            steps: data.paths[0].steps
          });
        } 
      },
      fail: function(info){
        console.log(info);
      },
    })
  }
})