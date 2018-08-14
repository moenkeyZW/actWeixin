// pages/noLucky/noLucky.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actPng: '',
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
        that.setData({
          actPng: res.data.xcx_barimg,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


})