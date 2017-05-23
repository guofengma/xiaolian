//pay.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad')

  },
  //
  bindSubmitTap: function (e) {
    var that = this;
    // console.log(e.detail.value);
    var user = wx.getStorageSync("user");
    // console.log(user)
    that.xiadan(user.openid, e.detail.value);
  },
  //下单
  xiadan: function (openId, obj) {
    console.log(obj)
    console.log("-------------------")
    var that = this;
    wx.request({
      url: 'http://192.168.50.157:9999/wxpay/prepay',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        // 'content-type': 'application/json'
      },
      data: {
        'openid': openId,
        'fee': obj.fee,
        'info': obj.info
      },
      success: function (res) {
        console.log(res.data);
        var prepay_id = res.data.prepay_id;
        console.log("统一下单返回 prepay_id:" + prepay_id);
        that.sign(prepay_id);
      }
    })
  },
  //签名
  sign: function (prepay_id) {
    var that = this;
    wx.request({
      url: 'http://192.168.50.157:9999/wxpay/sign',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { 'repay_id': prepay_id },
      success: function (res) {
        that.requestPayment(res.data);

      }
    })
  },
  //申请支付
  requestPayment: function (obj) {
    console.log(obj);
    console.log("-----------------")
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        console.log(111);
      },
      'fail': function (res) {
        console.log(res);
      }
    })
  }
})