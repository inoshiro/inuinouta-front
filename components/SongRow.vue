<template>
  <div v-if="song">
    <div
      class="song-outer"
      :class="isSelected ? '-active' : ''"
      :id="'song-row-' + position"
    >
      <div @click="clickSong" class="song_thumb">
        <img :src="video.thumbnail_path" />
      </div>
      <div class="song_playing" v-if="isPlaying">
        <div class="playing-image"></div>
      </div>
      <div class="song_playing" v-if="isPausing">
        <div class="pausing-image">
          <i class="fa-solid fa-pause"></i>
        </div>
      </div>
      <div @click="clickSong" class="song_info">
        <div class="song_title">{{ song.title }}</div>
        <div class="song_artist">{{ song.artist }}</div>
      </div>
      <div class="song_add">
        <span @click="clickAdd" class="icon">
          <li class="far fa-plus"></li>
        </span>
      </div>
      <div class="song_menu">
        <span @click="clickMenu" class="icon">
          <li class="far fa-ellipsis-h"></li>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    song_id: {
      type: Number,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      song: null,
    }
  },
  computed: {
    isSelected() {
      return this.isPlaying || this.isPausing
    },
    isPlaying() {
      return this.song === this.$store.getters['controller/playing']
    },
    isPausing() {
      return this.song === this.$store.getters['controller/pausing']
    },
    video() {
      return this.$store.getters['contents/videos'].get(this.song.video)
    },
  },
  methods: {
    clickSong() {
      this.$nuxt.$emit('click-song', this.song, this.position)
    },
    clickAdd() {
      console.log('add')
    },
    clickMenu() {
      console.log('menu')
    },
  },
  mounted() {
    this.song = this.$store.getters['contents/songs'].get(this.song_id)
  },
}
</script>

<style lang="scss" scoped>
.song-outer {
  height: 50px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #151515;
  }

  &.-active {
    background-color: #333;
  }

  .song_thumb {
    width: 70px;
    padding: 2px 10px;

    img {
      border: 1px solid #999;
      display: block;
      position: unset;
    }
  }

  .song_playing {
    margin: auto 10px auto -59px;
    width: 48px;
    height: 27px;
    padding: 5px;
    background-color: #000;
    opacity: 0.7;

    .playing-image {
      height: 100%;
      background-image: url(https://inuinouta.s3.ap-northeast-1.amazonaws.com/images/equalizer.svg);
      background-size: cover;
    }

    .pausing-image {
      height: 100%;
      color: #fff;
      display: -webkit-box;
      i {
        display: block;
        margin: auto;
      }
    }
  }
  .song_info {
    padding-left: 5px;
    width: calc(100% - 150px);
  }

  .song_title {
    flex: auto;
    font-size: 0.9rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #dfdfdf;
  }

  .song_artist {
    flex: auto;
    font-size: 0.7rem;
    color: #999;
  }

  .song_add {
    flex: auto;
    width: 40px;

    .fa-plus {
      color: #dfdfdf;
    }
  }

  .song_menu {
    flex: auto;
    width: 40px;

    .fa-ellipsis-h {
      color: #dfdfdf;
    }
  }
}
</style>
