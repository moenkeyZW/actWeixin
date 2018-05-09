// pages/lottery/lottery.js
const app = getApp();

Page({
  data: {
    userInfo_avatar: null,
    actList: {
      actPng: '',
      time: '',
      tel: '',
      cjm: '',
      zjnum: 10,
      state: '',
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow();// 刷新页面
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options['act_id'];
    wx.request({
      url: app.globalData.base_url + '/admin/wechat/cjm_info',
      data: {
        act_id: id,
        openid: wx.getStorageSync('openid'),
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.state == 0) {
          that.setData({
            userInfo_avatar: app.globalData.userInfo_avatar,
            "actList.state": res.data.state,
          })
        } else {
          that.setData({
            userInfo_avatar: app.globalData.userInfo_avatar,
            "actList.state": res.data.state,
            "actList.actPng": res.data.xcx_barimg,
            "actList.time": res.data.kjtime,
            "actList.tel": res.data.tel,
            "actList.cjm": res.data.cjm,
            "actList.zjnum": res.data.zjnum,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})