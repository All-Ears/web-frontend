<template lang="pug">
<div class="flex flex-row w-2/3 justify-center" style="background-color:#afdeff; margin:0 auto;">
    <div class="w-1/4">
        <img src="/highreslogo.png" alt="" width="200">
    </div>
    <div class="flex flex-col justify-center w-1/2">
        <h1 class="text-center font-bold text-6xl">All Ears</h1>
        <h2 class="text-center text-2xl">An Educational Tool About<br>African Forest Elephants<br>and Carbon Emissions</h2>
    </div>
    <div class="w-1/4">
        <img src="/highreslogo.png" alt="" width="200" class="float-right" style="transform:scaleX(-1)">
    </div>
</div>
<br>
<div class="flex flex-row justify-center">
    <p class="text-2xl font-bold">Site Navigation and Descriptions</p>
</div>
<br>
<div class="flex flex-row w-full pt-10 pb-10 justify-center" style="margin:0 auto; background-color:#e9f5fe">
    <div class="w-3/5" style ="margin:0 auto;">
        <div class="float-left w-1/2">
            <p>Why are african forest elephants important? <br>What is the purpose of this application? Find out here.</p>
        </div>
        <div class="float-right w-1/2" style="text-align:center">
            <router-link to="/about" tag="button" class="pl-5 pr-5 pt-2 pb-2 font-bold" style="background-color:powderblue; border-color:grey; border-style:solid; border-width:2px">About</router-link>
        </div>
    </div>
</div>
<div class="flex flex-row w-full pt-10 pb-10 justify-center" style="margin:0 auto;">
    <div class="w-3/5" style ="margin:0 auto;">
        <div class="float-left w-1/2">
            <p>An interactive map of poaching statistics for african<br>forest elephants within the countries they inhabit</p>
        </div>
        <div class="float-right w-1/2" style="text-align:center">
            <router-link to="/elephantmap" tag="button" class="pl-5 pr-5 pt-2 pb-2 font-bold" style="background-color:powderblue; border-color:grey; border-style:solid; border-width:2px">Elephant Map</router-link>
        </div>
    </div>
</div>
<div class="flex flex-row w-full pt-10 pb-10 justify-center" style="margin:0 auto; background-color:#e9f5fe">
    <div class="w-3/5" style ="margin:0 auto;">
        <div class="float-left w-1/2">
            <p>How much carbon is estimated to be emitted during a flight<br>between airports? How much money could be used for elephant<br>conservation that would ultimately offset this value?<br>Find out here.</p>
        </div>
        <div class="float-right w-1/2" style="text-align:center">
            <router-link to="/carboncalculator" tag="button" class="pl-5 pr-5 pt-2 pb-2 font-bold" style="background-color:powderblue; border-color:grey; border-style:solid; border-width:2px">Carbon Calculator</router-link>
        </div>
    </div>
</div>
<div class="flex flex-row w-full pt-10 pb-10 justify-center" style="margin:0 auto;">
    <div class="w-3/5" style ="margin:0 auto;">
        <div class="float-left w-1/2">
            <p>An introduction of several accredited anti-poaching<br>organizations. The logos link to organization-specific donation<br>pages. Visit the Carbon Calculator for recommendations on<br>how much to donate.</p>
        </div>
        <div class="float-right w-1/2" style="text-align:center">
            <router-link to="/donate" tag="button" class="pl-5 pr-5 pt-2 pb-2 font-bold" style="background-color:powderblue; border-color:grey; border-style:solid; border-width:2px">Donate</router-link>
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
