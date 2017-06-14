// pages/userInfo/userInfo.js
import fetch from '../../utils/fetch.js';
let timer, num = 10;
let onoff = true;
function sms(mobile){
  wx.request({
      url: 'https://lite.lianlianchains.com/sms/send',
      data: {
        mobile: mobile
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        if (res.data.code != 200) {

          that.setData({
            'tipflag': true
          })

          that.setData({
            'tip': res.data.msg
          })

          setTimeout(function () {
            that.setData({
              'tipflag': false
            })
          }
            , 3000)

        }
      }
    })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: "",
    age: "",
    phoneno: "",
    address: "",
    codemsg:"获取验证码"
  },
  bindSexTap(e) {
    // console.log(e.detail.value);
    this.setData({
      sex: e.detail.value
    });
  },
  bindAgeTap(e) {
    // console.log(e.detail.value);
    this.setData({
      age: e.detail.value
    });
  },
  bindTelTap(e) {
    // console.log(e.detail.value);
    this.setData({
      phoneno: e.detail.value
    });
  },
  bindAddressTap(e) {
    // console.log(e.detail.value);
    this.setData({
      address: e.detail.value
    });
  },
  bindSmsTap(e){
    console.log(this.data.phoneno);
    // 发送验证码
    if (onoff){
      onoff = false
      timer = setInterval(() => {
        if (num < 1) {
          clearInterval(timer);
          this.setData({
            codemsg: "获取验证码"
          });
          onoff = true
        } else {
          num--;
          this.setData({
            codemsg: num + "秒"
          });
        }
      }, 1000);
      //发送验证码
      sms(mobile);
    }  
  },
  formSubmit: function (e) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = wx.getStorageSync('user');
    // 查询
    fetch({
      url: "/health/user/query",
      baseUrl: "https://health.lianlianchains.com",
      // baseUrl: "http://192.168.50.157:8888",
      data: {
        'openid': user.openid
      },
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(result => {
      console.log(result);
      that.setData({
        address: result.address,
        age: result.age,
        nickname: result.nickname,
        openid: result.openid,
        phoneno: result.phoneno,
        sex: result.sex,
      });
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
    var that = this;
    console.log('消失了');
    //更新
    fetch({
      url: "/health/user/update",
      baseUrl: "https://health.lianlianchains.com",
      // baseUrl: "http://192.168.50.157:8888",
      data: {
        'openid': that.data.openid,
        'nickname': that.data.nickname,
        'sex': that.data.sex,
        'age': that.data.age,
        'phoneno': that.data.phoneno,
        'address': that.data.address
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