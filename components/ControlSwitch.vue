<template>
  <div class="switch-background">
    <div class="switch-area">
    <div class="switch-box">
    <span class="icon" @click="clickSetting"
      ><li class="fa-regular fa-gear"></li>
    </span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickSetting() {
      console.error('clickSetting')
      this.$emit('click-setting')
    },
  },
}
</script>

<style scoped lang="scss" scoped>
.switch-background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}
.switch-area {
  position: relative;
  height: 100%;
  width: 600px;
  margin: auto;
}

.switch-box {
  right: 20px;
  bottom: 100px;
  position: absolute;
}

.icon {
  font-size: 1.5em;
  color: #000;
  width: 2em;
  height: 2em;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  pointer-events: auto;
  cursor: pointer;

  .-active {
    color: #ddd;
  }

}
</style>