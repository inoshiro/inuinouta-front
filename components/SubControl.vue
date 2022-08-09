<template>
  <div class="subcontrol">
    <span @click="clickRepeat" class="icon"
      ><li class="fa-regular" :class="repeatIconClass"></li>
    </span>
    <span @click="clickShuffle" class="icon"
      ><li
        class="fa-regular fa-shuffle"
        :class="isShuffle ? '-active' : ''"
      ></li>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repeatMode: 'off',
      isRepeat: false,
      repeatOnce: false,
      isShuffle: false,
    }
  },
  computed: {
    repeatIconClass() {
      let classes = { '-active': this.isRepeat }
      if (this.repeatOnce) {
        classes['fa-repeat'] = false
        classes['fa-repeat-1'] = true
      } else {
        classes['fa-repeat'] = true
        classes['fa-repeat-1'] = false
      }
      return classes
    },
  },
  methods: {
    clickRepeat() {
      this.changeRepeatMode()
    },

    changeRepeatMode() {
      switch (this.repeatMode) {
        case 'off':
          this.repeatMode = 'all'
          this.repeatOnce = false
          this.isRepeat = true
          break
        case 'all':
          this.repeatMode = 'once'
          this.repeatOnce = true
          this.isRepeat = true
          break
        case 'once':
          this.repeatMode = 'off'
          this.repeatOnce = false
          this.isRepeat = false
          break
      }
    },

    changeRepeatIcon() {
      this.repeatOnce = !this.repeatOnce
    },

    clickShuffle() {
      this.isShuffle = !this.isShuffle
    },
  },
}
</script>

<style lang="scss" scoped>
.subcontrol {
  display: flex;
  align-items: center;
  padding: 0px 10px;
  height: 50px;
  background-color: #333;
}
.icon {
  font-size: 1.5em;
  color: #666;
  width: 2em;

  .-active {
    color: #ddd;
  }
}

.subcontrol-enter,
.subcontrol-leave-to {
  transform: translateY(100%);
}
.subcontrol-enter-active {
  transition: all 0.3s ease;
}
.subcontrol-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>
