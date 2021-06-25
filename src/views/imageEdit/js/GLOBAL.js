export const pedGlobal = {
  img: {
    _width: 0,
    _height: 0,
    _WH: 0,
    _HW: 0
  },
  device: {
    _width: 0,
    _height: 0
  },
  boxSize: {
    _width: 0,
    _height: 0
  },
  operateType: 0, // 0: 什么都不做  1:涂画  2:输入文字  3:撤回  4:清空
  imgInstance: null,
  canvas: {},
  textBox: {},
  textInput: {},
  textOperateIndex: 0,
  textIndex: 0,
  inputArray: [],
  inputDomArray: [],
  canvasParentDom: null,
  canvasGrandDom: null,
  pictureEditBox: null,
  canvasContext: {},
  paintingArray: [],
  currentColor: 'red',
  currentRoatteCnt: 0,
  isRotated: false,
  editSteps: [],
  lineWidth: 5
}

export function changeOperate (type) {
  pedGlobal.operateType = type
}

export function setCanvas (canvas, textBox, textInput) {
  pedGlobal.canvas = canvas
  pedGlobal.canvasParentDom = canvas.parentElement
  pedGlobal.canvasGrandDom = canvas.parentElement.parentElement
  pedGlobal.canvasContext = canvas.getContext('2d')
  pedGlobal.textBox = textBox
  pedGlobal.pictureEditBox = textBox.parentElement
  pedGlobal.textInput = textInput

  pedGlobal.boxSize._height = pedGlobal.canvasGrandDom.offsetHeight
  pedGlobal.boxSize._width = pedGlobal.canvasGrandDom.offsetWidth
}
