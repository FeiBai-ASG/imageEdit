import { pedGlobal as G, changeOperate } from './GLOBAL'
import deleteIcon from '../images/delete.png'
import { Toast } from 'vant'

let scaleStyle = 0
function createNode (txt, domType) {
  const template = txt
  const tempNode = document.createElement(domType || 'div')
  tempNode.innerHTML = template
  return tempNode.firstChild
}

function addScaleEvent (dom) {
  const singleStartTouche = { x: 0, y: 0 }

  let doubleStartTouche = null
  let scale = 1
  scaleStyle = (dom.width / parseFloat(dom.style.width)).toFixed(4)

  const context = G.canvasContext
  let boxOffsetTop = G.canvasParentDom.offsetTop
  let boxOffsetLeft = G.canvasParentDom.offsetLeft
  dom.addEventListener('touchstart', function (e) {
    if (e.touches.length === 2) {
      doubleStartTouche = e.touches
    } else if (e.touches.length === 1) {
      if (G.operateType === 1) {
        // 记录初始的滑动位置
        setSingleCoordinate(singleStartTouche, e)
        context.beginPath()
        context.lineWidth = G.lineWidth
        // 计算canvas dom 偏移
        const padding = getCanvasPadding()
        const x = (e.touches[0].pageX - boxOffsetLeft - document.body.scrollLeft + G.canvasGrandDom.scrollLeft - padding) * scaleStyle
        const y = (e.touches[0].pageY - boxOffsetTop - document.body.scrollTop + G.canvasGrandDom.scrollTop) * scaleStyle
        context.moveTo(x, y)
        // 记录初始点坐标
        G.paintingArray.push({ start: { x, y }, moves: [], color: G.currentColor })
        G.editSteps.push({ start: { x, y }, moves: [] })
      }
    }
  }, false)

  dom.addEventListener('touchmove', function (e) {
    if (e.touches.length === 2) {
      e.preventDefault()
      resetOperateOne()

      const oldType = G.operateType
      G.operateType = 0

      console.log('oldType', oldType)
      scale = getScaleNum(doubleStartTouche, e.touches)
      doubleStartTouche = e.touches
      const oldWidth = parseFloat(dom.style.width)
      const oldHeight = parseFloat(dom.style.height)
      const newWidth = (oldWidth * scale).toFixed(4)
      //   const newHeight = parseFloat((oldWidth * G.img._WH).toFixed(4))
      const newHeight = parseFloat((oldHeight * scale).toFixed(4))
      dom.style.width = newWidth + 'px'
      dom.style.height = newHeight + 'px'
      scaleStyle = (dom.width / parseFloat(newWidth)).toFixed(4)
      boxOffsetTop = G.canvasParentDom.offsetTop
      boxOffsetLeft = G.canvasParentDom.offsetLeft
      fixPadding()
      if (G.inputDomArray.length > 0) {
        G.inputDomArray.forEach(item => {
          item.style.fontSize = (parseFloat(item.style.fontSize) * scale).toFixed(4) + 'px'
          item.style.top = (parseFloat(item.style.top) / oldHeight * newHeight).toFixed(4) + 'px'
          item.style.left = (parseFloat(item.style.left) / oldWidth * newWidth).toFixed(4) + 'px'
        })
      }
      if (oldType === 1) {
        setTimeout(() => {
          changeOperate(oldType)
        }, 500)
      }
    } else if (e.touches.length === 1) {
      if (G.operateType === 1) {
        e.preventDefault()
        const padding = getCanvasPadding()
        context.strokeStyle = G.currentColor
        const x = parseFloat((e.touches[0].pageX - boxOffsetLeft - document.body.scrollLeft + G.canvasGrandDom.scrollLeft - padding) * scaleStyle)
        const y = parseFloat((e.touches[0].pageY - boxOffsetTop - document.body.scrollTop + G.canvasGrandDom.scrollTop) * scaleStyle)
        if (G.operateType === 1) {
          context.lineTo(x, y)
          context.stroke()
          // 记录初始的滑动位置
          setSingleCoordinate(singleStartTouche, e)
          const historyLength = G.paintingArray.length - 1
          G.paintingArray[historyLength].moves.push({ x, y, color: G.currentColor })
        }
      }
    }
  }, { passive: false })
}

