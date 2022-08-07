export default ({ app, store }, inject) => {
  inject('controller', {
    play_or_pause: (song, position) => {
      const playing = store.getters['controller/playing']
      const pausing = store.getters['controller/pausing']

      // 再生中の曲
      if (song == playing) {
        getPlayer().pauseVideo()
        store.commit('controller/setPlaying', null)
        store.commit('controller/setPausing', song)
        return
      }

      // 停止中の曲
      if (song == pausing) {
        getPlayer().playVideo()
        store.commit('controller/setPlaying', song)
        store.commit('controller/setPausing', null)
        return
      }

      // 異なる曲
      store.commit('playlist/setPosition', position)
      app.$controller.play(playing, song)
    },

    play: (song_playing, song_requested) => {
      const video_id = song_playing ? song_playing.video : null

      if (video_id !== song_requested.video) {
        getPlayer().loadVideoById(song_requested.video, song_requested.start_at)
      } else {
        getPlayer().seekTo(song_requested.start_at)
        getPlayer().playVideo()
      }
      store.commit('controller/setPlaying', song_requested)
      store.commit('controller/setPausing', null)

      // スクロール
      // const position = app.$controller.getPosition()
      // const tag_id = 'song-row-' + position
      // const element = document.getElementById(tag_id)
      // if (element) {
      //   element.scrollIntoView({ behavior: 'smooth', block: 'end' })
      // }
    },

    getPosition: () => {
      const position = store.getters['playlist/position'] + 7
      const max = store.getters['playlist/playing'].max_index
      if (position > max) {
        return max
      }
      return position
    },

    prev: () => {
      const playlist = store.getters['playlist/playing']

      let song_playing
      if (store.getters['controller/playing'] === null) {
        song_playing = store.getters['contents/songs'].get(playlist.list[0])
      } else {
        song_playing = store.getters['controller/playing']
      }

      // リストに1曲しかない場合
      if (playlist.list.length === 1) {
        app.$controller.play(song_playing, song_playing)
        return
      }

      store.commit('playlist/backward')
      const song_id_prev = playlist.list[playlist.position]
      const song_prev = store.getters['contents/songs'].get(song_id_prev)

      app.$controller.play(song_playing, song_prev)
    },

    next: () => {
      const playlist = store.getters['playlist/playing']

      let song_playing
      if (store.getters['controller/playing'] === null) {
        song_playing = store.getters['contents/songs'].get(playlist.list[0])
      } else {
        song_playing = store.getters['controller/playing']
      }

      // リストに1曲しかない場合
      if (playlist.list.length === 1) {
        app.$controller.play(song_playing, song_playing)
        return
      }

      store.commit('playlist/forward')
      const song_id_next = playlist.list[playlist.position]
      const song_next = store.getters['contents/songs'].get(song_id_next)

      app.$controller.play(song_playing, song_next)
    },

    autoJump: async () => {
      const song = store.getters['controller/playing']
      if (!song) {
        return
      }
      const end_time = await getPlayer().getCurrentTime()
      if (Math.ceil(end_time) == song.end_at) {
        app.$controller.next()
      }
    },
  })

  function getPlayer() {
    return store.getters['controller/player']
  }
}
