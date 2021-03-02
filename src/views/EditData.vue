<template lang="pug">
div(class="p-4")
    font-awesome-icon(v-if="loadState !== 'waiting'" class="block mx-auto h-40 animate-spin" icon="spinner" size="3x")
    p(v-else-if="loadState !== 'failed'" class="text-center") Records could not be loaded
    mike-record-table(v-else-if="loadState !== 'done'"  v-model:records="records" ref="table")
    div(class="h-20")
    div(class="fixed bottom-0 h-20 w-screen flex flex-row justify-between items-center p-5 border-t-2 bg-white"
        v-if="loadState !== 'done'")
        button(class="rounded bg-green-300 py-1 px-3" @click="addEmptyRecord()")
            font-awesome-icon(class="mr-2" icon="plus")
            | Add Record
        button(class="rounded bg-green-300 py-1 px-3" @click="saveChanges()")
            font-awesome-icon(class="mr-2" icon="save")
            | Save changes
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useContext } from "vue"
import MikeRecordTable from "@/components/MikeRecordTable.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { MikeRecord, ProcessState, getMikePrimaryKey } from "@/models"
import Axios, { AxiosResponse } from "axios"
import Lodash, { last } from "lodash"
import Router from "@/router"

export default defineComponent({
    name: "EditData",
    components: { MikeRecordTable, FontAwesomeIcon },
    setup() {
        const loadState = ref<ProcessState>("not started")
        const records = ref<MikeRecord[]>([])
        const submissionState = ref<ProcessState>("not started")
        let originalRecords: MikeRecord[]
        const table = ref<HTMLElement | null>(null)
        function loadRecords() {
            loadState.value = "waiting"
            Axios.get("/api/mikerecords")
                .then((res: AxiosResponse<MikeRecord[]>) => {
                    if (Array.isArray(res.data)) {
                        originalRecords = res.data
                        records.value = [...originalRecords]
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

        function addAndScrollToBottom(event: MouseEvent) {
            records.value.push({
                unRegion: "",
                subregionName: "",
                subregionId: "",
                countryName: "",
                countryCode: "",
                mikeSiteId: "",
                mikeSiteName: "",
                year: 0,
                carcasses: 0,
                illegalCarcasses: 0,
            })
            const lastElem = table.value?.querySelector("tbody:lastchild")
            if (lastElem) {
                lastElem.scrollIntoView()
            }
        }

        function recordIsValid(record: MikeRecord): boolean {
            return Boolean(
                record.unRegion &&
                    record.subregionName &&
                    record.subregionId &&
                    record.subregionId.length === 2 &&
                    record.countryName &&
                    record.countryCode &&
                    record.countryCode.length === 2 &&
                    record.mikeSiteId &&
                    record.mikeSiteId.length === 3 &&
                    record.mikeSiteName &&
                    record.year >= 0 &&
                    record.carcasses >= 0 &&
                    record.illegalCarcasses >= 0
            )
        }

        function saveChanges() {
            submissionState.value = "waiting"
            const [validRecords, _] = Lodash.partition(
                records.value,
                recordIsValid
            )
            // make sets for O(1) access
            let originalKeySet = new Set(originalRecords.map(getMikePrimaryKey))
            let userKeySet = new Set(validRecords.map(getMikePrimaryKey))

            // records with primary keys that are not in the originals
            let [added, changedAndUnchanged] = Lodash.partition(
                validRecords,
                ({ mikeSiteId, year }) =>
                    !originalKeySet.has({ mikeSiteId, year })
            )

            const originalSet = new Set(originalRecords)
            // user records with the same primary keys as the originals that are otherwise changed
            let changed = changedAndUnchanged.filter((x) => originalSet.has(x))

            // records whose primary keys are in the original copy but not the user one
            let removed = originalRecords.filter(({ mikeSiteId, year }) =>
                userKeySet.has({ mikeSiteId, year })
            )

            Axios.post("/api/admin/edit", { added, changed, removed })
                .then(() => {
                    submissionState.value = "done"
                })
                .catch((err) => {
                    if (err && err.status === 401) {
                        Router.push("login")
                    } else {
                        submissionState.value = "failed"
                    }
                })
        }

        onMounted(() => {
            loadRecords()
        })
        return {
            table,
            records,
            loadState,
            addAndScrollToBottom,
            saveChanges,
        }
    },
})
</script>
