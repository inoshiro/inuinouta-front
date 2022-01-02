export const state = () => ({
  videos: new Map(),
  songs: new Map(),
})

export const mutations = {
  setVideos(state, videos) {
    for (const video of videos) {
      state.videos.set(video.id, video)
    }
  },
  setSongs(state, songs) {
    for (const song of songs) {
      state.songs.set(song.id, song)
    }
  },
}

export const getters = {
  videos: (state) => {
    return state.videos
  },
  songs: (state) => {
    return state.songs
  },
}
