<template>
  <div class="body">
    <navigation-menu @click-nav="changePlaylist" />
    <div class="contents">
      <control-switch @click-setting="switchControlModal"></control-switch>
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
                @playing="syncPlaying"
                @paused="syncPaused"
                ref="youtube"
              />
            </div>
            <div
              id="show-hide-bar-open"
              class="show-hide"
              @click="showHideVideo"
            >
              <span>{{ showHideMark }}</span>
            </div>
          </div>
        </transition>
        <div
          id="show-hide-bar-close"
          class="show-hide"
          v-if="displayShowHide"
          @click="showHideVideo"
        >
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
        @shuffle-on="shufflePlaylist"
        @shuffle-off="restorePlaylist"
      />
    </div>
    <control-modal
      v-show="displayControlModal"
      @close="switchControlModal"
      @shuffle-on="shufflePlaylist"
      @shuffle-off="restorePlaylist"
    ></control-modal>
  </div>
</template>

<script>
import NavigationMenu from './navigation/Menu.vue'
import SongList from './SongList.vue'
import Control from './Control.vue'
import ControlModal from './ControlModal.vue'
export default {
  components: { NavigationMenu, SongList, Control },
  data() {
    return {
      displayVideo: true,
      displayShowHide: false,
      displayControlModal: false,
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
    switchControlModal() {
      console.error('switchControlModal')
      this.displayControlModal = !this.displayControlModal
    },
    showHideVideo() {
      this.displayVideo = !this.displayVideo
      this.$store.commit('global/switchVideoArea')
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
      this.playlist = list
      this.$store.commit('playlist/setPlaying', list)
      this.$store.commit('controller/setShuffle', false)
    },
    // 現在のプレイリストをシャッフルする
    shufflePlaylist() {
      const list = this.$store.getters['playlist/shuffled']
      this.$store.commit('playlist/setPlaying', list)
    },
    // 選択中のプレイリストに復帰する
    restorePlaylist() {
      const playlist_name = this.$store.getters['global/activeNav']
      this.changePlaylist(playlist_name)

      // 再生中の曲とプレイリストのポジションを同期する
      const playing = this.$store.getters['controller/playing']
      if (playing) {
        this.$store.commit('playlist/setPositionById', playing.id)
      }
    },
    // プレイヤーが再生を開始した時
    syncPlaying() {
      const state_changed = this.$store.getters['controller/state_changed']
      if (state_changed) {
        this.$store.commit('controller/setStateChanged', false)
        return
      }
      const pausing = this.$store.getters['controller/pausing']
      if (!pausing) {
        return
      }
      const song = this.$store.getters['contents/songs'].get(pausing.id)
      this.$store.commit('controller/setPlaying', song)
      this.$store.commit('controller/setPausing', null)
    },
    // プレイヤーが停止した時
    syncPaused() {
      const state_changed = this.$store.getters['controller/state_changed']
      if (state_changed) {
        this.$store.commit('controller/setStateChanged', false)
        return
      }
      const playing = this.$store.getters['controller/playing']
      if (!playing) {
        return
      }
      const song = this.$store.getters['contents/songs'].get(playing.id)
      this.$store.commit('controller/setPlaying', null)
      this.$store.commit('controller/setPausing', song)
    },
  },
  mounted() {
    this.$store.commit('controller/setPlayer', this.$refs.youtube.player)

    // デフォルトプレイリストの先頭の曲を停止中に設定
    this.playlist = this.$store.getters['playlist/default']
    const initial_song_id = this.playlist.list[0]
    const initial_song =
      this.$store.getters['contents/songs'].get(initial_song_id)
    this.$store.commit('controller/setPausing', initial_song)

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
  max-width: 600px;
  margin: 0 auto;
  position: relative;
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
