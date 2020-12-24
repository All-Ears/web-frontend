<template lang="pug">
div(class="flex flex-col justify-around p-4 items-center")
    mike-record-table(v-model:records="records")
    div(class="fixed-panel p-5")
        button(class="rounded bg-green-300 py-1 px-3" @click="addRecord()") 
            font-awesome-icon(class="mr-2" icon="plus") 
            | Add Record
        button(class="rounded bg-green-300 py-1 px-3") 
            font-awesome-icon(class="mr-2" icon="save") 
            | Save changes
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import MikeRecordTable from "@/components/MikeRecordTable.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { MikeRecord } from "@/models"
import Axios, { AxiosResponse } from "axios"
import Router from "@/router"

export default defineComponent({
    name: "EditData",
    components: { MikeRecordTable, FontAwesomeIcon },
    setup() {
        const records = ref<MikeRecord[]>([])
        function loadRecords() {
            // debug value, replace with "/api/mikerecords"
            Axios.get("/api/mikerecords")
                .then((res: AxiosResponse<MikeRecord[]>) => {
                    records.value = res.data
                })
                .catch((err) => {
                    if (err.status == 401) {
                        Router.push("login")
                    } else {
                        console.error("Failed to to fetch MIKE records", err)
                    }
                })
        }

        function addRecord() {
            records.value.push({
                unRegion: "",
                subregionName: "",
                subregionId: "",
                countryName: "",
                countryCode: "",
                mikeSiteId: "",
                mikeSiteName: "",
                year: 0,
                totalNumberOfCarcasses: 0,
                numberOfIllegalCarcasses: 0,
            })
        }

        onMounted(loadRecords)
        return { records, addRecord }
    },
})
</script>
<style lang="sass" scoped>
.fixed-panel
    position: fixed
    bottom: 0px
    width: 100vw
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
</style>
