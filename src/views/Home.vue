<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <mike-record-table v-model:records="records" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import MikeRecordTable from "@/components/MikeRecordTable.vue"
import { MikeRecord } from "@/models"

export default defineComponent({
    name: "Home",
    components: { MikeRecordTable },
    setup() {
        const records = ref<MikeRecord[]>([
            {
                unRegion: "Africa",
                subregionName: "Eastern Africa",
                subregionId: "FE",
                countryName: "Rwanda",
                countryCode: "rw",
                mikeSiteId: "AKG",
                mikeSiteName: "Akagera",
                year: 2014,
                totalNumberOfCarcasses: 0,
                numberOfIllegalCarcasses: 0,
            },
            {
                unRegion: "Africa",
                subregionName: "Eastern Africa",
                subregionId: "FE",
                countryName: "Rwanda",
                countryCode: "rw",
                mikeSiteId: "AKG",
                mikeSiteName: "Akagera",
                year: 2013,
                totalNumberOfCarcasses: 1,
                numberOfIllegalCarcasses: 0,
            },
            {
                unRegion: "Africa",
                subregionName: "Eastern Africa",
                subregionId: "FE",
                countryName: "Rwanda",
                countryCode: "rw",
                mikeSiteId: "AKG",
                mikeSiteName: "Akagera",
                year: 2010,
                totalNumberOfCarcasses: 1,
                numberOfIllegalCarcasses: 0,
            },
            {
                unRegion: "Africa",
                subregionName: "Eastern Africa",
                subregionId: "FE",
                countryName: "Rwanda",
                countryCode: "rw",
                mikeSiteId: "AKG",
                mikeSiteName: "Akagera",
                year: 2018,
                totalNumberOfCarcasses: 4,
                numberOfIllegalCarcasses: 0,
            },
            {
                unRegion: "Africa",
                subregionName: "Eastern Africa",
                subregionId: "FE",
                countryName: "Rwanda",
                countryCode: "rw",
                mikeSiteId: "AKG",
                mikeSiteName: "Akagera",
                year: 2011,
                totalNumberOfCarcasses: 4,
                numberOfIllegalCarcasses: 1,
            },
            {
                unRegion: "Africa",
                subregionName: "Eastern Africa",
                subregionId: "FE",
                countryName: "Rwanda",
                countryCode: "rw",
                mikeSiteId: "AKG",
                mikeSiteName: "Akagera",
                year: 2006,
                totalNumberOfCarcasses: 1,
                numberOfIllegalCarcasses: 0,
            },
        ])

        return { records }
    },
})
</script>
