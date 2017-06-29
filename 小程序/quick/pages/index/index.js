//index.js
// request请求
import fetch from "../../utils/fetch.js";

var timer = null;
var app = getApp();
Page({
    data: {
        useShadow:false
    },
    //扫码
    bindScanTap() {
        wx.scanCode({
            success: (res) => {
                console.log(res)
            }
        })
    },
    addShadow() {
        this.setData({
            useShadow: true
        });
    },
    removeShadow(){
        this.setData({
            useShadow: false
        });
    },
    onLoad: function (options) {
        var that = this;
        console.log(options)
        console.log(wx.getStorageSync('user').openid)
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    onShow: function () {
        wx.stopPullDownRefresh();
    },
    onLaunch(options) {

    }
})
