// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      amount: 1, //购物车购买数量
      reduceSrc: '../../image/reduce.png',
      increaseSrc: '../../image/increase.png'
  },
  bindDeleteTap(){
      wx.showModal({
          title: '提示',
          content: '您确定要删除吗',
          success: function (res) {
              if (res.confirm) {
                  console.log('用户点击确定')
                  wx.showToast({
                      title: '删除成功',
                      icon: 'success',
                      duration: 2000
                  })
              } else if (res.cancel) {
                  console.log('用户点击取消')
              }
          }
      })
  },
  bindIncreaseTap(){
      this.data.amount++
      this.setData({
          amount: this.data.amount,
          increaseSrc: '../../image/increaseAct.png'
      })
  },
  bindReduleTap(){
      if (this.data.amount == 1){
        return
      }else{
          this.data.amount--
      }
      
      this.setData({
          amount: this.data.amount,
          reduceSrc: '../../image/reduceAct.png',
      })
  },
  Toincrease(){
      this.setData({
          increaseSrc: '../../image/increase.png'
      })
  },
  Toredule(){
      this.setData({
          reduceSrc: '../../image/reduce.png'
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