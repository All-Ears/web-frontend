<template lang="pug">
nav(id="nav" class="bg-white")
    div(class="flex flex-row justify-between items-center h-32 px-3 text-xl w-full")
        router-link(class="brand block h-full px-3 flex flex-row items-center" to="/")
            div(class="w-20 rounded mr-3")
                img(src="/images/app-logo-bg.png") 
            h1(class="font-bold") Elephant Footprint
        button(class="lg:hidden block rounded border border-gray-300 p-3" @click="collapsed = !collapsed")
            font-awesome-icon(v-if="collapsed" icon="bars")
            font-awesome-icon(v-else icon="times")
        div(class="lg:flex hidden flex-row flex-shrink h-full justify-around items-center")
            router-link(class="block h-full px-3 flex flex-row items-center" to="/carboncalculator") Carbon Calculator
            router-link(class="block h-full px-3 flex flex-row items-center" to="/donate") Donate
            router-link(class="block h-full px-3 flex flex-row items-center" to="/elephantmap") Elephant Map
            router-link(class="block h-full px-3 flex flex-row items-center" to="/about") About Us
            template(v-if="loggedIn")
                router-link(class="block h-full px-3 flex flex-row items-center" to="/admin/edit") Edit Records
                router-link(class="block h-full px-3 flex flex-row items-center" to="/admin/upload") Upload Records
        div(class="lg:flex hidden flex-row flex-grow justify-end h-full")
            router-link(class="block h-full px-3 flex flex-row items-center" v-if="!loggedIn" to="/login") Login
            router-link(class="block h-full px-3 flex flex-row items-center" v-else to="/login" @click="logout()") Logout
    div(class="w-full" v-if="!collapsed" @click="collapsed = !collapsed")
        router-link(class="block h-full px-3 flex flex-row items-center" to="/carboncalculator") Carbon Calculator
        router-link(class="block h-full px-3 flex flex-row items-center" to="/donate") Donate
        router-link(class="block h-full px-3 flex flex-row items-center" to="/elephantmap") Elephant Map
        router-link(class="block h-full px-3 flex flex-row items-center" to="/about") About Us
        template(v-if="loggedIn")
            router-link(class="block h-full mx-2 px-3" to="/admin/edit") Edit Records
            router-link(class="block h-full mx-2 px-3" to="/admin/upload") Upload Records
        router-link(class="block h-full px-3 flex flex-row items-center" v-if="!loggedIn" to="/login") Login
        router-link(class="block h-full px-3 flex flex-row items-center" v-else to="/login" @click="logout()") Logout
router-view
</template>

<script lang="ts">
import { isLoggedIn, logout } from "@/auth"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { computed, defineComponent, ref } from "vue"
export default defineComponent({
    components: { FontAwesomeIcon },
    setup() {
        const loggedIn = computed<boolean>(isLoggedIn)
        const collapsed = ref(true)
        return { loggedIn, logout, collapsed }
    },
})
</script>

<style lang="sass">
@font-face
    font-family: 'Open Sans'
    src: url('/fonts/open-sans/OpenSans-Regular.ttf') format('truetype')
    font-weight: 400
    font-style: normal

@font-face
    font-family: 'Open Sans'
    src: url('/fonts/open-sans/OpenSans-Light.ttf') format('truetype')
    font-weight: 300
    font-style: normal


#app
    font-family: 'Open Sans', Avenir, Helvetica, Arial, sans-serif
    height: 100%

#nav
    a:not(.brand)
        &.router-link-exact-active
            @apply bg-pink-300 text-white
</style>