function addTextEvent () {
  G.textInput.addEventListener('blur', function () {
    const textArray = G.textInput.innerText.split(/[\n\r]+/)
    G.textBox.style.display = 'none'
    const fontSize = 15
    const textAll = textArray.join('')
    if (textAll && textArray.length > 0) {
      G.inputArray.push({ array: textArray, color: G.currentColor })
      if (G.textOperateIndex === 0) {
        let textDom = `<div 
        style="position: absolute;
        transform-origin: 0 0;
        font-size: ${fontSize + 'px'};
        padding: 12px 26px;
        border: 1px solid ${G.currentColor};
        color: ${G.currentColor};
        white-space: nowrap">
        <div style="position:relative">`

        for (let i = 0; i < textArray.length; i++) {
          //   textDom = textDom +  textArray[i] + `${i === textArray.length - 1 ? '' : '</br>'}`
          textDom = textDom + `<span>${textArray[i]}</span>${i === textArray.length - 1 ? '' : '</br>'}`
        }
        textDom += `<img src="${deleteIcon}" style="  width: 18px;
        height: 18px;
        position: absolute;
        top: -20px;
        z-index: 999;
        left: -36px;" class="delete-icon" id="delete"></img>`
        textDom += '</div>'

        textDom += '</div>'
        let dom = createNode(textDom)

        if (G.currentTextBox) {
          G.currentTextBox.innerHTML = ''
          G.currentTextBox.appendChild(dom.childNodes[1].cloneNode(true))
          dom = G.currentTextBox
          G.currentTextBox = null
        } else {
          G.canvasParentDom.appendChild(dom)
          // 获取dom的宽高以居中显示
          const domWidth = dom.offsetWidth
          const domHeight = dom.offsetHeight
          dom.style.top = (G.boxSize._height - domHeight) / 2 + G.canvasGrandDom.scrollTop - parseFloat(G.canvasGrandDom.style.paddingTop || 0) + 'px'
          dom.style.left = (G.boxSize._width - domWidth) / 2 + G.canvasGrandDom.scrollLeft - parseFloat(G.canvasGrandDom.style.paddingLeft || 0) + 'px'
          G.inputDomArray.push(dom)
          // addDragMoveEvent(dom)
          G.editSteps.push({ type: 'dom', dom, color: G.currentColor })
        }
        addTextMoveEvent(dom)
        addTextClickEvent(dom)
        addDeleteEvent(dom)
      }
      G.textIndex++
    }
    G.textInput.innerText = ''
    G.textBox.style.display = 'none'
    G.textInput.style.display = 'none'
  })
}

function addDeleteEvent (dom) {
  let div
  for (let i = 0; i < dom.childNodes.length; i++) {
    if (dom.childNodes[i].nodeName === 'DIV') {
      div = dom.childNodes[i]
      break
    }
  }
  let deleteImgDom

  for (let i = 0; i < div.childNodes.length; i++) {
    if (div.childNodes[i].nodeName === 'IMG') {
      deleteImgDom = div.childNodes[i]
      break
    }
  }
  deleteImgDom.addEventListener('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    const findIndex = G.editSteps.findIndex(item => item.dom === dom)
    if (findIndex > -1) {
      G.editSteps.splice(findIndex, 1)
    }
    const findInDomArray = G.inputDomArray.findIndex(item => item === dom)
    if (findInDomArray > -1) {
      G.inputDomArray.splice(findInDomArray, 1)
      G.inputArray.splice(findInDomArray, 1)
    }

    dom.remove()
  }, false)
}

function addTextClickEvent (dom) {
  let div
  for (let i = 0; i < dom.childNodes.length; i++) {
    if (dom.childNodes[i].nodeName === 'DIV') {
      div = dom.childNodes[i]
      break
    }
  }

  const currDom = div
  const textDom = div.childNodes
  const text = []
  for (let i = 0; i < textDom.length; i++) {
    const node = textDom[i]
    if (node.nodeName === 'SPAN') {
      text.push(node.innerText)
    }
  }
  currDom.addEventListener('click', function (e) {
    // e.preventDefault()
    // e.stopPropagation()

    G.textBox.style.display = 'block'
    G.textInput.style.display = 'inline-block'
    G.textInput.innerText = text.join('\n')

    G.textInput.focus()
    G.currentTextBox = dom
    resetOperateOne()
  })
}

