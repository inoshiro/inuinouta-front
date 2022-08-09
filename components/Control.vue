<template>
  <div class="control-wrapper">
    <transition name="subcontrol">
      <SubControl v-show="displaySubControl"></SubControl>
    </transition>
    <div v-if="song" class="control">
      <div @click="switchSubControl" class="control-left">
        <div class="please-tap-here">
          <span @click="clickNext" class="icon"
            ><li class="fa-solid fa-chevron-up"></li>
          </span>
        </div>
        <div class="song_thumb">
          <img :src="video.thumbnail_path" />
        </div>
        <div class="song_info">
          <div class="song_info_inner">
            <div class="song_title">{{ song.title }}</div>
            <div class="song_artist">{{ song.artist }}</div>
          </div>
        </div>
      </div>
      <div class="control-middle">
        <span @click="clickPrev" class="icon">
          <li class="fa-thin fa-backward-step"></li
        ></span>
        <span @click="clickPlayOrPause" class="icon">
          <li v-if="playing" class="fa-thin fa-pause"></li>
          <li v-else class="fa-thin fa-play"></li>
        </span>
        <span @click="clickNext" class="icon"
          ><li class="fa-thin fa-forward-step"></li>
        </span>
      </div>
      <div class="control-right"></div>
    </div>
  </div>
</template>

<script>
import SubControl from './SubControl.vue'
export default {
  components: { SubControl },
  data() {
    return {
      displaySubControl: false,
    }
  },
  computed: {
    song() {
      return (
        this.$store.getters['controller/playing'] ||
        this.$store.getters['controller/pausing']
      )
    },
    video() {
      return this.$store.getters['contents/videos'].get(this.song.video)
    },
    playing() {
      return this.$store.getters['controller/playing']
    },
  },
  methods: {
    clickPrev() {
      this.$emit('prev')
    },
    clickPlayOrPause() {
      this.$emit('play-or-pause')
    },
    clickNext() {
      this.$emit('next')
    },
    switchSubControl() {
      this.displaySubControl = !this.displaySubControl
    },
  },
}
</script>

<style lang="scss" scoped>
.control-wrapper {
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-width: 800px;
  z-index: 2;
}
.control {
  background-color: rgb(30, 30, 30);
  border-top: 1px solid #999;
  display: flex;
  padding: 5px 10px 15px 3px;
  width: 100%;
  height: 80px;

  .control-left {
    flex: 1;
    min-width: 220px;
    display: flex;
    position: relative;

    .please-tap-here {
      position: absolute;
      display: flex;
      justify-content: center;
      height: 100%;
      width: 100%;

      .icon {
        font-size: 1.3em;
        color: #555;
        margin-top: -5px;
      }
    }

    .song_thumb {
      display: flex;
      align-items: center;
      width: 70px;
      min-width: 70px;
      padding: 3px 8px;
      z-index: 1;

      img {
        top: auto;
        bottom: auto;
        border: 1px solid #999;
        display: block;
        position: unset;
      }
    }

    @media (max-width: 370px) {
      .song_thumb {
        display: none;
      }
    }

    .song_info {
      display: flex;
      align-items: center;
      z-index: 1;

      min-width: 100px;
      padding-left: 5px;
      padding-right: 5px;
    }

    .song_info_inner {
      flex: auto;
      width: 100%;
    }

    .song_title {
      width: 100%;
      text-align: left;
      font-size: 0.9rem;
      color: #dfdfdf;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .song_artist {
      width: 100%;
      text-align: left;
      font-size: 0.8rem;
      color: #999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  @media (max-width: 370px) {
    .control-left {
      min-width: 170px;
    }
  }

  .control-middle {
    flex: none;
    display: flex;
    align-items: center;

    .icon {
      color: #ccc;
      font-size: 1.8em;
      height: 2rem;
      width: 3rem;
    }
  }

  .control-right {
    flex: auto;
    min-width: 0px;
  }
}
</style>
