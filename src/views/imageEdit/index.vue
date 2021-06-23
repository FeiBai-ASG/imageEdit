<!--  -->
<template>
  <div class="image-edit">
    <div>
      <img :src="base64Img" alt="" />
    </div>

    <div class="contanier">
    <button @click="changeColor">changeColor</button>

      <div class="header clearfix">
        <button class="float-l btn-normal" id="picture_edit_cancel">
          取消
        </button>
        <button class="float-r btn-normal" id="picture_edit_save">保存</button>
      </div>

      <div class="content">
        <div style="position: relative">
          <canvas
            id="picture_edit_canvas"
            :style="{ width: w + 'px', height: h + 'px' }"
          ></canvas>
        </div>
      </div>

      <div class="bottom">
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

      </div>
      <div
        id="picture_edit_text"
        style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 2;
          display: none;
          background-color: white;
          opacity: 0.93;
        "
      ></div>
      <div
        id="picture_edit_input"
        contenteditable="true"
        tabindex="1"
        style="
          min-height: 15%;
          border-radius: 5px;
          border: 2px solid #63eca1;
          outline: none;
          width: 96%;
          box-sizing: border-box;
          position: absolute;
          top: 8%;
          left: 2%;
          right: 2%;
          display: none;
          z-index: 2;
          padding: 3px 5px;
        "
      ></div>
    </div>
  </div>
</template>

<script>
import ped from './js/index'

export default {
  components: {},
  data () {
    return {
      temp: '',
      instance: null,
      cw: '',
      ch: '',
      w: '',
      h: '',
      base64Img: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    initCanvas () {
      const G = ped.pedGlobal

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

    changeColor () {
      const G = ped.pedGlobal
      console.log(G)
      G.currentColor = 'yellow'
    }
  },
  created () {},
  mounted () {
    const that = this
    const instance = new ped.ImageInfo({
      //   url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1729868871,2742990556&fm=26&gp=0.jpg',
      url: 'https://img2.baidu.com/it/u=3143062240,797042467&fm=26&fmt=auto&gp=0.jpg',
      saveFn (res) {
        console.log('save')
        console.log(res)
        that.base64Img = res
      },
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
    background-color: white;
  }

  .float-l {
    float: left;
  }
  .float-r {
    float: right;
  }
  .btn-normal {
    width: 100px;
    height: 30px;
    background-color: #fff;
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
}
</style>
