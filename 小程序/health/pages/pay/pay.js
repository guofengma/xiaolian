
//pay.js
//获取应用实例
import fetch from '../../utils/fetch.js';
import { transfer} from '../../template/lite.js';

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
 
  onLoad: function (options) {
    var that = this;
    console.log(options);
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
    console.log(e)
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
        'info': "诊疗收费单"
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
        console.log(result);
        var prepay_id = result.prepay_id;
        console.log("统一下单返回 prepay_id:" + prepay_id);
        that.sign(prepay_id, payMoney);
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
  sign: function (prepay_id, payMoney) {
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
  requestPayment: function (obj, payMoney) {
    wx.requestPayment({
      'timeStamp': obj.timeStamp,
      'nonceStr': obj.nonceStr,
      'package': obj.package,
      'signType': obj.signType,
      'paySign': obj.paySign,
      'success': function (res) {
        console.log(111);
        transfer("3534534", "30");
        fetch({
          url: "/health/referee/queryReferee",
          // baseUrl: "https://health.lianlianchains.com",
          baseUrl: "http://192.168.50.57:9999",
          data: {
            'openid': wx.getStorageSync('user').openid
          },
          noLoading: true,
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
        }).then(result => {
          console.log(6666666666666666666)
          console.log(result);
          //推荐人1
          if (result.referee1) {
            fetch({
              url: "/health/score/update",
              baseUrl: "https://health.lianlianchains.com",
              // baseUrl: "http://192.168.50.157:8888",
              data: {
                'openid': result.referee1,
                'score': 30,
                'type': 1
              },
              method: "POST",
              header: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(result => {
              console.log(result);
            }).catch(err => {
              console.log("出错了")
              console.log(err)
            });
            transfer(result.referee1, payMoney*0.4);
          }

          //推荐人2
          if (result.referee2) {
            fetch({
              url: "/health/score/update",
              baseUrl: "https://health.lianlianchains.com",
              // baseUrl: "http://192.168.50.157:8888",
              data: {
                'openid': result.referee2,
                'score': 10,
                'type': 1
              },
              noLoading: true,
              method: "POST",
              header: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(result => {
              console.log(result);
            }).catch(err => {
              console.log("出错了")
              console.log(err)
            });
            transfer(result.referee2, payMoney*0.2);
          }

        }).catch(err => {
          console.log("出错了")
          console.log(err)
        });
        // wx.request({
        //   url: 'https://lite.lianlianchains.com/wx/send',
        //   data: {
        //     "openid": wx.getStorageSync('user').openid,
        //     "templateid": "y6FU6brbCL-oo7yfJCi55Cxb5LIWV-LhLZ_66feKrJ8",
        //     "page": "pages/index/index",
        //     "formid": event.detail.formId,
        //     "data": {
        //       "keyword1": {
        //         "value": score + " S",
        //         "color": "#000000"
        //       },
        //       "keyword2": {
        //         "value": utils.formatTime(new Date()),
        //         "color": "#333333"
        //       },
        //       "keyword3": {
        //         "value": "积分交易",
        //         "color": "#333333"
        //       },
        //       "keyword4": {
        //         "value": res.data.transactionID,
        //         "color": "#333333"
        //       }
        //     },
        //     "emphasis_keyword": "keyword1.DATA"
        //   },
        //   method: 'GET',
        //   header: {
        //     'content-type': 'application/x-www-form-urlencoded'
        //   },
        //   success: function (res) {
            
        //   }
        // })
      },
      'fail': function (res) {
        console.log(res);
      }
    })
  }
})