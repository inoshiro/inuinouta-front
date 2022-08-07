<template>
  <div v-if="song" class="control">
    <div class="control-left">
      <div class="song_thumb">
        <img :src="video.thumbnail_path" />
      </div>
      <div class="song_info">
        <div class="song_title">{{ song.title }}</div>
        <div class="song_artist">{{ song.artist }}</div>
      </div>
    </div>
    <div class="control-middle">
      <span @click="clickPrev"><<</span> /
      <span @click="clickPlayOrPause">▶</span> /
      <span @click="clickNext">>></span>
    </div>
    <div class="control-right"></div>
  </div>
</template>

<script>
export default {
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
  },
  mounted() {
    console.log('@@@ mounted', this.$store.getters['controller/playing'])
  },
}
</script>

<style lang="scss" scoped>
.control {
  background-color: rgb(15, 15, 15);
  position: fixed;
  border-top: 1px solid #999;
  display: flex;
  width: 100%;
  max-width: 800px;
  bottom: 0px;
  padding: 5px 3px;
  z-index: 2;

  .control-left {
    flex: 1;
    min-width: 0px;
    display: flex;

    .song_thumb {
      width: 70px;
      min-width: 70px;
      padding: 3px 8px;

      img {
        border: 1px solid #999;
        display: block;
        position: unset;
      }
    }

    .song_info {
      min-width: 100px;
      padding-left: 3px;
      padding-right: 10px;
    }

    .song_title {
      font-size: 0.8rem;
      color: #dfdfdf;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .song_artist {
      font-size: 0.7rem;
      color: #999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .control-middle {
    flex-basis: 100px;
  }

  .control-right {
    flex: 0;
    min-width: 0px;
  }
}
</style>
