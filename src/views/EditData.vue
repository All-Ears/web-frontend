<template lang="pug">
div(class="p-4")
    loading-spinner(class="m-auto" :class='{"hidden": loadState !== "loading"}')
    p(class="text-center" :class='{"hidden": loadState !== "failed"}') Records could not be loaded
    mike-record-table(:class='{"hidden": loadState !== "done"}' v-model:records="records")
    div(class="h-20")
    div(class="fixed bottom-0 h-20 w-screen flex flex-row justify-between items-center p-5 border-t-2 bg-white" 
    :class='{"hidden": loadState !== "done"}')
        button(class="rounded bg-green-300 py-1 px-3" @click="addEmptyRecord()")
            font-awesome-icon(class="mr-2" icon="plus")
            | Add Record
        button(class="rounded bg-green-300 py-1 px-3" @click="saveChanges()")
            font-awesome-icon(class="mr-2" icon="save")
            | Save changes
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import MikeRecordTable from "@/components/MikeRecordTable.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { MikeRecord } from "@/models"
import Axios, { AxiosResponse } from "axios"
import Router from "@/router"

type LoadState = "loading" | "done" | "failed"

export default defineComponent({
    name: "EditData",
    components: { MikeRecordTable, FontAwesomeIcon, LoadingSpinner },
    setup() {
        const records = ref<MikeRecord[]>([])
        const loadState = ref("loading")
        const changedRecords = ref<MikeRecord[]>([])
        const removedRecords = ref<MikeRecord[]>([])
        const addedRecords = ref<MikeRecord[]>([])

        function loadRecords() {
            Axios.get("/api/mikerecords")
                .then((res: AxiosResponse<MikeRecord[]>) => {
                    if (Array.isArray(res.data)) {
                        records.value = res.data
                    }
                    loadState.value = "done"
                })
                .catch((err) => {
                    if (err.status == 401) {
                        Router.push("login")
                    } else {
                        loadState.value = "failed"
                    }
                })
        }

        function addEmptyRecord() {
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

        function saveChanges() {
            console.log("")
        }
        onMounted(loadRecords)
        return {
            records,
            changedRecords,
            loadState,
            addEmptyRecord,
            saveChanges,
        }
    },
})
</script>
