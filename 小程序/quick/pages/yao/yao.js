// pages/yao/yao.js
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
      wx.onAccelerometerChange(function (e) {
          console.log(e.x)
          console.log(e.y)
          console.log(e.z)
          if (e.x > 1 && e.y > 1) {
              wx.showToast({
                  title: '摇一摇成功',
                  icon: 'success',
                  duration: 1000
              })
              wx.vibrateLong({
                  success:function(){

                  }
              })
              wx.getClipboardData({
                  success: function (res) {
                      console.log(res.data)
                  }
              })
          }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})