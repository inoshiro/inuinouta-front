export const state = () => ({
  player: null,
  pausing: null,
  playing: null,
  playlist_name: null,
  repeat_mode: 'off',
  shuffle: false,
  state_changed: false,
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
  setRepeatMode(state, repeat_mode) {
    state.repeat_mode = repeat_mode
  },
  setShuffle(state, shuffle) {
    state.shuffle = shuffle
  },
  setStateChanged(state, state_changed) {
    state.state_changed = state_changed
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
  repeat_mode: (state) => {
    return state.repeat_mode
  },
  shuffle: (state) => {
    return state.shuffle
  },
  state_changed: (state) => {
    return state.state_changed
  },
}
