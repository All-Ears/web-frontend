<template lang="pug">
nav(id="nav" class="flex flex-row justify-between items-center h-16 px-3 text-xl")
    div(class="flex flex-row justify-around")
        router-link(class="mx-2 flex flex-row" to="/") 
            div(class="w-16 mr-2")
            div(class="absolute w-16 rounded shadow-md")
                img(src="app-logo-bg.png")
            h1(class="font-bold") Elephant Footprint
        router-link(class="mx-2" to="/about") About Us
        router-link(class="mx-2" to="/carboncalculator") Carbon Calculator
        router-link(class="mx-2" to="/donate") Donate
        router-link(class="mx-2" to="/elephantmap") Elephant Map
        template(v-if="loggedIn")
            router-link(class="mx-2" to="/admin/edit") Edit Records
            router-link(class="mx-2" to="/admin/upload") Upload Records
    router-link(class="mx-2" v-if="!loggedIn" to="/login") Login
    router-link(class="mx-2" v-else  to="/login" @click="logout()") Logout
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
@import url('https://fonts.googleapis.com/css2?family=Open%20Sans:wght@100;400&display=swap')

#app
    font-family: 'Open Sans', Avenir, Helvetica, Arial, sans-serif
    height: 100%

#nav
    a
        &.router-link-exact-active
            @apply text-pink-400
</style>
