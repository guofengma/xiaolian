// pages/user/user.js
import fetch from '../../utils/fetch.js';
var socketOpen = false
var onoff = true
var socketMsgQueue = []
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     messageArray: [],
     socketOpen: false,
  },
  scanCode(){
      wx.scanCode({
          success: (res) => {
               console.log(res);
               let arr = res.rsult.split('_');
               return;
               wx.setStorageSync('orderNo', arr[0]);
               console.log("扫码成功");
               this.send(arr[1]);
               // this.detailView();

          }
      })
  },
  detailView(){
      wx.navigateTo({
          url: '../detail/detail'
      })
  },
  orderView(){
     wx.navigateTo({
        url: '../orderList/orderList'
     })
  },
  staticView(){
     wx.navigateTo({
        url: '../statistics/statistics'
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
     var self = this;
     console.log("将要连接服务器。");
     wx.connectSocket({
        url: 'wss://store.lianlianchains.com/websocket'
     });

     wx.onSocketOpen(function (res) {
        console.log("连接服务器成功。");
        self.setData({
           placeholderText: "连接服务器成功，请输入姓名。",
           socketOpen: true
        });
     });

     wx.onSocketMessage(function (res) {
        console.log('收到服务器内容：' + res.data);
        var data = res.data;
        console.log(data);
        var dataArray = data.split("_");
        console.log(dataArray)
        // var newMessage = {
        //    type: dataArray[0],
        //    name: dataArray[1],
        //    time: dataArray[2],
        //    message: dataArray[3]
        // };
        // var newArray = self.data.messageArray.concat(newMessage);
        var newArray = self.data.messageArray.concat(dataArray);
        self.setData({
           messageArray: newArray,
           placeholderText: "请输入信息"
        });
     });
  },
  send: function (msg) {
     if (this.data.inputValue != "") {
        this.sendSocketMessage(msg);
        this.setData({
           inputValue: ""
        });
     }
  },

  sendSocketMessage: function (msg) {
     if (this.data.socketOpen) {
        wx.sendSocketMessage({
           data: msg
        })
     }
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
    
  }
})