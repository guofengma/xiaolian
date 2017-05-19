// pages/consult/consult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    docArray: [
      {
        avator: "",
        name: "张XX",
        position: "主治医师",
        address: "北京市三甲",
        tag:[
          {
            msg: "妇科"
          },
          {
            msg: "不孕不育"
          },
          {
            msg: "外科"
          }
        ]
      },
      {
        avator: "",
        name: "张XX",
        position: "主治医师",
        address: "北京市三甲",
        tag: [
          {
            msg: "内科"
          },
          {
            msg: "不孕不育"
          },
          {
            msg: "外科"
          }
        ]
      }
    ],
    illness:[
      {
        img:"",
        name: "男性不育"
      },
      {
        img: "",
        name: "女性不孕"
      },
      {
        img: "",
        name: "胃癌前期病变"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(1111);
    wx.stopPullDownRefresh();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onShow();
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})