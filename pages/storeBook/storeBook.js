// pages/storeBook/storeBook.js
import { fetch } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList : [],      //书籍列表
    page : 1,           //分页  页数 默认为第一页
    size : 4,            //每页的数量
    isLoading: false,      //加载页是否显示
    isAdd : false,       //是否还有数据
    isDel : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch.get('/collection/5b91fe441e48e46c5e9f7d83')
    this.getBookList(this.data.page)
  },
  /**获取收藏的所有图书 */
  getBookList(page){
    this.setData({
      isLoading:true
    })
    fetch.get(`/collection?pn=${page}&size=${this.data.size}`).then(res=>{
      let newArr = [...this.data.bookList,...res.data.data]
      if(res.data.data.length < this.data.size){
        this.setData({
          isAdd: true
        })
      }
      this.setData({
        bookList: newArr,
        page:page,
        isLoading: false,
        isDel: false
      })
    })
  },
  /**获取更多 */
  getMore(){
    let page = ++this.data.page
    this.getBookList(page)
  },
  /**删除收藏 */
  delBook(event){
    let _this = this
    let bookId = event.currentTarget.dataset.id
    let delIndex = event.currentTarget.dataset.index
    wx.showModal({
      title: '删除收藏',
      content: '确认删除吗？',
      success: function (res) {
        if (res.confirm) {
          fetch.delete(`/collection/${bookId}`).then(res=>{
            let newArr = _this.data.bookList.map((item,index)=>{
              if (index != delIndex) return item
            })
            _this.setData({
              bookList: newArr,
              isDel : false
            })
          })
        } else if (res.cancel) {
          _this.setData({
            isDel: false
          })
        }
      }
    })
  },
  /**显示删除按钮 */
  showDel(){
    this.setData({
      isDel : true
    })
  },
  /**跳转书籍详情 */
  toDetail(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/bookDetail/bookDetail?id=${id}`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})