function resetOperateOne () {
//   const operate = [...document.querySelectorAll('.picture-operate')][0]
//   if (operate.style.color === 'rgb(69, 148, 248)') {
//     operate.firstChild.src = './src/assets/image/painting.png'
//     operate.style.color = 'white'
//   }
}

function addOperateEvent () {
  const operates = [...document.querySelectorAll('.picture-operate')]
  operates.forEach((item) => {
    item.addEventListener('click', function (e) {
      const type = Number(e.currentTarget.getAttribute('operate'))
      changeOperate(type)
      if (type === 1) {
        const operate = e.currentTarget
        operate.firstChild.src = './src/assets/image/painting1.png'
        operate.style.color = '#4594f8'
      } else if (type === 4) {
        resetImg()
        clearInputDom()
        G.paintingArray = []
        G.editSteps = []
        resetOperateOne()
      } else if (type === 2) {
        G.textBox.style.display = 'block'
        G.textInput.style.display = 'inline-block'
        G.textInput.focus()
        resetOperateOne()
      } else if (type === 3) {
        if (G.paintingArray.length > 0) {
          resetImg()
          const context = G.canvasContext
          G.paintingArray.pop()
          context.beginPath()
          G.paintingArray.forEach((item) => {
            context.moveTo(item.start.x, item.start.y)
            item.moves.forEach(move => {
              context.lineTo(move.x, move.y)
            })
          })
          context.stroke()
        }
        resetOperateOne()
      } else if (type === 5) {
        rotateCanvas()
      }
    }, false)
  })
}

function diffTypeAction (type) {
  changeOperate(type)

  if (type === 1) {
    G.isDrawing = true
  } else if (type === 2) {
    G.textBox.style.display = 'block'
    G.textInput.style.display = 'inline-block'
    document.execCommand('justifyLeft')
    G.textInput.focus()
    resetOperateOne()
  } else if (type === 3) {
    if (G.editSteps.length > 0) {
      Toast('有编辑内容时不可旋转')
      return
    }
    rotateCanvas()
  } else if (type === 4) {
    if (G.editSteps.length > 0) {
      resetImg()
      const context = G.canvasContext

      const step = G.editSteps.pop()
      if (step.type === 'dom') {
        step.dom.remove()
      } else {
        G.paintingArray.pop()
      }
      // context.beginPath()

      // for (let i = 0; i < G.paintingArray.length; i++) {
      //   const item = G.paintingArray[i]
      //   context.beginPath()

      //   context.moveTo(item.start.x, item.start.y)

      //   item.moves.forEach(move => {
      //     context.strokeStyle = item.color
      //     context.fillStyle = item.color

      //     context.lineTo(move.x, move.y)
      //     context.stroke()
      //   })
      // }
      context.lineWidth = G.lineWidth

      G.paintingArray.forEach((item) => {
        context.beginPath()

        context.moveTo(item.start.x, item.start.y)

        item.moves.forEach(move => {
          context.strokeStyle = item.color
          context.fillStyle = item.color
          context.lineTo(move.x, move.y)
          context.stroke()
        })
      })
      context.stroke()
    }
    resetOperateOne()
  } else if (type === 5) { // 清空
    resetImg()
    clearInputDom()
    G.paintingArray = []
    G.editSteps = []
    resetOperateOne()
  }
}

