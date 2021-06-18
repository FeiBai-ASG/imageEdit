<!--  -->
<template>
  <div class="image-edit">
    <div class="contanier">
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
            width="821"
            height="1024"
            :style="{ width: cw, height: ch }"
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
      ch: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    initCanvas () {
      const G = ped.pedGlobal
      this.cw = `${G.device._width + 'px'}`
      this.ch = `${Math.floor(G.device._width * G.img._WH) + 'px'}`
    },
    init () {
      this.$nextTick(() => {
        this.instance.loadImg()
      })
    }
  },
  created () {},
  mounted () {
    const that = this
    const instance = new ped.ImageInfo({
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1729868871,2742990556&fm=26&gp=0.jpg',
      saveFn () {
        console.log('save')
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
    width: 200px;
    height: 100px;
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
    padding-top: 100px;
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
