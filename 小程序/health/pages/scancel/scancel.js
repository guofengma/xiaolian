// pages/scancel/scancel.js
import fetch from '../../utils/fetch.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch({
      url: "/wxa/getwxacode?access_token=ACCESS_TOKEN",
      baseUrl: "https://api.weixin.qq.com",
      // baseUrl: "http://192.168.50.157:8888",
      data: {
        path: "pages/pay/pay",
        width: 430,
        auto_color: false,
        line_color: { "r": "255", "g": "49", "b": "57" }
      },
      noLoading: true,
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      // console.log(result);
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