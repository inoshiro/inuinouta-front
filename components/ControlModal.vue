<template>
  <modal-base @close="$emit('close')">
    <div class="control-line" @click="clickRepeat">
      <span class="icon"
      ><li class="fa-regular" :class="repeatIconClass"></li>
    </span>リピート再生
    </div>
    <div class="control-line" @click="clickShuffle">
      <span class="icon"
        ><li
          class="fa-regular fa-shuffle"
          :class="isShuffle ? '-active' : ''"
        ></li>
      </span>ランダム再生
    </div>
    <div class="control-line" @click="clickScroll">
      <span class="icon"
        ><li class="fa-regular fa-arrows-to-dot -active"></li>
      </span>再生中の曲までスクロール
    </div>
  </modal-base>
</template>

<script>
export default {
  data() {
    return {
      isRepeat: false,
      repeatOnce: false,
    }
  },
  computed: {
    repeatMode() {
      return this.$store.getters['controller/repeat_mode']
    },
    isShuffle() {
      return this.$store.getters['controller/shuffle']
    },
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
    close() {
      this.isShow = false
    },
    
    clickRepeat() {
      this.changeRepeatMode()
    },

    changeRepeatMode() {
      const repeatMode = this.$store.getters['controller/repeat_mode']
      console.log(repeatMode)
      switch (repeatMode) {
        case 'off':
          this.$store.commit('controller/setRepeatMode', 'all')
          this.repeatOnce = false
          this.isRepeat = true
          break
        case 'all':
          this.$store.commit('controller/setRepeatMode', 'once')
          this.repeatOnce = true
          this.isRepeat = true
          break
        case 'once':
          this.$store.commit('controller/setRepeatMode', 'off')
          this.repeatOnce = false
          this.isRepeat = false
          break
      }
    },

    changeRepeatIcon() {
      this.repeatOnce = !this.repeatOnce
    },

    clickShuffle() {
      this.$store.commit('controller/setShuffle', !this.isShuffle)
      if (this.isShuffle) {
        this.$playlist.setShuffled()
        this.$emit('shuffle-on')
      } else {
        this.$emit('shuffle-off')
      }
    },

    clickScroll() {
      this.$utils.scrollToPlayingSong()
    },
  }
}
</script>

<style scoped lang="scss" scoped>

// styles that centering character vertically
.control-line {
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 1em;
  color: #ddd;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
}

.icon {
  font-size: 1.5em;
  color: #666;
  width: 2em;

  .-active {
    color: #ddd;
  }
}
</style>