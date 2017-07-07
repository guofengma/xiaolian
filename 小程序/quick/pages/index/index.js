//index.js
import fetch from "../../utils/fetch.js";
let cartArray = [];
var app = getApp();
Page({
    data: {
        useShadow: false,
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

        if (wx.getStorageSync('StoreId')) {
            wx.scanCode({
                success: (res) => {
                    console.log(res);
                    fetch({
                        url: "/CVS/good/querybyCode",
                        // baseUrl: "http://211.159.174.113:9888",
                          baseUrl: "https://store.lianlianchains.com",
                        data: {
                            code: '6901121300298'
                        },
                        noLoading: true,
                        method: "GET",
                        //   header: { 'content-type': 'application/x-www-form-urlencoded' }
                        header: { 'content-type': 'application/json' }
                    }).then(result => {
                        console.log(result)
                        let index = cartArray.findIndex((value, index, arr) => {
                            return value.name == result.name && value.specifi == result.specifi;
                        });
                        if (index > 0){
                            cartArray.splice(index, 1);
                            cartArray.push(result);
                            wx.setStorageSync('cartArray', cartArray);
                            wx.setStorageSync('already', true);
                            wx.setStorageSync('index', index);
                            console.log(index)
                            console.log(cartArray[wx.getStorageSync('index')])
                            wx.navigateTo({
                                url: '../info/info'
                            })
                        }else{
                            cartArray.push(result);
                            wx.setStorageSync('cartArray', cartArray);
                            wx.setStorageSync('already', false);
                            wx.removeStorageSync('index');
                            wx.navigateTo({
                                url: '../info/info'
                            })
                        }
                        
                        
                        console.log(wx.getStorageSync('cartArray'))
                        // return
                        
                    }).catch(err => {
                        console.log("出错了")
                        wx.showToast({
                            title: '网络繁忙'
                        })
                        console.log(err)
                    });

                }
            })
        } else {
            wx.navigateTo({
                url: '../store/store'
            })
        }

    },
    addShadow() {
        this.setData({
            useShadow: true
        });
    },
    removeShadow() {
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
        
    },
    onLaunch(options) {

    }
})
