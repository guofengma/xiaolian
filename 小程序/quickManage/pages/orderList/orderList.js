// pages/orderList/orderList.js
import fetch from '../../utils/fetch';
import { formatTime, formatState } from '../../utils/filter'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hasOrder:true,
      orderList:[]
  },
  checkView(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (param) {
   console.log(param)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     var that = this;
     wx.request({
        url: "https://store.lianlianchains.com/wxpay/queryShopOrder",
        data: {
           storeid: wx.getStorageSync('storeid')
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: "GET",// OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function (res) {
           console.log(result);
           let result = res.data;
           if (result.length == 0) {
              that.setData({
                 hasOrder: false
              })
           }
           for (var i = 0; i < result.length; i++) {
              result[i].time = formatTime(new Date(result[i].time / 1000))
              result[i].state = formatState(result[i].state);
              result[i].totalNum = 0;
              result[i].totalPrice = 0;
              for (var j = 0; j < result[i].temp.length; j++) {
                 result[i].totalNum = result[i].temp[j].amount
                 result[i].totalPrice += result[i].temp[j].amount * result[i].temp[j].price
              }
           }
           that.setData({
              orderList: result
           })
        },
        fail: function (msg) {
           console.log('reqest error', msg)
           // wx.hideNavigationBarLoading()
           // wx.hideToast();
           reject('fail')
        }
     })

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
  
  }
})