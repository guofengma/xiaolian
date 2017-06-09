//index.js
// request请求
import fetch from "../../utils/fetch.js";
//轮播图
import swiperData from "../../template/swiper/swiper.js";

//区块链积分充值
function chongzhi(refereeid,amt) {
  fetch({
    url: "/app/invoke",
    // baseUrl: "http://192.168.50.157:9999",
    baseUrl: "https://health.lianlianchains.com",
    data: {
      acc: refereeid, //openid
      // acc:"aaa",
      amt: amt,
      reacc: "",//对方的openid 转移积分时这个字段才有否则为空
      ccId: "0543963f23223c54d6616a61631c8e9b40300f682545b337564db11085ff328b",
      func: "recharge",//增加积分
      // func:"transfer",//转移积分
      // func: "takeCash",//减少积分
    },
    method: "GET",
    header: { 'content-type': 'application/x-www-form-urlencoded' }
    // header: { 'content-type': 'application/json' }
  }).then(result => {
    console.log(result);
    console.log("交易成功");
  }).catch(err => {
    console.log("出错了")
    console.log(err)
  });
}


var app = getApp();
Page({
  data: {
    swiperData:{},
    docArray:[
      {
        avator: "",
        name:"张XX",
        position:"主治医师",
        address: "北京市三甲",
        praiseNum:90,
        phrase: "中国男科带头人---男人有难题我来帮助你，中国男科带头人---男人有难题我来帮助你"
      },
      {
        avator: "",
        name: "张XX",
        position: "主治医师",
        address: "北京市三甲",
        praiseNum: 90,
        phrase: "你有问题,我来帮助你"
      },
      {
        avator: "",
        name: "张XX",
        position: "主治医师",
        address: "北京市三甲",
        praiseNum: 90,
        phrase: "你有问题,我来帮助你"
      }
    ]
  },
  //事件处理函数
  aaa(){
    fetch({
      url: "aaaaaa",
      data:{
        bb:1
      },
      method:"POST",
      header: { 'content-type': 'application/json' }
    }).then(result => {

    }).catch(err => {

    });
  },
  //下拉刷新函数
  onPullDownRefresh() {
    this.onShow();
  },
  bindDetailTap(){
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  bindPayTap(){
    wx.request({
      url: 'https://health.lianlianchains.com/service/getPay',
      method: 'POST',
      data: {
        bookingNo: bookingNo,  /*订单号*/
        total_fee: total_fee,   /*订单金额*/
        openid: openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.requestPayment({
          'timeStamp': new Date().getTime().toString(),
          'nonceStr': utils.randomString(32),
          'package': 'prepay_id=' + res.data.prepay_id,
          'signType': 'MD5',
          'paySign': res.data._paySignjs,
          'success': function (res) {
            console.log(res);
          },
          'fail': function (res) {
            console.log('fail:' + JSON.stringify(res));
          }
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  bindDetailTap(){
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onLoad: function (options) {
    console.log(options)
    console.log("22222222222222222222222222222222222222222")
    var that = this;
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              success: function (res) {
                var objz = {};
                objz.avatarUrl = res.userInfo.avatarUrl;
                objz.nickName = res.userInfo.nickName;
                wx.setStorageSync('userInfo', objz);//存储userInfo  
              }
            });
            var d = that.globalData;//这里存储了appid、secret、token串    
            var l = 'https://health.lianlianchains.com/wx/getopenid?code=' + res.code;
            wx.request({
              url: l,
              data: {},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
              // header: {}, // 设置请求的 header    
              success: function (res) {
                var obj = {};
                obj.openid = res.data.openid;
                obj.expires_in = Date.now() + res.data.expires_in;
                // console.log(obj);
                wx.setStorageSync('user', obj);//存储openid    
              }
            });
          } else {
            //console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
    // fetch({
    //   url: "/health/referee/query",
    //   // baseUrl: "https://health.lianlianchains.com",
    //   baseUrl: "http://192.168.50.157:9999",
    //   data: {
    //     'openid': "fff",
    //     'refereeid': "eee"
    //   },
    //   method: "POST",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    // }).then(result => {
    //   console.log(result);
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });

      //分享上传
    if (options.openid){
      fetch({
        url: "/health/referee/query",
        baseUrl: "https://health.lianlianchains.com",
        // baseUrl: "http://192.168.50.157:8888",
        data: {
          'openid': wx.getStorageSync('user').openid,
          'refereeid': options.openid
        },
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
              'type': options.type
            },
            method: "POST",
            header: { 'content-type': 'application/x-www-form-urlencoded' }
          }).then(result => {
            console.log(result);
          }).catch(err => {
            console.log("出错了")
            console.log(err)
          });
          chongzhi(result.referee1, "30");
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
              'type': options.type
            },
            method: "POST",
            header: { 'content-type': 'application/x-www-form-urlencoded' }
          }).then(result => {
            console.log(result);
          }).catch(err => {
            console.log("出错了")
            console.log(err)
          });
          chongzhi(result.referee2, "10");
        }

        console.log("加分成功");

      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });
    }
      

    
    console.log(user);
    //调用应用实例的方法获取全局数据
    that.setData({
      swiperData: swiperData
    })
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShow: function () {
    wx.stopPullDownRefresh();
  },
  onLaunch(options){
    
  }
})
