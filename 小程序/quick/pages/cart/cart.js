// pages/cart/cart.js
import fetch from '../../utils/fetch'
var list = [{
    price:10,
    amount: 1
},
{
    price: 10,
    amount: 2
},
{
    price: 20,
    amount: 1
}]

function change(_this,types){
    for (var i = 0; i < list.length; i++){
        if(i = index){
            list[i].amount++
            _this.setData
        }
    }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
      reduceSrc: '../../image/reduce.png',
      increaseSrc: '../../image/increase.png',
      cartList:[
          
      ],
      total:0,
      moveLeft:false
  },
  moveLeft(){
    this.setData({
        moveLeft: true
    })
  },
  bindReduceTap(e){
      var param = {};
      var index = e.target.dataset.index;
      if (this.data.cartList[index].amount > 1){
          this.data.cartList[index].amount--;
      }
      this.data.total = 0;
      for (var i = 0; i < this.data.cartList.length; i++) {
          this.data.total += this.data.cartList[i].price * this.data.cartList[i].amount
      }
      this.setData({
          cartList: this.data.cartList,
          total: this.data.total
      });
  },
  bindIncreaseTap(e){
    var param = {};
    var index = e.target.dataset.index;
    this.data.cartList[index].amount++;
    this.data.total = 0;
    for (var i = 0; i < this.data.cartList.length; i++) {
        this.data.total += this.data.cartList[i].price * this.data.cartList[i].amount
    }
    this.setData({ 
        cartList: this.data.cartList,
        total:this.data.total
    });
  },
  //下单
  order(){
      this.prepay(wx.getStorageSync('user').openid, 0.01)
  },
  prepay(openId, payMoney) {
      console.log("支付钱数：" + payMoney);
      var that = this;
      fetch({
          url: "/wxpay/prepay",
        //   baseUrl: "http://192.168.50.57:9888",
          baseUrl: "https://store.lianlianchains.com",
          data: {
              'openid': openId,
              'fee': payMoney,
              'description': "快点支付",
              'usedScore': 0,
              'mch_id': 123
          },
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
          console.log(result);
          var prepay_id = result.prepay_id;
          console.log("统一下单返回 prepay_id:" + prepay_id);
          that.sign(prepay_id, payMoney);
      }).catch(err => {

      });
  },
  //签名
  sign(prepay_id, payMoney) {
      console.log("支付钱数：" + payMoney);
      var that = this;
      fetch({
          url: "/wxpay/sign",
          baseUrl: "http://211.159.174.113:9888",
        //   baseUrl: "https://health.lianlianchains.com",
          data: {
              'repay_id': prepay_id
          },
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded' }
      }).then(result => {
          that.requestPayment(result, payMoney);
      }).catch(err => {

      });
  },
  //申请支付
  requestPayment: function (obj, payMoney) {
      console.log("支付钱数：" + payMoney);
      wx.requestPayment({
          'timeStamp': obj.timeStamp,
          'nonceStr': obj.nonceStr,
          'package': obj.package,
          'signType': obj.signType,
          'paySign': obj.paySign,
          'success': function (res) {
              console.log(111);
              fetch({
                  url: "/CVS/cart/deleteall",
                  baseUrl: "http://192.168.50.57:9888",
                  //   baseUrl: "https://store.lianlianchains.com",
                  data: {
                      openid: wx.getStorageSync('user').openid,
                      amount: this.data.amounts,
                      code: '6901121300298'
                  },
                  noLoading: true,
                  method: "POST",
                  header: { 'content-type': 'application/x-www-form-urlencoded' }
                  //   header: { 'content-type': 'application/json' }
              }).then(carts => {
                  console.log("删除成功")
                  wx.redirectTo({
                      url: '../orderList/orderList'
                  })
              })
          },
          'fail': function (res) {
              console.log(res);
          }
      })
  },
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
      fetch({
          url: "/CVS/cart/querycart",
          baseUrl: "http://192.168.50.57:9888",
        //   baseUrl: "https://store.lianlianchains.com",
          data: {
              openid: wx.getStorageSync('user').openid
          },
          noLoading: true,
          method: "GET",
          //   header: { 'content-type': 'application/x-www-form-urlencoded' }
          header: { 'content-type': 'application/json' }
      }).then(carts => {
          this.setData({
              cartList: carts
          })
          for (var i = 0; i < this.data.cartList.length; i++) {
              this.data.total += this.data.cartList[i].price * this.data.cartList[i].amount
          }
          this.setData({
              total: this.data.total
          })
      })
      
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