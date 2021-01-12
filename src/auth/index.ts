import Store from "@/store"
import Axios from "axios"
import dayjs from "dayjs"

function updateLoginState(newToken: string | undefined | null) {
    if (newToken) {
        Store.commit("updateSecurityToken", newToken)
        Store.commit(
            "updateLoggedInUntil",
            dayjs()
                .add(30, "minute")
                .unix()
        )
    } else {
        throw new Error("Token cannot be undefined or empty")
    }
}
export function isLoggedIn(): boolean {
    const loggedInUntil = dayjs.unix(Store.state.loggedInUntil)
    const currentTime = dayjs()
    // check session expired
    return Boolean(
        currentTime.isBefore(loggedInUntil) && Store.state.securityToken
    )
}

export async function login(pwd: string) {
    const res = await Axios.post("/api/login", { password: pwd })
    updateLoginState(res.data.token)
}

export async function renewSession() {
    const res = await Axios.get("/api/refreshtoken")
    updateLoginState(res.data.token)
}

export function logout() {
    Store.commit("updateSecurityToken", "")
    Store.commit("updeateLoggedInUntil", dayjs(0).unix())
}
