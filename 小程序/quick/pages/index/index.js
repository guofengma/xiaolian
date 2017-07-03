//index.js
// request请求
import fetch from "../../utils/fetch.js";

var timer = null;
var app = getApp();
Page({
    data: {
        useShadow:false,
        step: [
            {
                image: "../../image/step1.png",
                tit: '定位门店',
                info: '扫描店铺二维码'
            },
            {
                image: "../../image/step2.png",
                tit: '添加商品',
                info: '扫商品条码并支付'
            },
            {
                image: "../../image/step3.png",
                tit: '前台校验',
                info: '向前台出示订单'
            }
        ]
    },
    //扫码
    bindScanTap() {
        wx.navigateTo({
            url: '../store/store',
        })
        // if() {

        // }
        // wx.scanCode({
        //     success: (res) => {
        //         console.log(res)
        //     }
        // })
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
