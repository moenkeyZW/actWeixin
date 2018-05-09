//index.js
//获取应用实例
const app = getApp()
var timestamp = Date.parse(new Date()) / 1000;

Page({
  data: {
    userInfo_avatar: null,
    actList: {
      actPng: '',
      share: '',
      time: '',
      id: '',
      name: '',
      success:'',
    },
    state: '',
    timestamp: null,
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onShow();// 刷新页面
    if (app.globalData.actList) {
      app.onRefresh();
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }else{
      app.onRefresh();
    }
  },

  onLoad: function () {

  },
  onShow: function () {
    var that = this;
    that.setData({
      timestamp: timestamp
    })
    // if (!app.globalData.actList) {
      app.onRefresh(function (res) {
        that.setData({
          userInfo_avatar: app.globalData.userInfo_avatar,
          state: app.globalData.state,
          actList: app.globalData.actList,
        }, () => {
          const userInfo_avatar = app.globalData.userInfo_avatar;
          const actList = app.globalData.actList;
          const state = app.globalData.state;
        })
      });
    // } else {
      // that.setData({
      //   userInfo_avatar: app.globalData.userInfo_avatar,
      //   state: app.globalData.state,
      //   actList: app.globalData.actList,
      // }, () => {
      //   const userInfo_avatar = app.globalData.userInfo_avatar;
      //   const actList = app.globalData.actList;
      //   const state = app.globalData.state;
      // })
    // }
  },
  lookActivity: function (e) {
    var that = this;
    var arr = e.currentTarget.dataset.index.split(",");
    const id = arr[0];
    const share = arr[1]
    if (share == 0) {
      wx.showModal({
        title: '信息提醒',
        content: '未完成活动步骤，无法查看\r完成报名后，可查看抽奖码',
        showCancel: false,
        confirmText: '知道了',
        success: function (res) {
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/lottery/lottery?act_id=' + id,
      })
    }
  },
  beginActivity: function (e) {
    const id = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/noLucky/noLucky?act_id=' + id,
    })
  }
})
