export const state = () => ({
  activeNav: 'all',
})

export const mutations = {
  setActiveNav(state, item) {
    state.activeNav = item
  },
}

export const getters = {
  activeNav: (state) => {
    return state.activeNav
  },
}
