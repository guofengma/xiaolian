// pages/user/user.js
import fetch from '../../utils/fetch.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
      // 查询
      fetch({
        url: "/health/user/query",
        baseUrl: "https://health.lianlianchains.com",
        // baseUrl: "http://192.168.50.157:8888",
        data: {
          'openid': user.openid
        },
        noLoading: true,
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
        console.log(result);
        if (!result){
          // 存数据
          fetch({
            url: "/health/user/save",
            baseUrl: "https://health.lianlianchains.com",
            // baseUrl: "http://192.168.50.157:8888",
            data: {
              'openid': user.openid,
              'nickname': userInfo.nickName,
              'sex': "",
              'age': "",
              'phoneno': "",
              'address': ""
            },
            noLoading: true,
            method: "POST",
            header: { 'content-type': 'application/x-www-form-urlencoded' }
          }).then(result => {
            console.log(result);
            console.log("送成功");
            if (result.ec == "000000") {

            }
          }).catch(err => {
            console.log("出错了")
            console.log(err)
          });
        }
      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });
      
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
    //   const array = [11, 22, 33,55555];
    //   const arrayBuffer = new Uint8Array(array)
    //   const base64 = wx.arrayBufferToBase64(arrayBuffer)
    //   const arrayBuffers = wx.base64ToArrayBuffer(base64)
    //   console.log(base64);
    //   console.log(arrayBuffers);
      const base64 = 'CxYh'
      const arrayBuffer = wx.base64ToArrayBuffer(base64)
      console.log(arrayBuffer)
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