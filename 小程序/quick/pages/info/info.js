// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      amount: 1, //购物车购买数量
      reduceSrc: '../../image/reduce.png',
      increaseSrc: '../../image/increase.png',
      name: "伊利纯真酸牛奶",
      guige: "100ml",
      price:9.9, //物品单价
      total:0

  },
  bindDeleteTap(){
      wx.showModal({
          title: '提示',
          content: '您确定要删除吗',
          success: function (res) {
              if (res.confirm) {
                  console.log('用户点击确定')
                  wx.switchTab({
                      url: '../index/index'
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
          increaseSrc: '../../image/increaseAct.png',
          total: (this.data.price * this.data.amount).toFixed(2)
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
          total: (this.data.price * this.data.amount).toFixed(2)
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
  //继续购物
  bindScanTap(){
      //查看购物车是否已达上限

      //如果达到上限将提示购物车已满


      //没达到上限情况下继续购物
      wx.scanCode({
          success: (res) => {
              console.log(res);
              wx.navigateTo({
                  url: '../info/info'
              })
          }
      })
  },
  bindCartTap(){
      wx.navigateTo({
          url: '../cart/cart'
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