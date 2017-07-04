// pages/submit/submit.js
function send(){
    wx.request({
        url: 'https://health.lianlianchains.com/sms/send',
        data: {
            mobile: mobile
        },
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {

            if (res.data.code != 200) {

                that.setData({
                    'tipflag': true,
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
      sendmsg: '发送验证码',
      disabled: true,
      mobile:0,
      isPhone: false,
      isPwd: false
  },
  //发短信
  sendmsg(){
      send()
  },
  formSubmit(e){
    console.log(e);
  },
  bindPhoneTap(e){
    console.log(typeof e.detail.value)
    if (e.detail.value.length != 11){
        this.setData({
            isPhone: true
        });
    }else{
        this.setData({
            isPhone: false
        });
    }
    if (this.data.isPhone || this.data.isPwd) {
        this.setData({
            disabled: true
        });
    } 
    if (!this.data.isPhone && !this.data.isPwd)  {
        this.setData({
            disabled: false
        });
    }
  },
  bindPwdTap(e){
      if (e.detail.value.length == 0) {
          this.setData({
              isPwd: true
          });
      } else {
          this.setData({
              isPwd: false
          });
      }
      if (this.data.isPhone || this.data.isPwd) {
          this.setData({
              disabled: true
          });
      }
      if (this.data.isPhone == false && this.data.isPwd == false) {
          this.setData({
              disabled: false
          });
      }
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