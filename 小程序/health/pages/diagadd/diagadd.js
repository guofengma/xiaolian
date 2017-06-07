// pages/diagadd/diagadd.js
import fetch from '../../utils/fetch.js';
import Base64 from '../../utils/encode.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    date: '2016-09-01',
    time: '12:01'
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit(e){
    console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = wx.getStorageSync('user');
   
    // //积分
    function chongzhi(){
      fetch({
        url: "/app/invoke",
        // baseUrl: "http://192.168.50.157:9999",
        baseUrl: "https://health.lianlianchains.com",
        data: {
          acc: "ppp", //openid
          // acc:"aaa",
          amt: "100",
          reacc: "",//对方的openid 转移积分时这个字段才有否则为空
          ccId: "0543963f23223c54d6616a61631c8e9b40300f682545b337564db11085ff328b",
          func: "recharge",//增加积分
          // func:"transfer",//转移积分
          // func: "takeCash",//减少积分
        },
        method: "GET",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
        // header: { 'content-type': 'application/json' }
      }).then(result => {
        console.log(result);
        console.log("交易成功");
        fetch({
          url: "/app/query",
          // baseUrl: "http://192.168.50.157:9999",
          baseUrl: "https://health.lianlianchains.com",
          data: {
            // acc: user.openid, //openid
            acc: "ppp",
            amt: "",
            reacc: "",//对方的openid 转移积分时这个字段才有否则为空
            ccId: "0543963f23223c54d6616a61631c8e9b40300f682545b337564db11085ff328b",
            func: "query",//增加积分
            // func:"transfer",//转移积分
            // func: "takeCash",//减少积分
          },
          method: "GET",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
          // header: { 'content-type': 'application/json' }
        }).then(result => {
          console.log(result);
          console.log("交易成功");
        }).catch(err => {
          console.log("出错了")
          console.log(err)
        });
      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });
    }
    
    // chongzhi();

    // //查询
    // fetch({
    //   url: "/app/query",
    //   // baseUrl: "http://192.168.50.157:9999",
    //   baseUrl: "https://health.lianlianchains.com",
    //   data: {
    //     // acc: user.openid, //openid
    //     acc:"xxx",
    //     amt: 30,
    //     reacc: "",//对方的openid 转移积分时这个字段才有否则为空
    //     ccId: "5e02ae2fd549edc9f7510221e13798de200a31a4b5f438a710fb49b877dc5bb2",
    //     func: "query",//增加积分
    //     // func:"transfer",//转移积分
    //     // func: "takeCash",//减少积分
    //   },
    //   method: "GET",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    //   // header: { 'content-type': 'application/json' }
    // }).then(result => {
    //   console.log(result);
    //   console.log("交易成功");
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });

    //转移
    function zhuanyi(){
      fetch({
        url: "/app/invoke",
        // baseUrl: "http://192.168.50.157:9999",
        baseUrl: "https://health.lianlianchains.com",
        data: {
          // acc: user.openid.toString(), //openid
          acc: "ooo",
          amt: "110",
          reacc: "ppp",//对方的openid 转移积分时这个字段才有否则为空
          ccId: "0543963f23223c54d6616a61631c8e9b40300f682545b337564db11085ff328b",
          func: "transfer",//增加积分
          // func:"transfer",//转移积分
          // func: "takeCash",//减少积分
        },
        method: "GET",
        header: { 'content-type': 'application/x-www-form-urlencoded' }
        // header: { 'content-type': 'application/json' }
      }).then(result => {
        console.log(result);
        console.log("交易成功");





        //查询
        fetch({
          url: "/app/query",
          // baseUrl: "http://192.168.50.157:9999",
          baseUrl: "https://health.lianlianchains.com",
          data: {
            acc: "ooo", //openid
            // acc: "aaa",
            amt: "",
            reacc: "",//对方的openid 转移积分时这个字段才有否则为空
            ccId: "0543963f23223c54d6616a61631c8e9b40300f682545b337564db11085ff328b",
            func: "query",//增加积分
            // func:"transfer",//转移积分
            // func: "takeCash",//减少积分
          },
          method: "GET",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
          // header: { 'content-type': 'application/json' }
        }).then(result => {
          console.log(result);
          console.log("交易成功");
        }).catch(err => {
          console.log("出错了")
          console.log(err)
        });
        //查询
        fetch({
          url: "/app/query",
          // baseUrl: "http://192.168.50.157:9999",
          baseUrl: "https://health.lianlianchains.com",
          data: {
            // acc: user.openid, //openid
            acc: "ppp",
            amt: "",
            reacc: "",//对方的openid 转移积分时这个字段才有否则为空
            ccId: "0543963f23223c54d6616a61631c8e9b40300f682545b337564db11085ff328b",
            func: "query",//增加积分
            // func:"transfer",//转移积分
            // func: "takeCash",//减少积分
          },
          method: "GET",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
          // header: { 'content-type': 'application/json' }
        }).then(result => {
          console.log(result);
          console.log("交易成功");
        }).catch(err => {
          console.log("出错了")
          console.log(err)
        });










      }).catch(err => {
        console.log("出错了")
        console.log(err)
      });


    }
    // zhuanyi();

    var param = {
      diagnosis:{
        diagnosisid: "bbbbbbbbbb",
        datetime: "20170208",
        hospital: "",
        doctor: "",
        amt: "",
        label: "fff",
        symptom: ""
      },
      userInfo:{
        sex:"",
        age:"",
        phoneno:"",
        address:""
      }
    }

    // var b = new Base64();
    // var str = b.encode(param);
    // console.log(str);
    // 　　　　　//解密
    // str = b.decode(str);
    // console.log(str); 
    
  // 健康档案借口
    // fetch({
    //   url: "/ehr/invoke",
    //   // baseUrl: "http://192.168.50.157:9999",
    //   baseUrl: "https://health.lianlianchains.com",
    //   data: {
    //     // acc: user.openid, //openid
    //     acc: "ppp",
    //     ehr: param,
    //     ccId: "5e02ae2fd549edc9f7510221e13798de200a31a4b5f438a710fb49b877dc5bb2",
    //     func: "save",//存数据
    //     // func:"transfer",//转移积分
    //     // func: "takeCash",//减少积分
    //   },
    //   method: "GET",
    //   header: { 'content-type': 'application/x-www-form-urlencoded' }
    //   // header: { 'content-type': 'application/json' }
    // }).then(result => {
    //   console.log(result);
    //   console.log("交易成功");
    // }).catch(err => {
    //   console.log("出错了")
    //   console.log(err)
    // });
    fetch({
      url: "/ehr/query",
      // baseUrl: "http://192.168.50.157:9999",
      baseUrl: "https://health.lianlianchains.com",
      data: {
        // acc: user.openid, //openid
        acc: "ppp",
        ehr: "",
        ccId: "5e02ae2fd549edc9f7510221e13798de200a31a4b5f438a710fb49b877dc5bb2",
        func: "query",//增加积分
        // func:"transfer",//转移积分
        // func: "takeCash",//减少积分
      },
      method: "GET",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
      // header: { 'content-type': 'application/json' }
    }).then(result => {
      console.log(result);
      console.log("交易成功");
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