//app.js
App({
  onLaunch: function (options) {
  },
  onLogin: function (cb) {
    var that = this;
    wx.checkSession({
      success: function (res) {
        if (wx.getStorageSync('openid')) {
          that.onRefresh(cb);
        } else {
          wx.login({
            success: res => {
              if (res.code) {
                wx.getUserInfo({
                  withCredentials: true,
                  success: function (res_user) {
                    wx.request({
                      url: that.globalData.base_url + '/admin/wechat/login',
                      data: {
                        code: res.code,
                        encryptedData: res_user.encryptedData,
                        iv: res_user.iv
                      },
                      method: 'GET',
                      header: {
                        'content-type': 'application/json'
                      },
                      success: function (res) {
                        that.globalData.actList=res.data.actlist;
                        that.globalData.userInfo_avatar = res.data.avatarUrl;
                        that.globalData.state=res.data.state;
                        wx.setStorageSync('session', res.data.hash);
                        wx.setStorageSync('openid', res.data.openid);
                        typeof cb == "function" && cb(that.globalData.actList )
                      }
                    })
                  },
                  fail: function (e) {
                    typeof cb == "function" && cb(false)
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            },
            fail: function (e) {
            }

          })
        }
      },
      fail: function () {
        wx.login({
          success: res => {
            if (res.code) {
              wx.getUserInfo({
                withCredentials: true,
                success: function (res_user) {
                  wx.request({
                    url: that.globalData.base_url + '/admin/wechat/login',
                    data: {
                      code: res.code,
                      encryptedData: res_user.encryptedData,
                      iv: res_user.iv
                    },
                    method: 'GET',
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      that.globalData.actList = res.data.actlist;
                      that.globalData.userInfo_avatar = res.data.avatarUrl;
                      that.globalData.state = res.data.state;
                      wx.setStorageSync('session', res.data.hash);
                      wx.setStorageSync('openid', res.data.openid);
                      typeof cb == "function" && cb(that.globalData.actList )
                    }
                  })
                },
                fail: function (e) {
                  typeof cb == "function" && cb(false)
                }
              })
            } else {
            }
          }
        })
      }
    })
  
  },
  onRefresh: function (cb) {
    var that = this;
    wx.checkSession({
      success: function (res) {
        // if (!that.globalData.actList ) {
          if (wx.getStorageSync('openid')) {
            wx.request({
              url: that.globalData.base_url + '/admin/wechat/login_info',
              data: {
                openid: wx.getStorageSync('openid'),
              },
              method: 'GET',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                that.globalData.actList = res.data.actlist;
                that.globalData.userInfo_avatar = res.data.avatarUrl;
                that.globalData.state = res.data.state;
                typeof cb == "function" && cb(that.globalData.actList )
              }
            })
          } else {
            that.onLogin(cb);
          }
        // } else {
        //   typeof cb == "function" && cb( that.globalData.actList)
        // }
      },
      fail: function (res) {
        that.onLogin(cb);
      },
    })

  },
  toAuthorize: function (cb) {
    const that = this;
    wx.openSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          that.onLogin(cb);
        }
      }, fail: function (res) {
      }
    })
  },
  globalData: {
    base_url:"https://www.1537u.cn",
    userInfo_avatar: null,
    actList:null,
    state:null,
  }
})