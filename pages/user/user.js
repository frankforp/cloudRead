// pages/user/user.js
import { fetch } from '../../utils/util.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    storeTotal : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.getStoreTotal()
  },
  onShow: function(){
    this.getStoreTotal()
  },
  /**获取收藏总数 */
  getStoreTotal(){
    fetch.get('/collection/total').then(res=>{
      this.setData({
        storeTotal : res.data.data
      })
    })
  },
  /**进入收藏页面 */
  toStoreBook(){
    wx.navigateTo({
      url: '/pages/storeBook/storeBook',
    })
  },
  /**功能未开放 */
  noFunction(){
    wx.showToast({
      title: '暂无此功能',
      icon: 'none',
      duration : 1000
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})