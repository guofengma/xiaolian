
//pay.js
//获取应用实例
import fetch from '../../utils/fetch.js';
var app = getApp()
Page({
  data: {
    chectAct:false,
    cashMoney:0,
    payMoney:0,
    paynum:0,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.share')
  },
 
  onLoad: function () {
    var that = this;
    console.log('onLoad');
    //获取积分总额
    fetch({
      url: "/health/score/query",
      // baseUrl: "http://192.168.50.157:8888",
      baseUrl: "https://health.lianlianchains.com",
      data: {
        'openid': wx.getStorageSync("user").openid
      },
      method: "POST",
      noLoading: true,
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      that.setData({
        score: result,
        cashMoney: result
      });

    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });

  },
  isUseScore() {
    var that = this;
    if (this.data.paynum){
      this.setData({
        chectAct: !this.data.chectAct
      });
      if (this.data.chectAct) {
        if (this.data.score >= this.data.paynum * 0.9) {
            that.setData({
              cashMoney: Math.floor(this.data.paynum * 0.9)
            });
          } else {
            that.setData({
              cashMoney: this.data.score
            });
          }
      } else {
        that.setData({
          cashMoney: that.data.score
        });
      }
      
    }else{
      this.setData({
        chectAct: false
      });
    }
    
  },
  bindInputTap(e){
    console.log(e);
    var that = this;
    that.setData({
      paynum: e.detail.value
    });
    if (this.data.chectAct) {
      if (this.data.score >= e.detail.value * 0.9) {
        that.setData({
          cashMoney: Math.floor(e.detail.value * 0.9)
        });
      } else {
        that.setData({
          cashMoney: this.data.score
        });
      }
    } else {
        that.setData({
          cashMoney: that.data.score
        });
    }

    if (e.detail.value == 0){
      that.setData({
        cashMoney: this.data.score,
        chectAct: false
      });
    }
  },
  bindSubmitTap(e) {
    var that = this;
    var user = wx.getStorageSync("user");
    if (this.data.chectAct){
      var payMoney = this.data.paynum - this.data.cashMoney;
    }else{
      var payMoney = this.data.paynum;
    }
    console.log(payMoney);
    that.xiadan(user.openid, payMoney);
  },
  //下单
  xiadan(openId, payMoney) {

    var that = this;
    fetch({
      url: "/wxpay/prepay",
      baseUrl: "https://health.lianlianchains.com",
      data: {
        'openid': openId,
        'fee': payMoney,
        'info': "诊疗单买单"
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
      baseUrl: "https://health.lianlianchains.com",
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