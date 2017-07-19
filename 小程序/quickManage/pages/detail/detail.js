// pages/detail/detail.js
import fetch from '../../utils/fetch'
Page({

   /**
    * 页面的初始数据
    */
   data: {
      details: {}
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
         url: "/CVS/good/querybyCode",
         // baseUrl: "http://192.168.50.57:9888",
         baseUrl: "https://store.lianlianchains.com",
         data: {
            // code: res.code
            code: "6901121300298",
            storeid: getApp().globalData.storeid
         },
         noLoading: true,
         method: "GET",
         header: { 'content-type': 'application/x-www-form-urlencoded' }
         // header: { 'content-type': 'application/json' }
      }).then(result => {
         this.setData({
            details: result
         })
      }).catch(err => {

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