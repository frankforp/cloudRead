// pages/moreBooks/morebooks.js
import { fetch } from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:false,
    books : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLoading: true
    })
    this.getAllBooks(options.id)
  },
  /**获取该分类下的所有图书 */
  getAllBooks(id){
    fetch.get(`/category/${id}/books`).then(res=>{
      wx.setNavigationBarTitle({
        title: res.data.data.title,
      })
      this.setData({
        books:res.data.data.books,
        isLoading: false
      })
    })
  },
  /**跳转书籍详情页面 */
  jumpbook(event) {
    wx: wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?id=${event.currentTarget.dataset.id}`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})