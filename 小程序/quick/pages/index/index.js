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
                    wx.setStorageSync('code', res.code);
                    console.log("扫码成功");
                    
                    
                    //查库
                    fetch({
                        url: "/CVS/good/querybyCode",
                        // baseUrl: "http://192.168.50.57:9888",
                          baseUrl: "https://store.lianlianchains.com",
                        data: {
                            // code: res.code
                            code: "6901121300298"
                        },
                        noLoading: true,
                        method: "GET",
                          header: { 'content-type': 'application/x-www-form-urlencoded' }
                        // header: { 'content-type': 'application/json' }
                    }).then(result => {
                        console.log(result)
                        console.log("查库成功");
                        //查询购物车
                        wx.setStorageSync('price', result.price);
                        wx.setStorageSync('name', result.name);
                        fetch({
                            url: "/CVS/cart/querycart",
                            // baseUrl: "http://192.168.50.57:9888",
                            baseUrl: "https://store.lianlianchains.com",
                            data: {
                                openid: wx.getStorageSync('user').openid
                            },
                            noLoading: true,
                            method: "GET",
                              header: { 'content-type': 'application/x-www-form-urlencoded' }
                            // header: { 'content-type': 'application/json' }
                        }).then(carts => {
                            console.log(carts)
                            console.log("购物车查询成功")
                            if (carts.length){
                                console.log(1111)
                                console.log()
                                let index = carts.findIndex((value, index, arr) => {
                                    return value.code == "6901121300298";
                                });
                                if (index >= 0){
                                    wx.setStorageSync('already', true);
                                    wx.setStorageSync('index', index);
                                    wx.navigateTo({
                                        url: '../info/info'
                                    })
                                }else{
                                    wx.setStorageSync('already', false);
                                    fetch({
                                        url: "/CVS/cart/addtocart",
                                        // baseUrl: "http://192.168.50.57:9888",
                                        baseUrl: "https://store.lianlianchains.com",
                                        data: {
                                            openid: wx.getStorageSync('user').openid,
                                            amount: 1,
                                            // code: res.code
                                            code: "6901121300298"
                                        },
                                        noLoading: true,
                                        method: "POST",
                                          header: { 'content-type': 'application/x-www-form-urlencoded' }
                                        // header: { 'content-type': 'application/json' }
                                    }).then(addCarts => {
                                        wx.navigateTo({
                                            url: '../info/info'
                                        })
                                    })
                                }
                            }else{
                                console.log(2222)
                                wx.setStorageSync('already', false);
                                fetch({
                                    url: "/CVS/cart/addtocart",
                                    // baseUrl: "http://192.168.50.57:9888",
                                    baseUrl: "https://store.lianlianchains.com",
                                    data: {
                                        openid: wx.getStorageSync('user').openid,
                                        amount: 1,
                                        // code: res.code
                                        code: "6901121300298"
                                    },
                                    noLoading: true,
                                    method: "POST",
                                      header: { 'content-type': 'application/x-www-form-urlencoded' }
                                    // header: { 'content-type': 'application/json' }
                                }).then(addCarts => {
                                    wx.navigateTo({
                                        url: '../info/info'
                                    })
                                })
                            }
                        })

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

    },
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function () {

    }
})
