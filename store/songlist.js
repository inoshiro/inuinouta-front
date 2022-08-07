export const state = () => ({
  activeId: null,
})

export const mutations = {
  setActiveId(state, id) {
    state.activeId = id
  },
}

export const getters = {
  activeId: (state) => {
    return state.activeId
  },
}
