
//pay.js
//获取应用实例
import fetch from '../../utils/fetch.js';
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.share')
  },
  onLoad: function () {
    console.log('onLoad')

  },
  //
  // onShareAppMessage: function () {
  //   return {
  //     title: '三医堂',
  //     path: '/pages/pay/pay',
  //     success: function (res) {
  //       // 分享成功
  //     },
  //     fail: function (res) {
  //       // 分享失败
  //     }
  //   }
  // },
  bindSubmitTap(e) {
    var that = this;
    var user = wx.getStorageSync("user");
    that.xiadan(user.openid, e.detail.value);
  },
  //下单
  xiadan(openId, obj) {

    var that = this;
    fetch({
      url: "/wxpay/prepay",
      data: {
        'openid': openId,
        'fee': obj.fee,
        'info': obj.info
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
        console.log(result);
        var prepay_id = result.prepay_id;
        console.log("统一下单返回 prepay_id:" + prepay_id);
        that.sign(prepay_id);
    }).catch(err => {

    });
    // wx.request({
    //   // url: 'http://192.168.50.157:8888/wxpay/prepay',
    //   url: 'https://health.lianlianchains.com/wxpay/prepay',
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //     // 'content-type': 'application/json'
    //   },
    //   data: {
    //     'openid': openId,
    //     'fee': obj.fee,
    //     'info': obj.info
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     var prepay_id = res.data.prepay_id;
    //     console.log("统一下单返回 prepay_id:" + prepay_id);
    //     that.sign(prepay_id);
    //   }
    // })
  },
  //签名
  sign: function (prepay_id) {
    var that = this;
    fetch({
      url: "/wxpay/sign",
      data: {
        'repay_id': prepay_id
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      that.requestPayment(result);
    }).catch(err => {

    });
    // wx.request({
    //   // url: 'http://192.168.50.157:8888/wxpay/sign',
    //   url: 'https://health.lianlianchains.com/wxpay/sign',
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: { 'repay_id': prepay_id },
    //   success: function (res) {
    //     that.requestPayment(res.data);

    //   }
    // })
  },
  //申请支付
  requestPayment: function (obj) {
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