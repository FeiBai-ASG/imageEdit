import { pedGlobal as G, setCanvas } from './GLOBAL'

import * as Util from './Utils'

class ImageInfo {
  constructor (options) {
    const { url, saveFn, loaded } = options
    this.getImgInfo(url)
    this.getDeviceInfo()
    this.saveFn = saveFn
    this.loaded = loaded
  }

  getImgInfo (url) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    const that = this
    img.src = url

    img.onload = function () {
      console.log('image:', this.width, this.height)
      const globalImg = G.img
      globalImg._width = this.width
      globalImg._height = this.height
      globalImg._HW = (this.width / this.height).toFixed(4)
      globalImg._WH = (this.height / this.width).toFixed(4)
      G.imgInstance = this
      that.loaded()
    //   that.showImg()
    }
  }

  loadImg (options) {
    const canvasDom = document.getElementById('picture_edit_canvas')
    const textBox = document.getElementById('picture_edit_text')
    const textInput = document.getElementById('picture_edit_input')
    setCanvas(canvasDom, textBox, textInput)
    // const heightLess = (G.boxSize._height - parseFloat(canvasDom.style.height)).toFixed(4)
    // if (heightLess > 0) {
    //   G.canvasGrandDom.style.paddingTop = heightLess / 2 + 'px'
    // }
    console.log('canvasDom:', canvasDom.width, canvasDom.height)

    G.canvasContext.drawImage(G.imgInstance, 0, 0, canvasDom.width, canvasDom.height)

    Util.addScaleEvent(canvasDom)
    Util.addTextEvent()
    // 给操作按钮添加事件
    // Util.addOperateEvent()
    // 保存按钮事件添加
    Util.addSaveEvent(document.getElementById('picture_edit_save'), G.canvasContext, this.saveFn)
    // 取消按钮事件添加
    Util.addCancelEvent(document.getElementById('picture_edit_cancel'))
  }

  getDeviceInfo () {
    console.log('device:', document.documentElement.clientWidth, document.documentElement.clientHeight)
    G.device._width = document.documentElement.clientWidth
    G.device._height = document.documentElement.clientHeight
  }

  showImg () {
    if (document.getElementById('picture_edit_cancel')) {
      G.pictureEditBox.remove()
    }

    const canvasDom = document.getElementById('picture_edit_canvas')
    const textBox = document.getElementById('picture_edit_text')
    const textInput = document.getElementById('picture_edit_input')
    setCanvas(canvasDom, textBox, textInput)
    const heightLess = (G.boxSize._height - parseFloat(canvasDom.style.height)).toFixed(4)
    if (heightLess > 0) {
      G.canvasGrandDom.style.paddingTop = heightLess / 2 + 'px'
    }
    G.canvasContext.drawImage(G.imgInstance, 0, 0, canvasDom.width, canvasDom.height)
    Util.addScaleEvent(canvasDom)
    Util.addTextEvent()
    // 给操作按钮添加事件
    Util.addOperateEvent()
    // 保存按钮事件添加
    Util.addSaveEvent(document.getElementById('picture_edit_save'), G.canvasContext, this.saveFn)
    // 取消按钮事件添加
    Util.addCancelEvent(document.getElementById('picture_edit_cancel'))
  }

  showPED () {
    G.pictureEditBox.style.display = 'block'
  }
}

export default ImageInfo
