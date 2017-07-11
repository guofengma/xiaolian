// pages/orderList/orderList.js
import fetch from '../../utils/fetch';
import { formatTime } from '../../utils/filter'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hasOrder:true,
      orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      fetch({
          url: "/wxpay/queryOrder",
        //   baseUrl: "http://192.168.50.57:9888",
          baseUrl: "https://store.lianlianchains.com",
          data: {
              'openid': wx.getStorageSync("user").openid
          },
          method: "GET",
          noLoading: true,
          header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
          console.log(result);
          if(result.length == 0){
              this.setData({
                  hasOrder: false
              })
          }
        //   for(var i=0; i< result.length; i++){
        //       result[i].time = formatTime(result[i].time)
        //   }
          this.setData({
              orderList: result
          })

      }).catch(err => {
          console.log("出错了")
          wx.showToast({
              title: '出错了',
          })
          console.log(err)
      });
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