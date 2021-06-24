<!--  -->
<template>
  <div class="image-edit">
    <!-- <div>
      <img :src="base64Img" alt="" />
    </div> -->

    <div class="contanier">
      <div class="header clearfix">
        <span @click="cancel" class="float-l btn-normal" id="picture_edit_cancel"> 取消 </span>
        <span @click="save" class="float-r btn-normal" id="picture_edit_save">保存</span>
      </div>

      <div class="content">
        <div style="position: relative;display:flex;justify-content:center">
          <canvas
            id="picture_edit_canvas"
            :style="{ width: w + 'px', height: h + 'px' }"
          ></canvas>
        </div>
      </div>

      <div class="bottom-area">
        <BottomCom @changeColor="changeColor"></BottomCom>
      </div>
      <!-- <div class="bottom" style="display: none">
        <div
          style="flex: 1; padding-top: 1rem"
          class="picture-operate"
          operate="1"
        >
          <img
            src="@/assets/image/painting.png"
            style="width: 1.3rem; display: block; margin: auto"
          />涂画
        </div>
        <div
          style="flex: 1; padding-top: 1rem"
          class="picture-operate"
          operate="2"
        >
          <img
            src="@/assets/image/text.png"
            style="width: 1.3rem; display: block; margin: auto"
          />
          文字
        </div>

        <div
          style="flex: 1; padding-top: 1rem"
          class="picture-operate"
          operate="3"
        >
          <img
            src="@/assets/image/withdraw.png"
            style="width: 1.3rem; display: block; margin: auto"
          />
          撤回
        </div>
        <div
          style="flex: 1; padding-top: 1rem"
          class="picture-operate"
          operate="4"
        >
          <img
            src="@/assets/image/empty.png"
            style="width: 1.3rem; display: block; margin: auto"
          />
          清空
        </div>

        <div class="picture-operate" operate="5">旋转</div>
      </div> -->
      <div id="picture_edit_text" class="edit-text"></div>
      <div
        id="picture_edit_input"
        contenteditable="true"
        class="edit-text-input"
        :style="{color: G.currentColor}"
      ></div>
    </div>
  </div>
</template>

<script>
import ped from './js/index'
import util from './utils/index'
import BottomCom from './components/bottom.vue'

import { saveImage } from './js/Utils'

export default {
  components: {
    BottomCom
  },
  data () {
    return {
      temp: '',
      instance: null,
      cw: '',
      ch: '',
      w: '',
      h: '',
      base64Img: '',
      actionList: [],
      G: {
        currentColor: 'red'
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    initCanvas () {
      const G = ped.pedGlobal
      this.G = G

      this.cw = `${G.device._width}`
      // this.ch = `${Math.min(Math.floor(G.device._width * G.img._WH), G.device._height)}`
      this.ch = `${G.device._height - 200 - 30}`

      let w, h
      var w1 = this.cw
      var h1 = this.ch
      var w2 = G.img._width
      var h2 = G.img._height
      if (w1 / h1 > w2 / h2) {
        w = (w2 * h1) / h2
        h = h1
      } else {
        h = (h2 * w1) / w2
        w = w1
      }
      console.log(w, h)
      this.w = w
      this.h = h
      // this.w = G.img._width;
      // this.h = G.img._height - 200;
    },
    init () {
      this.$nextTick(() => {
        const cnavasDom = document.getElementById('picture_edit_canvas')
        cnavasDom.width = this.w
        cnavasDom.height = this.h
        console.log(cnavasDom)

        this.instance.loadImg()
      })
    },

    changeColor (data) {
      const G = ped.pedGlobal
      console.log(G)
      console.log(data.color)
      G.currentColor = data.color
    },

    save () {
      saveImage(this.saveCb)
    },
    saveCb (res) {
      console.log('saveCb', res)
      this.wx.miniProgram.postMessage({
        data: {
          after: res
        }
      })
      this.wx.miniProgram.navigateBack({
        delta: 1
      })
    },

    cancel () {
      this.wx.miniProgram.navigateBack({
        delta: 1
      })
    }
  },
  created () {},
  mounted () {
    console.log('Base64', this.Base64)
    console.log(this.$route.query.src)

    const imageSrc = this.Base64.decode(this.$route.query.src)
    console.log(imageSrc)
    console.log(util)
    this.actionList = util.action
    const that = this
    const instance = new ped.ImageInfo({
      //   url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1729868871,2742990556&fm=26&gp=0.jpg',
      // url: 'https://img2.baidu.com/it/u=3143062240,797042467&fm=26&fmt=auto&gp=0.jpg',
      url: imageSrc,
      // saveFn (res) {
      //   console.log('save')
      //   console.log(res)
      //   console.log(that.wx)

      //   that.base64Img = res
      // },
      loaded () {
        console.log('loaded')
        that.initCanvas()
        that.init()
      }
    })
    this.instance = instance
  }
}
</script>
<style lang='less' scoped>
.image-edit {
  .contanier {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 997;
    background-color: #000;
  }
  .header {
    font-size: 32px;
    color: #fff;
    height: 100px;
    box-sizing: border-box;
    padding: 0 26px;
    line-height: 100px;
  }
  .float-l {
    float: left;
  }
  .float-r {
    float: right;
  }
  .btn-normal {
    font-size: 32px;
    color: #fff;
  }
  .clearfix {
    content: "";
    display: block;
    clear: both;
  }

  .content {
    width: 100%;
    height: calc(100% - 6rem);
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    // overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    // padding-top: 100px;
  }

  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 6rem;
    background-color: black;
    display: flex;
    text-align: center;
    color: white;
  }
  .bottom-area {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .edit-text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 2;
    display: none;
    background-color: rgba(45, 43, 43, 0.62);
  }
  .edit-text-input {
    width: 538px;
    // height: 208px;
    border: 2px solid #ffffff;
    min-height: 208px;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
    position: absolute;
    top: 242px;
    left: 106px;
    right: 106px;
    display: none;
    z-index: 2;
    padding: 24px 52px;
    color: #f80e0f;
    font-size: 52px;
  }
  .delete-icon {
    width: 36px;
    height: 36px;
    position: absolute;
    top: -15px;
    left: -15px;
  }
}
</style>
