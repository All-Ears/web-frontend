<template lang="pug">
div
    input(type="password" v-model="password")
    button(@click="submitPassword(password)")
    
</template>

<script lang="ts">
import { defineComponent, watch, onBeforeMount } from "vue"
import Axios from "axios"
import Store from "@/store"
export default defineComponent({
    components: {},
    setup(context) {
        let password = ""
        function submitPassword(pwd: string) {
            Axios.post("/api/login", { password })
                .then((res) => {
                    Store.commit("updateSecurityToken", res.data)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
        onBeforeMount(() => {})

        return { password, submitPassword }
    },
})
</script>
