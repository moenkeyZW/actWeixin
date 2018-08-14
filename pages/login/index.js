// pages/login/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options['act_id'];
    if(id >0){
      this.setData({
        id: id
      })
    }else{
      this.setData({
        id: null
      })
    }
  },

  reAuthorize: function (e) {
    const that=this;
    app.toAuthorize(function (res) {
      var id = that.data.id;
      if (id !== null ) {
        wx.reLaunch({
          url: '/pages/lottery/lottery?act_id=' + id,
        })
      } else {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    if (!wx.getStorageSync('openid')) {
      wx.showLoading({
        title: '授权中',
      })
      app.onLogin(function (res) {
        console.log(res)
        wx.hideLoading();
        if (res || res === null) {
          var id = that.data.id;
          if (id !== null) {
            wx.redirectTo({
              url: '/pages/lottery/lottery?act_id=' + id,
            })
          } else {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        } else {
          that.setData({
            'haveFullUserInfo': true
          })
        }
      });
    } else {
      var id = that.data.id;
      wx.showLoading({
        title: '正在获取中',
      })
      if (id !== null) {
        wx.redirectTo({
          url: '/pages/lottery/lottery?act_id=' + id,
        })
      } else {
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }
    }
  },
})