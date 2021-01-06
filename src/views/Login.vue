<template lang="pug">
div(class="p-5 text-center")
    div(class="inline-block")
        h1(class="text-xl font-bold mx-5") Login
        form(class="pwd-box bg-gray-200 rounded m-5" syle="display: inline-block" @submit="submitPassword(pwd, $event)")
            label(for="m-2 password") Password:
            input(id="password" class="m-2 rounded p-1" :class="pwdInvalid ? 'border-red-500 border-2' : ''" type="password" v-model="pwd")
            button(class="m-2 rounded bg-green-300 px-2 py-1" type="submit") Submit
        p(v-if="pwdInvalid" class="text-red-500 font-semibold") Password Invalid!
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import { login, isLoggedIn, renewSession } from "@/auth"
import Router from "@/router"

// Make sure the token is automatically refreshed before
// it expires if the user is still on the page
window.setTimeout(() => {
    if (isLoggedIn()) {
        renewSession().catch((err) => {
            console.error("From renew session ", err)
        })
    }
    // 30 minutes in milliseconds
}, 1000 * 60 * 30)

export default defineComponent({
    components: {},
    setup() {
        const pwd = ref("")
        const pwdInvalid = ref(false)
        function submitPassword(pwd: string, event: Event) {
            event.preventDefault() // keep form from reloading page
            login(pwd)
                .then(() => {
                    Router.push({ name: "Root" })
                })
                .catch((err) => {
                    const res = err.response
                    if (res && res.status === 401) {
                        pwdInvalid.value = true
                    }
                })
        }

        onMounted(() => {
            if (isLoggedIn()) {
                Router.push({ name: "Root" })
            }
        })

        return { pwd, pwdInvalid, submitPassword }
    },
})
</script>

<style lang="sass" scoped>
.pwd-box
    display: inline-block

    *
        @apply m-2
</style>
