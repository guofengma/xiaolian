// pages/userInfo/userInfo.js
import fetch from '../../utils/fetch.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: "",
    age: "",
    phoneno: "",
    address: ""
  },
  bindSexTap(e) {
    // console.log(e.detail.value);
    this.setData({
      sex: e.detail.value
    });
  },
  bindAgeTap(e) {
    // console.log(e.detail.value);
    this.setData({
      age: e.detail.value
    });
  },
  bindTelTap(e) {
    // console.log(e.detail.value);
    this.setData({
      phoneno: e.detail.value
    });
  },
  bindAddressTap(e) {
    // console.log(e.detail.value);
    this.setData({
      address: e.detail.value
    });
  },
  formSubmit: function (e) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = wx.getStorageSync('user');
    // 查询
    fetch({
      url: "/health/user/query",
      baseUrl: "https://health.lianlianchains.com",
      // baseUrl: "http://192.168.50.157:8888",
      data: {
        'openid': user.openid
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      that.setData({
        address: result.address,
        age: result.age,
        nickname: result.nickname,
        openid: result.openid,
        phoneno: result.phoneno,
        sex: result.sex,
      });
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    console.log('消失了');
    //更新
    fetch({
      url: "/health/user/update",
      baseUrl: "https://health.lianlianchains.com",
      // baseUrl: "http://192.168.50.157:8888",
      data: {
        'openid': that.data.openid,
        'nickname': that.data.nickname,
        'sex': that.data.sex,
        'age': that.data.age,
        'phoneno': that.data.phoneno,
        'address': that.data.address
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });

    // if (that.data.phoneno != ""){
    //   //奖励积分
    //   fetch({
    //     url: "/health/score/update",
    //     baseUrl: "https://health.lianlianchains.com",
    //     // baseUrl: "http://192.168.50.157:8888",
    //     data: {
    //       'openid': that.data.openid,
    //       'score': 10,
    //       'type': 1
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
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

  }
})