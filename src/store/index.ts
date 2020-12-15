import createPersistedState from "vuex-persistedstate"
import { createStore } from "vuex"

export default createStore({
    state: { securityToken: "" },
    mutations: {
        updateSecurityToken(state, data: string) {
            state.securityToken = data
        },
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState()],
})
