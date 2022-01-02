<template>
  <div class="contents">
    <ul>
      <li v-for="song in songs.values()" :key="song.id">
        <div class="song-outer">
          <div class="song_thumb">
            <img :src="getVideo(song.video).thumbnail_path" />
          </div>
          <div class="song_info">
            <div class="song_title">{{ song.title }}</div>
            <div class="song_artist">{{ song.artist }}</div>
          </div>
          <div class="song_add">
            <span class="icon">
              <li class="far fa-plus"></li>
            </span>
          </div>
          <div class="song_menu">
            <span class="icon">
              <li class="far fa-ellipsis-h"></li>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    songs() {
      console.log(this.$store.getters['contents/songs'].values())
      return this.$store.getters['contents/songs']
    },
  },
  methods: {
    getVideo(id) {
      return this.$store.getters['contents/videos'].get(id)
    },
  },
}
</script>

<style lang="scss" scoped>
.contents {
  padding-top: 40px;
  background-color: #000;
}
.song-outer {
  height: 50px;
  display: flex;
  align-items: center;

  .song_thumb {
    width: 70px;
    padding: 2px 10px;

    img {
      border: 1px solid #999;
      display: block;
      position: unset;
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
