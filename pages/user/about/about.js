Page({
  data: {},
  onLoad() {},

  makePhoneCall() {
    wx.makePhoneCall({ phoneNumber: '0571-81110722' });
  },
  // preImg(e){
  //   console.log(e.currentTarget.dataset.imsrc);
  //   wx.previewImage({
  //     urls: [
  //       '/image/ewm.png',
  //     ],
  //   });
  // }
});
