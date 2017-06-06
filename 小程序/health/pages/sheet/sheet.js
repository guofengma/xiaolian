// pages/sheet/sheet.js
import fetch from '../../utils/fetch.js';

var page = 0;
var num = 0;
var iTime, iTime2;
var selfDiaglist = [];
function GetList(that, source) {
  fetch({
    url: "/health/diagnosis/querybypageopenid",
    baseUrl: "https://health.lianlianchains.com",
    // baseUrl: "http://192.168.50.157:9999",
    data: {
      'page': 5 * num,
      'openid': '1'
    },
    method: "POST",
    header: { 'content-type': 'application/x-www-form-urlencoded' }
    // header: { 'content-type': 'application/json' }
  }).then(result => {
    console.log(result);
    console.log(333333333333333333333333333333333)
    for (var i = 0; i < result.diagnosis.length; i++) {
      selfDiaglist.push(result.diagnosis[i]);
    }
    that.setData({
      selfDiaglist: selfDiaglist,
      totalpage: result.totalpage,
      loadingMsg: "查看更多"
    });
    if (source == "noMore") {
      that.setData({
        loadingMsg: "没有更多了"
      });
    }
    
  }).catch(err => {
    console.log("出错了")
    console.log(err)
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selfDiaglist:[],
    loadingMsg: "查看更多"
  },
  bindDownLoad: function () {
    //   该方法绑定了页面滑动到底部的事件
    var that = this;
    clearTimeout(iTime);
    clearTimeout(iTime2);
    var promise = new Promise((resolve, reject) => {
      iTime2 = setTimeout(function () {
        that.setData({
          loadingMsg: "正在加载"
        });
        resolve();
      }, 500);
    });
    promise.then(function () {
      if (num < that.data.totalpage - 1) {
        iTime = setTimeout(function () {
          //需要执行的事件
          num++;
          GetList(that);
        }, 100);

      } else {
        iTime = setTimeout(function () {
          //需要执行的事件
          num++;
          GetList(that, "noMore");
        }, 100);

      }
    })
  },
  scroll(event) {
    // console.log(222);
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refreshs(event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
  },
  bindAddTap(){
    wx.navigateTo({
      url: '../diagadd/diagadd',
    })
  },
  bindconfirm(e){
    var that = this;
    var user = wx.getStorageSync('user');
    if(e.detail.value){
      fetch({
        url: "/health/diagnosis/query",
        baseUrl: "https://health.lianlianchains.com",
        // baseUrl: "http://192.168.50.157:9999",
        data: {
          'diagnosisid': e.detail.value,
          'openid': '1',
        },
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
        console.log(result);
        that.setData({
          selfDiaglist: result[0]
        });
      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });
    }
    
  },
  /**
   * 生命周期函数--监听页面加载',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    GetList(this);
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight + 50
        });
      }
    });
    // fetch({
    //   url: "/health/diagnosis/save",
    //   baseUrl: "http://192.168.50.157:9999",
    //   // baseUrl: "https://health.lianlianchains.com",
    //   data: {
    //     'diagnosisid':"xrf785",
    //     'openid':'asdfgh2',
    //     'datetime':"2017",
    //     'symptom':"很好",
    //     'amt':"money",
    //     'hospital':"sanhuan",
    //     'doctor':'doctor',
    //     'evaluate':0,
    //     'label':'001'
    //   },
    //   method: "POST",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    //   // header: { 'content-type': 'application/json' }
    // }).then(result => {
    //   console.log(result);
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });
    //查询所有
    // fetch({
    //   url: "/health/diagnosis/querybypageopenid",
    //   // baseUrl: "https://health.lianlianchains.com",
    //   baseUrl: "http://192.168.50.157:9999",
    //   data: {
    //     page: 0,
    //     'openid': '1'
    //   },
    //   method: "POST",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    // }).then(result => {
    //   console.log(result);
    //   that.setData({

    //   });
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });
    //查询单号
    fetch({
      url: "/health/diagnosis/query",
      // baseUrl: "http://192.168.50.157:9999",
      baseUrl: 'https://health.lianlianchains.com',
      data: {
        'diagnosisid': "",
        // page: 0,
        'openid':'asdfgh2'
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
    }).catch(err => {
      console.log("出错了")
      console.log(err)
    });
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