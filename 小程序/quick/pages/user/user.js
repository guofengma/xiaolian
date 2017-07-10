// pages/user/user.js
import fetch from '../../utils/fetch.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isSubmit: false
  },
  orderView(){
      let mobile = wx.getStorageSync('mobile');
      if(mobile.length > 0) {
          wx.navigateTo({
              url: '../orderList/orderList'
          })
      }else{
          wx.navigateTo({
              url: '../submit/submit'
          })
      }
      
  },
  bindSubmitTap(){
      wx.navigateTo({
          url: '../submit/submit'
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    
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
      var that = this;
      var user = wx.getStorageSync('user');
      var mobile = wx.getStorageSync('mobile');
      console.log(typeof mobile)
      mobile = mobile.substr(0, 3) + "****" + 　mobile.substr(7);
      if (mobile.length > 0) {
          that.setData({
              isSubmit: true,
              mobile: mobile
          });
      }
      app.getUserInfo((userInfo) => {
          console.log(userInfo);
          //更新数据
          that.setData({
              userInfo: userInfo
          });
          wx.setStorageSync('userInfo', userInfo);

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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})