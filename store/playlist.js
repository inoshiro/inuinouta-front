export const state = () => ({
  playing: null,
  default: null,
  original: null,
  shuffled: null,
  video: null,
})

export const mutations = {
  setPlaying(state, playlist) {
    state.playing = playlist
  },
  setDefault(state, playlist) {
    state.default = playlist
  },
  setOriginal(state, playlist) {
    state.original = playlist
  },
  setVideo(state, playlist) {
    state.video = playlist
  },
  setShuffled(state, playlist) {
    state.shuffled = playlist
  },
  backward(state) {
    state.playing.backwardPosition()
  },
  forward(state) {
    state.playing.forwardPosition()
  },
  setPosition(state, position) {
    state.playing.setPosition(position)
  },
}

export const getters = {
  playing: (state) => {
    return state.playing
  },
  default: (state) => {
    return state.default
  },
  original: (state) => {
    return state.original
  },
  shuffled: (state) => {
    return state.shuffled
  },
  video: (state) => {
    return state.video
  },
  position: (state) => {
    return state.playing.position
  },
}
