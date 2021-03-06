import Vue from 'vue'
import Vuex from 'vuex'

// Modules.
import messages from './modules/messages'

// Use Vuex.
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        messages
    }
})