function addTextMoveEvent (dom) {
  const toucheXY = { x: 0, y: 0 }
  const oldCoordinate = { top: 0, left: 0 }
  dom.addEventListener('touchstart', function (e) {
    // e.preventDefault()
    toucheXY.x = e.touches[0].pageX - document.body.scrollLeft
    toucheXY.y = e.touches[0].pageY - document.body.scrollTop
    oldCoordinate.top = parseFloat(dom.style.top)
    oldCoordinate.left = parseFloat(dom.style.left)
  }, false)
  dom.addEventListener('touchmove', function (e) {
    e.preventDefault()
    if (e.touches.length === 1) {
      // 移动
      const lessX = e.touches[0].pageX - document.body.scrollLeft - toucheXY.x
      const lessY = e.touches[0].pageY - document.body.scrollTop - toucheXY.y
      toucheXY.x = e.touches[0].pageX - document.body.scrollLeft
      toucheXY.y = e.touches[0].pageY - document.body.scrollTop
      const resultLeft = oldCoordinate.left + lessX
      const resultTop = oldCoordinate.top + lessY
      oldCoordinate.top = resultTop
      oldCoordinate.left = resultLeft
      dom.style.left = resultLeft.toFixed(4) + 'px'
      dom.style.top = resultTop.toFixed(4) + 'px'
    } else if (e.touches.length === 2) {
    }
  }, false)
}

// 文本框缩放 这期不上
// function addDragMoveEvent (dom) {

//   let start = []
//   const toucheXY = { x: 0, y: 0 }
//   const oldCoordinate = { top: 0, left: 0 }
//   const childNodes = Array.prototype.slice.call(Array.prototype.slice.call(dom.childNodes)[0].childNodes)
//   const dragDom = childNodes.find(item => item.id === 'drag')
//   dragDom.addEventListener('touchstart', function (e) {
//     e.preventDefault()
//     e.stopPropagation()
//     toucheXY.x = e.touches[0].pageX - document.body.scrollLeft
//     toucheXY.y = e.touches[0].pageY - document.body.scrollTop
//     oldCoordinate.top = parseFloat(dom.style.top)
//     oldCoordinate.left = parseFloat(dom.style.left)
//     start = e.touches // 得到第一组两个点
//   }, false)
//   dragDom.addEventListener('touchmove', function (e) {
//     e.preventDefault()
//     e.stopPropagation()
//     if (e.touches.length === 1) {
//       // 移动
//       var now = e.touches

//       //   let domX = dom.style
//       var domX = dom.offsetLeft
//       var domY = dom.offsetTop
//       var domW = dom.offsetWidth
//       var domH = dom.offsetHeight
//       const scaleX = (now[0].pageX - domX) / domW
//       const scaleY = (now[0].pageY - domY) / domH

//       dom.style.transform = `scale(${scaleX},${scaleY})`
//       //   dom.style.transformOrigin = '0 0'
//     } else if (e.touches.length === 2) {
//     }
//   }, false)
// }

function setSingleCoordinate (init, e) {
  init.x = e.touches[0].pageX - document.body.scrollLeft
  init.y = e.touches[0].pageY - document.body.scrollTop
}

function getDistance (p1, p2) {
  const x = p2.pageX - p1.pageX
  const y = p2.pageY - p1.pageY
  return Math.sqrt((x * x) + (y * y))
}

function resetImg () {
  //   G.canvasContext.clearRect(0, 0, G.img._width, G.img._height)
  //   G.canvasContext.drawImage(G.imgInstance, 0, 0, G.img._width, G.img._height)
  //   const canvasDom = document.getElementById('picture_edit_canvas')
  //   G.canvasContext.clearRect(0, 0, canvasDom.width, canvasDom.height)
  //   G.canvasContext.drawImage(G.imgInstance, 0, 0, canvasDom.width, canvasDom.height)
  G.currentRoatteCnt--
  G.isRotated = !G.isRotated
  rotateCanvas()
}

function getScaleNum (oldTouches, newTouches) {
  const oldLength = getDistance(oldTouches[0], oldTouches[1])
  const newLength = getDistance(newTouches[0], newTouches[1])
  return (newLength / oldLength).toFixed(4)
}

function fixPadding () {
  const heightLess = G.boxSize._height - parseFloat(G.canvas.style.height)
  const widthLess = G.boxSize._width - parseFloat(G.canvas.style.width)
  if (heightLess > 0) {
    G.canvasGrandDom.style.paddingTop = (heightLess / 2).toFixed(4) + 'px'
  } else {
    if (G.canvasGrandDom.style.paddingTop !== '0px') {
      G.canvasGrandDom.style.paddingTop = '0px'
    }
  }
  if (widthLess > 0) {
    G.canvasGrandDom.style.paddingLeft = (widthLess / 2).toFixed(4) + 'px'
  } else {
    if (G.canvasGrandDom.style.paddingLeft !== '0px') {
      G.canvasGrandDom.style.paddingLeft = '0px'
    }
  }
}

