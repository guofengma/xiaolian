// pages/check/check.js
import fetch from '../../utils/fetch'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     hasCheck:false
  },
  orderView() {
     wx.redirectTo({
        url: '../orderList/orderList'
     })
  },
  homeView() {
     wx.switchTab({
        url: '../index/index'
     })
  },
  CodeView(orderNo){
     var openid = wx.getStorageSync('user').openid;
     this.setData({
        orderCode: "https://store.lianlianchains.com/qrcode?data=" + orderNo + "_" + openid + "&width=202&height=202"
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options)
     var orderNo = options.orderno;
     if (orderNo){
        this.CodeView(orderNo)
     }
     var self = this;
     
     console.log("将要连接服务器。");
     wx.connectSocket({
        url: 'wss://store.lianlianchains.com/websocket'
     });

     wx.onSocketOpen(function (res) {
        console.log("连接服务器成功。");
     });

     wx.onSocketMessage(function (res) {
        console.log('收到服务器内容：' + res.data);
        var data = res.data;
        if(data == wx.getStorageSync('user').openid){
            self.setData({
               hasCheck: true
            })
        }
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
     var orderNo = wx.getStorageSync('orderNo');
     this.CodeView(orderNo)
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