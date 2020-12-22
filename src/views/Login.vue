<template lang="pug">
div(class="p-5 text-center")
    div(class="inline-block")
        h1(class="text-xl font-bold mx-5") Login
        div(class="pwd-box bg-gray-200 rounded m-5" syle="display: inline-block")
            label(for="m-2 password") Password:
            input(id="password" class="m-2 rounded p-1" :class="pwdInvalid ? 'border-red-500 border-2' : ''" type="password" v-model="pwd")
            button(class="m-2 rounded bg-green-300 px-2 py-1" @click="submitPassword(pwd)") Submit
        p(v-if="pwdInvalid" class="text-red-500 font-semibold") Password Invalid!
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import { login, isLoggedIn, renewSession } from "@/auth"
import Router from "@/router"
window.setTimeout(() => {
    if (isLoggedIn()) {
        renewSession().catch((err) => {
            console.error(err)
        })
    }
}, 1000 * 60 * 30)
export default defineComponent({
    components: {},
    setup() {
        const pwd = ref("")
        const pwdInvalid = ref(false)
        function submitPassword(pwd: string) {
            login(pwd)
                .then(() => {
                    Router.push({ name: "Root" })
                })
                .catch((err) => {
                    const res = err.response
                    if (res && res.status === 401) {
                        pwdInvalid.value = true
                    }
                    console.error(err)
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

    button
</style>
