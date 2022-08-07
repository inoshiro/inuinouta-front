export const state = () => ({
  player: null,
  pausing: null,
  playing: null,
  playlist_name: null,
})

export const mutations = {
  setPlayer(state, player) {
    state.player = player
  },
  setPausing(state, song) {
    state.pausing = song
  },
  setPlaying(state, song) {
    state.playing = song
  },
  setPlaylistName(state, playlist_name) {
    state.playlist_name = playlist_name
  },
}

export const getters = {
  player(state) {
    return state.player
  },
  playing: (state) => {
    return state.playing
  },
  pausing: (state) => {
    return state.pausing
  },
  playlist_name: (state) => {
    return state.playlist_name
  },
}
