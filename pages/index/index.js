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
  getData(){
    fetch.get('/swiper').then(res=>{
      this.setData({
        imgUrls : res.data.data,
        isLoading:false
      })
    })
  },
  getBooks(){
    fetch.get('/category/books').then(res => {
      this.setData({
        books: res.data.data,
        isLoading: false
      })
    })
  },
  onLoad: function () {
    this.setData({
      isLoading: true
    })
    this.getData()
    this.getBooks()
  },
  jumpbook(event){
    wx:wx.navigateTo({
      url:  `/pages/bookDetail/bookDetail?id=${event.currentTarget.dataset.id}`,
    })
  }
})
