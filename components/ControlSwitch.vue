<template>
  <div class="switch-background">
    <div class="switch-area">
      <div class="switch-box">
        <div class="icon-outer">
          <span class="icon" @click="clickSetting"
          ><li class="fa-regular fa-gear"></li>
          </span>
        </div>
        <div class="icon-outer">
          <span class="icon" @click="switchSearchBox"
            ><li class="fa-regular fa-magnifying-glass"></li>
          </span>
        </div>
      </div>
      <transition name="fade">
        <div class="search-box" v-show="displaySearchBox">
          <input v-model="keyword" type="text" placeholder="曲名・アーティスト名" ref="keyword" enterkeyhint="done" v-on:keydown.enter="onEnter" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displaySearchBox: false,
      keyword: '',
    }
  },
  methods: {
    clickSetting() {
      this.$emit('click-setting')
    },
    async switchSearchBox() {
      this.displaySearchBox = !this.displaySearchBox
      await this.$nextTick()
      this.$refs.keyword.focus()
    },
    onEnter() {
      this.$refs.keyword.blur()
    }
  },
  watch: {
    keyword() {
      this.$emit('search', this.keyword)
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
  max-width: 600px;
  margin: auto;
}

.switch-box {
  right: 20px;
  bottom: 100px;
  position: absolute;
}

.search-box {
  right: 80px;
  bottom: 105px;
  position: absolute;
  pointer-events: auto;

  input {
    border: none;
    border-radius: 20px;
    font-size: 1.3em;
    padding: 5px 15px;
    background-color: rgba(255, 255, 255, 0.85);
  }
}

.icon-outer {
  margin-top: 10px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>