// function drawRoundedRect (ctx, x, y, width, height, r, fill, stroke) {
//   ctx.save()
//   ctx.beginPath()
//   ctx.moveTo(x + r, y)
//   ctx.arcTo(x + width, y, x + width, y + r, r)
//   ctx.arcTo(x + width, y + height, x + width - r, y + height, r)
//   ctx.arcTo(x, y + height, x, y + height - r, r)
//   ctx.arcTo(x, y, x + r, y, r)
//   if (fill) {
//     ctx.fill()
//   }
//   if (stroke) {
//     ctx.stroke()
//   }
//   ctx.restore()
// }

function addSaveEvent (dom, cxt, saveFn) {
  // dom.addEventListener('click', function () {
  //   const array = G.inputArray
  //   const padding = getCanvasPadding()
  //   if (array.length > 0) {
  //     for (let i = 0; i < array.length; i++) {
  //       const item = G.inputDomArray[i]
  //       const textScale = getTextScale(item)
  //       // const domLeft = parseFloat(item.style.left) - padding
  //       const domLeft = parseFloat(item.style.left) - padding

  //       const domTop = parseFloat(item.style.top)
  //       // let frontSize = parseFloat(item.style.fontSize) / parseFloat(G.canvas.style.height) * G.img._height
  //       let fontSize = parseFloat(item.style.fontSize)

  //       fontSize *= textScale
  //       // drawRoundedRect(cxt, domLeft * scaleStyle, domTop, parseFloat(item.offsetWidth) * scaleStyle, parseFloat(item.offsetHeight) * scaleStyle, 5 * scaleStyle, true, false)
  //       cxt.fillStyle = 'white'
  //       cxt.fill()
  //       for (let j = 0; j < array[i].length; j++) {
  //         cxt.fillStyle = 'red'
  //         cxt.font = `${fontSize}px helvetica`
  //         // +5是为了修复paddingLeft     *1.4是为了修复line-height
  //         cxt.fillText(array[i][j], (domLeft + 5) * scaleStyle, domTop + ((j) * (parseFloat(item.style.fontSize) * textScale * 1.4)) * scaleStyle + fontSize)
  //         //   cxt.fillText(array[i][j], 0, fontSize)
  //       }
  //     }
  //     // 画完后移除dom元素
  //     clearInputDom()
  //   }
  //   const dataUrl = G.canvas.toDataURL()
  //   saveFn(dataUrl)
  //   G.pictureEditBox.style.display = 'none'
  //   clearInputDom()
  //   G.paintingArray = []
  //   G.editSteps = []
  //   G.operateType = 0
  // }, false)
}

function saveImage (saveFn) {
// const dom = document.getElementById('picture_edit_save')
  const cxt = G.canvasContext
  const array = G.inputArray

  const padding = getCanvasPadding()
  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      const item = G.inputDomArray[i]
      const textScale = getTextScale(item)
      // const domLeft = parseFloat(item.style.left) - padding
      const domLeft = parseFloat(item.style.left) - padding

      const domTop = parseFloat(item.style.top)
      // let frontSize = parseFloat(item.style.fontSize) / parseFloat(G.canvas.style.height) * G.img._height
      let fontSize = parseFloat(item.style.fontSize)

      fontSize *= textScale
      // drawRoundedRect(cxt, domLeft * scaleStyle, domTop, parseFloat(item.offsetWidth) * scaleStyle, parseFloat(item.offsetHeight) * scaleStyle, 5 * scaleStyle, true, false)
      cxt.fillStyle = 'white'
      cxt.fill()
      for (let j = 0; j < array[i].array.length; j++) {
        cxt.fillStyle = array[i].color
        cxt.font = `${fontSize}px helvetica`
        // +5是为了修复paddingLeft     *1.4是为了修复line-height
        cxt.fillText(array[i].array[j], (domLeft + 5) * scaleStyle, domTop + ((j) * (parseFloat(item.style.fontSize) * textScale * 1.4)) * scaleStyle + fontSize)
        //   cxt.fillText(array[i][j], 0, fontSize)
      }
    }
    // 画完后移除dom元素
    clearInputDom()
  }
  const dataUrl = G.canvas.toDataURL()
  saveFn(dataUrl)
  G.pictureEditBox.style.display = 'none'
  clearInputDom()
  G.paintingArray = []
  G.editSteps = []
  G.operateType = 0
}

