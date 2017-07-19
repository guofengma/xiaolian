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
  checkView(e){
     console.log(e)
   wx.navigateTo({
      url: '../check/check?orderno=' + e.target.dataset.orderno
   })
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
      
      fetch({
          url: "/wxpay/queryOrder",
        //   baseUrl: "http://192.168.50.57:9888",
          baseUrl: "https://store.lianlianchains.com",
          data: {
              'openid': wx.getStorageSync("user").openid,
               storeid: getApp().globalData.storeid
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
          for(var i=0; i< result.length; i++){
              result[i].time = formatTime(new Date(result[i].time/1000))
              result[i].state = formatState(result[i].state);
              result[i].totalNum = 0;
              result[i].totalPrice = 0;
              for (var j = 0; j < result[i].temp.length;j++){
                  result[i].totalNum = result[i].temp[j].amount
                  result[i].totalPrice += result[i].temp[j].amount * result[i].temp[j].price
              }
          }
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
     wx.switchTab({
        url: '../user/user'
     })
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