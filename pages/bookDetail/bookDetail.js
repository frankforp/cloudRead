// pages/bookDetail/bookDetail.js
import { fetch } from '../../utils/util.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    time: '',
    detail : {}
  },
  toCatalog(){
    wx:wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.detail.book._id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLoading: true
    })
    this.getDetail(options.id)
  },
  getDetail(id) {
    fetch.get( `/swiper/${id}`).then(res=>{
      let timeStr = res.data.data.book.createTime.split('T')[0]
      let times = timeStr.split('-')
      let timeString = times[0] + '年' + times[1] + '月' + times[2] + '日'
      this.setData({
        detail: res.data.data,
        time: timeString,
        isLoading: false
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})