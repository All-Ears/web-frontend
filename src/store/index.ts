import createPersistedState from "vuex-persistedstate"
import { createStore } from "vuex"
import Axios from "axios"
import dayjs from "dayjs"

export default createStore({
    state: { securityToken: "", loggedInUntil: dayjs(0).unix() },
    mutations: {
        updateSecurityToken(state, data: string) {
            state.securityToken = data
            // This must change if we make any requests to anywhere other than our backend
            Axios.defaults.headers.common["Authorization Bearer"] = data
        },
        updeateLoggedInUntil(state, data: number) {
            state.loggedInUntil = data
        },
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState()],
})
