//index.js
import { fetch } from '../../utils/util.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [],        //轮播图
    books : [],          //书籍
    indicatorDots: true,  //轮播图的点
    autoplay: true,       //是否自动轮播
    circular: true,       //是否衔接轮播
    interval: 2000,       //停留的时间
    duration: 500,        //切换的时间
    isLoading : false,    //是否显示loading
    isMore: true,         //是否显示加载更多----底部正在加载
    isBottom: false,       //是否显示底部加载控件的信息
    page : 1                //上拉加载（分页） 的页码
  },
  /**下拉刷新 */
  onPullDownRefresh:function() {
    wx.showLoading({
      title: '加载中...',
      mask:true,
    })
    Promise.all([this.getData(), this.getBooks()]).then(res => {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration : 1000
      })
      this.setData({
        page: 1,
        isMore: true
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  },
  /**上拉加载 */
  onReachBottom: function(){
    let page = this.data.page
    page++
    this.getMoreBook(page)
  },
  /**获取更多图书 */
  getMoreBook(page){
    fetch.get(`/category/books?pn=${page}`).then(res=>{
      let newArr = [...this.data.books,...res.data.data]
      if(res.data.data.length < 2){
        this.setData({
          isMore : false
        })
      }
      this.setData({
        books: newArr,
        page
      })  
    })
  },
  /**获取轮播图信息 */
  getData(){
    return new Promise((resolve,reject)=>{
      fetch.get('/swiper').then(res => {
        resolve()
        this.setData({
          imgUrls: res.data.data,
          isLoading: false
        })
      }).catch(err=>{
        reject()
        this.setData({
          isLoading: false
        })
      })
    })
  },
  /**获取书籍信息 */
  getBooks(){
    return new Promise((resolve,reject)=>{
      fetch.get('/category/books').then(res => {
        resolve()
        this.setData({
          books: res.data.data,
          isLoading: false,
          isBottom: true
        })
      }).catch(err=>{
        reject()
        this.setData({
          isLoading: false
        })
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
