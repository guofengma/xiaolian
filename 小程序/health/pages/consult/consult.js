// pages/consult/consult.js
import fetch from '../../utils/fetch.js';
function GetList(){
  fetch({
      url: "/health/diagnosis/querybypage",
      baseUrl: "https://health.lianlianchains.com",
      // baseUrl: "http://192.168.50.157:8888",
      data: {
        'page': 0,
        'openid':'asdfgh2',
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    docArray: [
      
    ],
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  },
  bindDownLoad: function () {
    //   该方法绑定了页面滑动到底部的事件
    console.log(333)
    var that = this;
    GetList(that);
  },
  scroll: function (event) {
    console.log(222);
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refreshs: function (event) {
    // console.log(111);
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    console.log(111);
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    // fetch({
    //   url: "/health/diagnosis/save",
    //   baseUrl: "http://192.168.50.157:8888",
    //   data: {
    //     'diagnosisid':"xrf110",
    //     'openid':'asdfgh2',
    //     'datetime':"2017",
    //     'symptom':"很好",
    //     'amt':"money",
    //     'hospital':"sanhuan",
    //     'doctor':'doctor',
    //     'evaluate':0,
    //     'label':'001'
    //   },
    //   method: "POST",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    //   // header: { 'content-type': 'application/json' }
    // }).then(result => {
    //   console.log(result);
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });
    // fetch({
    //   url: "/health/diagnosis/query",
    //   baseUrl: "http://192.168.50.157:8888",
    //   data: {
    //     'diagnosisid': "xrf109",
    //     'openid':'asdfgh2',
    //   },
    //   method: "POST",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    // }).then(result => {
    //   console.log(result);
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });
    //querybypage
    // fetch({
    //   url: "/health/diagnosis/querybypage",
    //   baseUrl: "http://192.168.50.157:8888",
    //   data: {
    //     'page': 0,
    //     'openid':'asdfgh2',
    //   },
    //   method: "POST",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    // }).then(result => {
    //   console.log(result);
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(1111);
    wx.stopPullDownRefresh();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})