function addCancelEvent (dom) {
  dom.addEventListener('click', function () {
    G.pictureEditBox.style.display = 'none'
    clearInputDom()
    G.paintingArray = []
    G.editSteps = []
    G.operateType = 0
  }, false)
}

function clearInputDom () {
  G.inputDomArray.forEach(item => {
    item.remove()
  })
  G.inputDomArray = []
  G.inputArray = []
}

function getCanvasPadding () {
  return 0
  // const dom = document.getElementById('picture_edit_canvas')
  // const deviceW = G.device._width
  // let padding = (deviceW - dom.style.width.substring(0, dom.style.width.length - 2)) / 2
  // padding = padding < 0 ? 0 : padding
  // return padding
}

function getTextScale (dom) {
  // eslint-disable-next-line no-useless-escape
  const regex1 = /\([^\)]+\)/g
  let transform = dom.style.transform.match(regex1)
  let scale = 1
  if (transform) {
    transform = transform[0].substring(1, transform[0].length - 1)
    const arr = transform.split(',')
    const [x, y] = arr
    scale = Math.max(x, y)
  }
  return scale
}

// 旋转事件
function rotateCanvas () {
  const canvasDom = document.getElementById('picture_edit_canvas')
  const ctx = G.canvasContext

  const bottomDom = document.getElementById('picture-edit-bottom')
  const bottomHeight = bottomDom.offsetHeight
  const headerDom = document.getElementById('picture-edit-header')
  const headerHeight = headerDom.offsetHeight
  // 等比缩放图片 计算canvas以及图片宽高
  const cw = `${G.device._width}`
  const ch = `${G.device._height - bottomHeight - headerHeight}`
  let w, h
  var w1 = cw
  var h1 = ch
  var w2 = G.img._width
  var h2 = G.img._height
  if (!G.isRotated) { // 旋转 重置canvas宽高
    w2 = G.img._height
    h2 = G.img._width
  }
  if (w1 / h1 > w2 / h2) {
    w = (w2 * h1) / h2
    h = h1
  } else {
    h = (h2 * w1) / w2
    w = w1
  }
  canvasDom.width = w * G.pixelRatio
  canvasDom.height = h * G.pixelRatio
  canvasDom.style.width = `${w}px`
  canvasDom.style.height = `${h}px`
  // 旋转次数 判断角度
  G.currentRoatteCnt++
  const cnt = Number(G.currentRoatteCnt % 4)
  const angel = cnt * 90 * Math.PI / 180

  w = w * G.pixelRatio
  h = h * G.pixelRatio

  // 90 180 270 区别是旋转中心偏移量不同 以及绘制图片宽高
  if (cnt === 1 || cnt === 3 || cnt === 2) {
    ctx.translate(w / 2, h / 2)
    ctx.rotate(angel)
    const offsetX = cnt === 2 ? -w / 2 : -h / 2
    const offsetY = cnt === 2 ? -h / 2 : -w / 2
    const imgW = cnt === 2 ? w : h
    const imgH = cnt === 2 ? h : w
    ctx.drawImage(G.imgInstance, offsetX, offsetY, imgW, imgH)
    ctx.rotate(-angel)
    ctx.translate(-w / 2, -h / 2)
  } else { // 初始状态
    ctx.drawImage(G.imgInstance, 0, 0, w, h)
  }
  G.isRotated = !G.isRotated
}

export { createNode, addScaleEvent, addTextEvent, addOperateEvent, addSaveEvent, addCancelEvent, diffTypeAction, saveImage }
