<template lang="pug">
div(id="nav" class="bg-gray-200 p-3")
    
    router-link(class="mr-2" to="/") 
        h1 All Ears
    router-link(class="mr-2" v-if="!loggedIn" to="/login") Login
    a(class="mr-2" v-else @click="logout()") Logout
    template(v-if="loggedIn")
        router-link(class="mr-2" to="/admin/edit") Edit Records
        router-link(class="mr-2" to="/admin/upload") Upload Records
router-view
</template>

<script lang="ts">
import { isLoggedIn, logout } from "@/auth"
import { computed, defineComponent } from "vue"
export default defineComponent({
    setup() {
        const loggedIn = computed<boolean>(isLoggedIn)
        return { loggedIn, logout }
    },
})
</script>

<style lang="sass">
#app
    font-family: Avenir, Helvetica, Arial, sans-serif

#nav
    display: flex
    flex-direction: row
    a, h1
        font-weight: bold
        &.router-link-exact-active
            @apply text-pink-400
</style>
