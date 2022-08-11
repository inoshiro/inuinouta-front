export default ({ store }, inject) => {
  const default_list = new Playlist('default')
  const songs = store.getters['contents/songs']
  const videos = store.getters['contents/videos']

  // 全曲入ったプレイリスト
  default_list.importFromMap(songs)

  store.commit('playlist/setDefault', default_list)
  store.commit('playlist/setPlaying', default_list)

  const original_list = new Playlist('original')
  const video_list = new Playlist('video')
  songs.forEach((value, key, map) => {
    if (value.is_original) {
      original_list.addSong(value)
    }
    const video = videos.get(value.video)
    if (!video.is_stream) {
      video_list.addSong(value)
    }
  })
  store.commit('playlist/setOriginal', original_list)
  store.commit('playlist/setVideo', video_list)

  inject('playlist', {
    setShuffled: () => {
      const playing_list = store.getters['playlist/playing']
      const shuffled = playing_list.exportShuffledList()

      // 再生中の曲を先頭に持ってくる
      const playing_song = store.getters['controller/playing']
      const pausing_song = store.getters['controller/pausing']
      const target = playing_song || pausing_song

      const index = shuffled.findIndex((id) => id == target.id)
      shuffled.splice(index, 1)
      shuffled.unshift(target.id)

      const shuffled_list = new Playlist('shuffled')
      shuffled_list.importFromList(shuffled)
      store.commit('playlist/setShuffled', shuffled_list)
    },
  })
}

class Playlist {
  constructor(name) {
    this.name = name
    this.position = 0
    this.list = []
    this.max_index = 0
  }

  getSong(position = null) {
    if (!position === null) {
      const song_id = this.list[position]
      return store.getters['contents/songs'].get(song_id)
    } else {
      const song_id = this.list[this.position]
      return store.getters['contents/songs'].get(song_id)
    }
  }

  addSong(song) {
    this.list.push(song.id)
    this.max_index++
  }

  importFromMap(map) {
    map.forEach((value, key, map) => {
      this.list.push(key)
    })
    this.max_index = this.list.length - 1
  }

  importFromList(song_list) {
    for (let song_id of song_list) {
      this.list.push(song_id)
      this.max_index++
    }
  }

  exportShuffledList() {
    let shuffled = this.list.slice()
    for (let i = shuffled.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  setPosition(pos) {
    this.position = pos
  }

  backwardPosition() {
    if (this.position === 0) {
      this.position = this.max_index
    } else {
      this.position -= 1
    }
    return this.list[this.position]
  }

  forwardPosition() {
    if (this.position === this.max_index) {
      this.position = 0
    } else {
      this.position += 1
    }
    return this.list[this.position]
  }
}
