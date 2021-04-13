<template>
    <div class="h-full w-full elephant-bg">
        <div
            class="h-full w-2/3 overflow-hidden mx-auto p-3 bg-black bg-opacity-40 backdrop-blur-sm text-white"
        >
            <h1 class="font-bold text-6xl">Elephant Footprint</h1>
            <p class="font-light text-xl mt-3">
                An educational tool about African forest elephants and Carbon
                Emissions
            </p>
            <hr class="my-3" />
            <div class="grid grid-flow-row grid-cols-3 gap-y-4 pt-1">
                <div
                    class="col-span-2 w-full h-full flex flex-row items-center"
                >
                    <p class="font-medium">
                        Why are african forest elephants important? What is the
                        purpose of this application?
                    </p>
                </div>
                <div
                    class="w-full h-full p-2 flex flex-row items-center justify-center"
                >
                    <router-link to="/about" class="link-button"
                        >About Us</router-link
                    >
                </div>
                <div
                    class="col-span-2 w-full h-full flex flex-row items-center"
                >
                    <p class="font-medium">
                        How much carbon is estimated to be emitted during a
                        flight between airports? How much money could be used
                        for elephant conservation that would ultimately offset
                        this value? Find out here.
                    </p>
                </div>
                <div
                    class="w-full h-full p-2 flex flex-row items-center justify-center"
                >
                    <router-link to="/carboncalculator" class="link-button"
                        >Carbon Calculator</router-link
                    >
                </div>
                <div
                    class="col-span-2 w-full h-full flex flex-row items-center"
                >
                    <p class="font-medium">
                        An introduction of several accredited anti-poaching
                        organizations. The logos link to organization-specific
                        donation pages. Visit the Carbon Calculator for
                        recommendations on how much to donate.
                    </p>
                </div>
                <div
                    class="w-full h-full p-2 flex flex-row items-center justify-center"
                >
                    <router-link to="/donate" class="link-button"
                        >Donate</router-link
                    >
                </div>
                <div
                    class="col-span-2 w-full h-full flex flex-row items-center"
                >
                    <p class="font-medium">
                        An interactive map of poaching statistics for African
                        forest elephants within the countries they inhabit.
                    </p>
                </div>
                <div
                    class="w-full h-full p-2 flex flex-row items-center justify-center"
                >
                    <router-link to="/elephantmap" class="link-button"
                        >Elephant Map</router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    name: "Home",
})
</script>

<style lang="sass">
.elephant-bg
    background-image: url("/forest-elephant-photo.png")
    background-position: center
    background-size: cover
    background-attachment: fixed
    background-repeat: no-repeat

.link-button
    @apply inline-block mx-auto my-auto px-5 py-2 font-bold rounded border border-white w-56 hover:bg-white hover:bg-opacity-50 hover:text-black
</style>
