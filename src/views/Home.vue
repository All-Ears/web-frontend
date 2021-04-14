<template>
    <div class="fixed inset-0 min-h-screen w-screen elephant-bg z-back"></div>
    <div
        class="min-h-full lg:w-2/3 md:w-3/4 mx-auto p-3 bg-black bg-opacity-70 backdrop-blur-sm text-white"
    >
        <h1 class="font-bold text-6xl text-center">Elephant Footprint</h1>
        <p class="font-light text-center text-xl mt-3">
            An educational tool about African forest elephants and Carbon
            Emissions
        </p>
        <hr class="my-3" />
        <p class="text-xl">
            As
            <a
                class="underline"
                href="https://www.nytimes.com/2019/08/19/science/elephants-climate-change.html"
                >highlighted in the New York Times</a
            >, recent
            <a
                class="underline"
                href="https://www.nature.com/articles/s41561-019-0395-6"
                >scientific research</a
            >
            has quantified how African forest elephants sequester carbon in
            tropical forests, thus reducing climate change and providing a
            carbon storage service worth US$43 billion dollars. By contributing
            the suggested amount to offset your flight’s carbon emissions, your
            money will help fight climate change and conserve
            <a
                class="underline"
                href="https://www.nytimes.com/2021/03/25/science/elephants-africa-endangered.html"
                >dangerously threatened forest elephant populations</a
            >.
        </p>
        <hr class="my-3" />

        <div class="grid grid-flow-row grid-cols-1 lg:grid-cols-3 gap-y-4 pt-1">
            <div class="lg:col-span-2 w-full h-full flex flex-row items-center">
                <p class="font-medium text-xl">
                    Calculate your "elephant footprint" or how long a forest
                    elephant will take to sequester the carbon your flight
                    emits.
                </p>
            </div>
            <div
                class="w-full h-full p-2 flex flex-row items-center justify-center"
            >
                <router-link to="/carboncalculator" class="link-button"
                    >Carbon Calculator</router-link
                >
            </div>
            <div class="lg:col-span-2 w-full h-full flex flex-row items-center">
                <p class="font-medium text-xl">
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
            <div class="lg:col-span-2 w-full h-full flex flex-row items-center">
                <p class="font-medium text-xl">
                    An interactive map of poaching statistics for African forest
                    elephants within the countries they inhabit.
                </p>
            </div>
            <div
                class="w-full h-full p-2 flex flex-row items-center justify-center"
            >
                <router-link to="/elephantmap" class="link-button"
                    >Elephant Map</router-link
                >
            </div>
            <div class="lg:col-span-2 w-full h-full flex flex-row items-center">
                <p class="font-medium text-xl">
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
    background-image: url("/images/forest-elephant-photo.png")
    background-position: center
    background-size: cover
    background-attachment: fixed
    background-repeat: no-repeat

.link-button
    @apply inline-block mx-auto my-auto px-5 py-2 font-bold rounded border border-white w-56 hover:bg-white hover:bg-opacity-50 hover:text-black
</style>
