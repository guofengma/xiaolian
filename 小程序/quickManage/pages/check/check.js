// pages/user/user.js
import fetch from '../../utils/fetch.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  orderView(){
      wx.navigateTo({
          url: '../orderList/orderList'
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    var user = wx.getStorageSync('user');
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