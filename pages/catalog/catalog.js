// pages/catalog/catalog.js
import {fetch} from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
      isLoading: false,
      catalogs : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLoading: true
    })
    this.getCatalogs(options.id)
  },
  getCatalogs(id){
    fetch.get(`/titles/${id}`).then(res=>{
      this.setData({
        isLoading: false,
        catalogs: res.data.data
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})