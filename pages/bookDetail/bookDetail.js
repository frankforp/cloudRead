// pages/bookDetail/bookDetail.js
import { fetch } from '../../utils/util.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    time: '',
    detail : {},
    catalogs:[]
  },
  /**跳转文章目录 */
  toCatalog(){
    wx:wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.detail.data._id}`,
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
    this.getCatalogs(options.id)
  },
  /**获取目录数据 */
  getCatalogs(id) {
    fetch.get(`/titles/${id}`).then(res => {
      this.setData({
        isLoading: false,
        catalogs: res.data.data
      })
    })
  },
  /**获取文章详情信息 */
  getDetail(id) {
    fetch.get( `/book/${id}`).then(res=>{
      console.log(res.data)
      let timeStr = res.data.data.updateTime.split('T')[0]
      let times = timeStr.split('-')
      let timeString = times[0] + '年' + times[1] + '月' + times[2] + '日'
      wx.setNavigationBarTitle({
        title: res.data.data.title,
      })
      this.setData({
        detail: res.data,
        time: timeString,
        isLoading: false
      })
    })
  },
  /**跳转文章内容页--->默认从0页开始读 */
  toArticle(event){
    wx.navigateTo({
      url: `/pages/catalogDetail/catalogDetail?id=${this.data.catalogs[0]._id}&bookId=${this.data.detail.data._id}&index=0`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})