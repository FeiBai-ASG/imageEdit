import drawNormal from '../images/draw-normal.png'
import drawActive from '../images/draw-active.png'
import textActive from '../images/text-active.png'
import textNormal from '../images/text-normal.png'
import rotate from '../images/rotate.png'
import backout from '../images/backout.png'
import empty from '../images/empty.png'
import checked from '../images/checked.png'
import blackChecked from '../images/black-checked.png'

export default {

  actions: [
    {
      text: '画笔',
      src: drawNormal,
      active: drawActive,
      picked: false,
      type: 1
    },
    {
      text: '文字',
      src: textNormal,
      active: textActive,
      picked: false,
      type: 2
    },
    {
      text: '右旋转',
      src: rotate,
      picked: false,
      type: 3
    },
    {
      text: '撤销',
      src: backout,
      picked: false,
      type: 4
    },
    {
      text: '清空',
      src: empty,
      picked: false,
      type: 5
    }

  ],
  colors: [
    {
      color: '#F80E0F',
      picked: true
    },
    {
      color: '#2A82E4',
      picked: false
    },
    {
      color: '#43CF7C',
      picked: false
    },
    {
      color: '#FDEB3B',
      picked: false
    },
    {
      color: '#FF8D1A',
      picked: false
    },
    {
      color: '#7948EA',
      picked: false
    },
    {
      color: '#080808',
      picked: false
    },
    {
      color: '#FFFFFF',
      picked: false
    }
  ],
  icons: {
    checked,
    blackChecked
  }

}
