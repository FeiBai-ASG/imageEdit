<template>
  <div class="bottom-com">
    <div v-show="showColors" class="colors">
      <div v-for="(item, index) in colors" :key="item.color">
        <div
          @click="changeColor(index)"
          class="color"
          :style="{ backgroundColor: item.color }"
        >
          <div v-if="item.picked" class="icon-wrapper">
            <img
              class="icon"
              v-if="item.color === '#FFFFFF'"
              :src="blackChecked"
              alt=""
            />
            <img class="icon" v-else :src="checked" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <div v-for="item in actions" :key="item.text">
        <div class="action" @click="changeAction(item)">
          <div class="img-wrapper">
            <img
              v-if="!item.picked"
              class="action-icon"
              :src="item.src"
              alt=""
            />
            <img v-else class="action-icon" :src="item.active" alt="" />
          </div>
          <div class="action-text">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../utils/index'
import { diffTypeAction } from '../js/Utils'

export default {
  data () {
    return {
      actions: [],
      colors: [],
      blackChecked: '',
      checked: '',
      showColors: false
    }
  },
  methods: {
    changeColor (index) {
      this.colors.forEach((item) => {
        item.picked = false
      })
      this.colors[index].picked = true
      this.$emit('changeColor', {
        color: this.colors[index].color
      })
      this.showColorsCb && this.showColorsCb()
    },
    changeAction (item) {
      const type = Number(item.type)
      if (type === 1) {
        const currStatus = this.actions[0].picked
        if (!currStatus) {
          this.showColorsCom()
          diffTypeAction(1)
          this.actions[1].picked = false
        } else {
          this.hideColorsCom()
          diffTypeAction(0)
        }
        this.actions[0].picked = !currStatus
        this.showColorsCb = null
      } else if (type === 2) {
        const currStatus = this.actions[1].picked
        this.showColorsCom()
        if (!currStatus) {
          this.actions[1].picked = !currStatus
          this.actions[0].picked = false
          this.showColorsCb = () => {
            diffTypeAction(2)
            this.hideColorsCom()
            this.actions[1].picked = false
          }
        } else {
          this.hideColorsCom()
          this.actions[1].picked = false
        }
      } else {
        this.actions[0].picked = false
        this.actions[1].picked = false
        diffTypeAction(type)
        this.showColorsCb = null
      }
    },
    showColorsCb () {
    },
    showColorsCom () {
      this.showColors = true
    },
    hideColorsCom () {
      this.showColors = false
    }
  },
  created () {
    this.actions = utils.actions
    this.colors = utils.colors
    this.checked = utils.icons.checked
    this.blackChecked = utils.icons.blackChecked
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.bottom-com {
  background-color: #000;
  color: #fff;
  font-size: 28px;
  padding: 50px 36px;

  .colors {
    display: flex;
    justify-content: space-between;
  }
  .color {
    width: 64px;
    height: 64px;
    border-radius: 64px;
    box-sizing: border-box;

    border: 2px solid #ffffff;
  }
  .icon-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .icon {
    width: 32px;
    height: 32px;
    margin-top: 16px;
  }
  .img-wrapper {
    display: flex;
    justify-content: center;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 66px;
    padding: 0 22px;
  }
  .action-icon {
    width: 36px;
    height: 36px;
  }
  .action-text {
    margin-top: 9px;
  }
}
</style>
