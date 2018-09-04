// pages/catalogDetail/catalogDetail.js
import { fetch } from "../../utils/util.js"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCatalog : false,
    isLoading: false,
    catalogs : [],
    article : {},
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLoading:true,
    })
    this.getCatalogs(options.bookId)
    this.getArticle(options.id,options.index)
  },
  /**设置目录列表的显示与隐藏 */
  toggle_catalog(event){
    this.setData({
      showCatalog : !this.data.showCatalog
    })
  },
  /**更换文章内容 */
  changeContent(event){
    let id = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    this.getArticle(id, index)
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
  /**获取文章内容 */
  getArticle(id, index){
    this.setData({
      isLoading: true,
    })
    fetch.get(`/article/${id}`).then(res=>{
        //将markdown内容转换为towxml数据
      let data = app.towxml.toJson(res.data.data.article.content, 'markdown');
      wx.setNavigationBarTitle({
        title: res.data.data.title,
      })
      this.setData({
        article: data,
        showCatalog: false,
        isLoading: false,
        page: index
      })
    })
  }, 
  /**上一页下一页功能 t: next->下一页；cur->上一页*/
  changePage(event){
    let t = event.currentTarget.dataset.type
    let index = this.data.page
    switch(t){
      case 'next':
        index >= this.data.catalogs.length - 1 ? this.data.catalogs.length - 1 : index++
        this.getArticle(this.data.catalogs[index]._id,index)
        break
      case 'cur':
        index <= 0 ? 0 : index--
        this.getArticle(this.data.catalogs[index]._id,index)
        break
      default:
        break
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})