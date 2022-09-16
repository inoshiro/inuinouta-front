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
    <span @click="clickScroll" class="icon"
      ><li class="fa-regular fa-arrows-to-dot -active"></li>
    </span>
  </div>
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
