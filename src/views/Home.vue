<template>
    <div
        class="flex flex-row justify-center"
        style="background-color: #afdeff; margin: 0 auto;"
    >
        <div class="w-1/3 bg-white">
            <img
                src="/highreslogo.png"
                alt="Elephant Footprint's logo"
                width="200"
                class="mx-auto"
            />
        </div>
        <div class="flex flex-col justify-center w-2/3">
            <h1 class="text-center font-bold text-6xl">All Ears</h1>
            <h2 class="text-center text-2xl">An Educational Tool</h2>
            <h2 class="text-center text-2xl">About African Forest Elephants</h2>
            <h2 class="text-center text-2xl">and Carbon Emissions</h2>
        </div>
        <div class="w-1/3 bg-white">
            <img
                src="/highreslogo.png"
                alt=""
                width="200"
                class="mx-auto"
                style="transform:scaleX(-1)"
            />
        </div>
    </div>
    <div
        class="flex flex-row justify-center py-10"
        style="background-color:#e9f5fe"
    >
        <p class="text-2xl font-bold">Site Navigation and Descriptions</p>
    </div>
    <div class="flex flex-row w-full my-0 mx-auto py-10 justify-center">
        <div class="w-3/5 my-0 mx-auto">
            <div class="float-left w-1/2">
                <p>
                    Why are african forest elephants important? What is the
                    purpose of this application? Find out here.
                </p>
            </div>
            <div class="float-right w-1/2 text-center">
                <router-link
                    to="/about"
                    tag="button"
                    class="px-5 py-2 font-bold border-solid border-2 border-gray-500"
                    style="background-color: powderblue"
                    >About Us</router-link
                >
            </div>
        </div>
    </div>

    <div
        class="flex flex-row w-full my-0 mx-auto py-10 justify-center"
        style="background-color:#e9f5fe"
    >
        <div class="w-3/5 my-0 mx-auto">
            <div class="float-left w-1/2">
                <p>
                    How much carbon is estimated to be emitted during a flight
                    between airports? How much money could be used for elephant
                    conservation that would ultimately offset this value? Find
                    out here.
                </p>
            </div>
            <div class="float-right w-1/2 text-center">
                <router-link
                    to="/carboncalculator"
                    tag="button"
                    class="px-5 py-2 font-bold border-solid border-2 border-gray-500"
                    style="background-color: powderblue"
                    >Carbon Calculator</router-link
                >
            </div>
        </div>
    </div>
    <div class="flex flex-row w-full py-10 justify-center my-0 mx-auto">
        <div class="w-3/5 my-0 mx-auto">
            <div class="float-left w-1/2">
                <p>
                    An introduction of several accredited anti-poaching
                    organizations. The logos link to organization-specific
                    donation pages. Visit the Carbon Calculator for
                    recommendations on how much to donate.
                </p>
            </div>
            <div class="float-right w-1/2 text-center">
                <router-link
                    to="/donate"
                    tag="button"
                    class="px-5 py-2 font-bold border-solid border-2 border-gray-500"
                    style="background-color: powderblue"
                    >Donate</router-link
                >
            </div>
        </div>
    </div>
    <div
        class="flex flex-row w-full my-0 mx-auto py-10 justify-center"
        style="background-color:#e9f5fe"
    >
        <div class="w-3/5 my-0 mx-auto">
            <div class="float-left w-1/2">
                <p>
                    An interactive map of poaching statistics for African forest
                    elephants within the countries they inhabit.
                </p>
            </div>
            <div class="float-right w-1/2 text-center">
                <router-link
                    to="/elephantmap"
                    tag="button"
                    class="px-5 py-2 font-bold border-solid border-2 border-gray-500"
                    style="background-color: powderblue"
                    >Elephant Map</router-link
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
