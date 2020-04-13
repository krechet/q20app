const namespaced = true

const state = {
  items: {},
  role: 'player',
  questionsDisabled: false,
  gameStopped: false
}

const getters = {

  getItems: state => {
    return state.items
  },

  getRole: state => {
    return state.role
  }
}

const mutations = {

  changeItems: (state, msg) => {
    state.items = {...state.items, [msg.id]: msg}
  },

  setRole: (state, role) => {
    state.role = role
  },

  disableQuestions: (state) => {
    state.questionsDisabled = true
  },

  stopGame: (state) => {
    state.gameStopped = true
  }

}

const actions = {

  setItems: ({commit}, payload) => {
    commit('changeItems', payload)
  },

  setRole: ({commit}, payload) => {
    if(payload) {
      commit('setRole', payload)
    }
  },

  DISABLE_QUESTIONS: ({commit}) => {
     commit('disableQuestions')
  },

  STOP_GAME: ({commit}) => {
    commit('stopGame')
 }

}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
