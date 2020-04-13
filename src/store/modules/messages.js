const namespaced = true

const state = {
    items: {},
    role: 'player',
    word: null,
    questionsDisabled: false,
    gameStopped: false
}

const mutations = {

    changeItems: (state, msg) => {
        state.items = {
            ...state.items,
            [msg.id]: msg
        }
    },

    setRole: (state, role) => {
        state.role = role
    },

    setWord: (state, word) => {
        state.word = word
    },

    disableQuestions: (state) => {
        state.questionsDisabled = true
    },

    stopGame: (state) => {
        state.gameStopped = true
    }

}

const actions = {

    setItems: ({
        commit
    }, payload) => {
        commit('changeItems', payload)
    },

    setRole: ({
        commit
    }, payload) => {
        if (payload) {
            commit('setRole', payload)
        }
    },

    setWord: ({
        commit
    }, payload) => {
        if (payload) {
            commit('setWord', payload)
        }
    },

    DISABLE_QUESTIONS: ({
        commit
    }) => {
        commit('disableQuestions')
    },

    STOP_GAME: ({
        commit
    }) => {
        commit('stopGame')
    }

}

export default {
    namespaced,
    state,
    mutations,
    actions
}