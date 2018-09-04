// pages/bookDetail/bookDetail.js
import { fetch } from '../../utils/util.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
  },
  getDetail() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})