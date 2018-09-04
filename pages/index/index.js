//index.js
import { fetch } from '../../utils/util.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [],
    books : [],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    isLoading : false
  },
  /**获取轮播图信息 */
  getData(){
    fetch.get('/swiper').then(res=>{
      console.log(res)
      this.setData({
        imgUrls : res.data.data,
        isLoading:false
      })
    })
  },
  /**获取书籍信息 */
  getBooks(){
    fetch.get('/category/books').then(res => {
      console.log(res.data.data)
      this.setData({
        books: res.data.data,
        isLoading: false
      })
    })
  },
  /**生命周期钩子函数 */
  onLoad: function () {
    this.setData({
      isLoading: true
    })
    this.getData()
    this.getBooks()
  },
  /**跳转书籍详情页面 */
  jumpbook(event){
    wx:wx.navigateTo({
      url:  `/pages/bookDetail/bookDetail?id=${event.currentTarget.dataset.id}`,
    })
  },
  /**跳转到更多书籍页面 */
  toMoreBook(event) {
    wx: wx.navigateTo({
      url: `/pages/moreBooks/morebooks?id=${event.currentTarget.dataset.type}`,
    })
  }
})
