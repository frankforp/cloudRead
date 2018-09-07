// pages/myStudy/myStudy.js
import { fetch, utils } from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    readList: [],
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.getReadBook()
  },
  /**下拉刷新 */
  onPullDownRefresh: function () {
    this.getReadBook().then(res => {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 1500
      })
      wx.stopPullDownRefresh()
    })
  },
  /**获取用户的读过的书 */
  getReadBook(){
    return new Promise((resolve,reject)=>{
      this.setData({
        isLoading: true
      })
      fetch.get('/readList').then(res => {
        resolve()
        let readList = this.updateData(res.data.data)
        this.setData({
          readList: readList,
          isLoading: false
        })
      }).catch(err=>{
        reject()
      })
    })
  },
  /**处理接口数据 */
  updateData(data){
    let newArr = data.map(item=>{
      let obj = {}
      let percent = Math.floor(100 * item.title.index / item.title.total)
      let updatedTime = utils.updateTime(item.updatedTime)
      obj = { ...item, updatedTime, percent}
      return obj
    })
    return newArr
  },
  /**继续阅读 */
  toCatalogDetail(event){
    let id = event.currentTarget.dataset.id
    let bookId = event.currentTarget.dataset.bookid
    wx.navigateTo({
      url: `/pages/catalogDetail/catalogDetail?id=${id}&bookId=${bookId}`,
    })
  },
  /**查看文档 */
  toBookDetail(event){
    let page = event.currentTarget.dataset.page
    let bookId = event.currentTarget.dataset.bookid
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?page=${page}&id=${bookId}`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})