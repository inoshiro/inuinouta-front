<template>
  <div class="body">
    <navigation-menu @click-nav="changePlaylist" />
    <div class="contents">
      <div class="playarea">
        <transition
          name="player"
          @enter="switchDisplayShowHide"
          @after-leave="switchDisplayShowHide"
        >
          <div v-show="displayVideo">
            <div class="yt-container">
              <youtube
                :player-vars="playerVars"
                :width="playerSize.width"
                :height="playerSize.height"
                :video-id="$init_video.id"
                ref="youtube"
              />
            </div>
            <div class="show-hide" @click="showHideVideo">
              <span>{{ showHideMark }}</span>
            </div>
          </div>
        </transition>
        <div class="show-hide" v-if="displayShowHide" @click="showHideVideo">
          <span>{{ showHideMark }}</span>
        </div>
      </div>
      <div class="listarea">
        <song-list :playlist="playlist" />
      </div>
      <Control
        @prev="$controller.prev"
        @play-or-pause="playOrPause"
        @next="$controller.next"
      />
    </div>
  </div>
</template>

<script>
import NavigationMenu from './navigation/Menu.vue'
import SongList from './SongList.vue'
import Control from './Control.vue'
export default {
  components: { NavigationMenu, SongList, Control },
  data() {
    return {
      displayVideo: false,
      displayShowHide: true,
      playlist: null,
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    },
    playerSize() {
      return { width: '100%', height: '100%' }
    },
    playerVars() {
      return {
        autoplay: 0,
        controls: 1,
        playsinline: 1,
      }
    },
    showHideMark() {
      return this.displayVideo ? '▲' : '▼'
    },
  },
  methods: {
    showHideVideo() {
      this.displayVideo = !this.displayVideo
    },
    switchDisplayShowHide() {
      this.displayShowHide = !this.displayShowHide
    },
    playOrPause() {
      const selected_song =
        this.$store.getters['controller/playing'] ||
        this.$store.getters['controller/pausing']
      if (!selected_song) {
        const song_id = this.playlist.list[0]
        this.$controller.play_or_pause(
          this.$store.getters['contents/songs'].get(song_id),
          0
        )
        return
      }
      const position = this.$store.getters['playlist/position']
      this.$controller.play_or_pause(selected_song, position)
    },
    changePlaylist(name) {
      const list = this.$store.getters['playlist/' + name]
      console.log(list)
      this.playlist = list
      this.$store.commit('playlist/setPlaying', list)
    },
  },
  mounted() {
    this.$store.commit('controller/setPlayer', this.$refs.youtube.player)
    this.playlist = this.$store.getters['playlist/default']

    this.$nuxt.$on('click-song', (song, pos) => {
      this.$controller.play_or_pause(song, pos)
    })

    setInterval(this.$controller.autoJump, 1000)
  },
}
</script>

<style lang="scss" scoped>
.body {
  padding-top: 45px;
  max-width: 800px;
  margin: 0 auto;
}
.contents {
  margin-top: 40px;
}
.playarea {
  position: sticky;
  max-width: 800px;
  inset: 0;
  top: 85px;
  margin: 0px auto;
  z-index: 1;
}

.player-enter,
.player-leave-to {
  transform: translateY(-100%) translateY(30px);
}
.player-enter-active {
  transition: all 0.5s ease;
}
.player-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.show-hide {
  height: 30px;
  background-color: rgb(37, 37, 37);
  padding-bottom: 5px;
  text-align: center;
  color: rgb(219, 219, 219);
  cursor: pointer;
}
.yt-container {
  aspect-ratio: 16/9;
  background-color: #000;
  margin-bottom: -6px;

  iframe {
    aspect-ratio: 16/9;
  }
}
</style>
