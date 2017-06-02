//index.js
// request请求
import fetch from "../../utils/fetch.js";
//轮播图
import swiperData from "../../template/swiper/swiper.js";


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
  onLoad: function (options) {
    console.log(options)
    console.log(11111111111111111111111111111111111111111)
    var that = this;
    var user = wx.getStorageSync('user');
    fetch({
      url: "/health/referee/query",
      // baseUrl: "https://health.lianlianchains.com",
      baseUrl: "http://192.168.50.157:9999",
      data: {
        'openid': "fff",
        'refereeid': "eee"
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
    // if (options.openid){
    //   fetch({
    //     url: "/health/referee/query",
    //     baseUrl: "https://health.lianlianchains.com",
    //     // baseUrl: "http://192.168.50.157:8888",
    //     data: {
    //       'openid': openid,
    //       'refereeid': options.openid
    //     },
    //     method: "POST",
    //     header: { 'content-type': 'application/x-www-form-urlencoded' }
    //   }).then(result => {
    //     console.log(result);
    //   }).catch(err => {
    //     console.log("出错了")
    //     console.log(err)
    //   });
    // }
    
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
    console.log(1111);
    wx.stopPullDownRefresh();
  }
})
