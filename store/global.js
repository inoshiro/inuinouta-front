export const state = () => ({
  activeNav: 'default',
  showVideoArea: true,
})

export const mutations = {
  setActiveNav(state, item) {
    state.activeNav = item
  },
  switchVideoArea(state) {
    state.showVideoArea = !state.showVideoArea
  },
}

export const getters = {
  activeNav: (state) => {
    return state.activeNav
  },
  showVideoArea: (state) => {
    return state.showVideoArea
  },
}
