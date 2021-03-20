<template lang="pug">
div(class="p-4")
    font-awesome-icon(v-if="loadState === 'waiting'" class="block mx-auto h-40 animate-spin" icon="spinner" size="3x")
    p(v-else-if="loadState === 'failed'" class="text-center") Records could not be loaded
    mike-record-table(v-show="loadState === 'done'" v-model:records="records")
    div(class="h-20")
    div(class="fixed bottom-0 h-20 w-screen flex flex-row justify-between items-center p-5 border-t-2 bg-white"
        v-if="loadState === 'done'")
        button(class="rounded bg-green-300 py-1 px-3" @click="addAndScrollToBottom()")
            font-awesome-icon(class="mr-2" icon="plus")
            | Add Record
        
        span(v-if="submissionState === 'failed'" class="text-red-400") There was a problem submitting your changes. Please contact an administrator if the problem persists.
        span(v-if="submissionState === 'done'" class="text-green-500") The database was successfully updated!
        button(class="rounded bg-green-300 py-1 px-3" @click="saveChanges()")
            font-awesome-icon(v-if="submissionState !== 'waiting'" class="mr-2" icon="save")
            font-awesome-icon(v-else="submissionState === 'waiting'" class="mr-2 animate-spin" icon="spinner")
            | {{submissionState !== "waiting" ? "Save changes" : "Saving changes..."}}
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import MikeRecordTable from "@/components/MikeRecordTable.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { MikeRecord, ProcessState, getMikePrimaryKey } from "@/models"
import Axios, { AxiosResponse } from "axios"
import { isArray, filter, differenceWith, isEqual } from "lodash"
import { logout } from "@/auth"

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

function primaryKeysEqual(x: MikeRecord, y: MikeRecord): boolean {
    return isEqual(getMikePrimaryKey(x), getMikePrimaryKey(y))
}

export default defineComponent({
    name: "EditData",
    components: { MikeRecordTable, FontAwesomeIcon },
    setup() {
        const loadState = ref<ProcessState>("not started")
        const records = ref<MikeRecord[]>([])
        const submissionState = ref<ProcessState>("not started")
        let originalRecords: MikeRecord[]
        function loadRecords() {
            loadState.value = "waiting"
            Axios.get("/api/mikerecords")
                .then((res: AxiosResponse<MikeRecord[]>) => {
                    if (isArray(res.data)) {
                        originalRecords = res.data
                        records.value = [...originalRecords]
                    }
                    loadState.value = "done"
                })
                .catch(() => {
                    loadState.value = "failed"
                })
        }

        function addAndScrollToBottom() {
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
        }

        function saveChanges() {
            submissionState.value = "waiting"
            const userRecords = filter(records.value, recordIsValid)

            // userRecords - originalRecords by primary key
            // get the records with new primary keys
            const added = differenceWith(
                userRecords,
                originalRecords,
                primaryKeysEqual
            )

            // originalRecords - userRecords by primary key
            // see which record were deleted
            const removed = differenceWith(
                originalRecords,
                userRecords,
                primaryKeysEqual
            )

            // userRecords - added - removed - originalRecords
            // get records that were not added, removed, or in the originalRecords
            const changed = differenceWith(
                userRecords,
                added,
                removed,
                originalRecords,
                isEqual
            )

            Axios.post("/api/admin/edit", { added, changed, removed })
                .then(() => {
                    submissionState.value = "done"
                    loadRecords()
                })
                .catch((err) => {
                    if (err?.response?.status === 401) {
                        logout()
                    } else {
                        submissionState.value = "failed"
                    }
                })
        }
        onMounted(() => {
            loadRecords()
        })
        return {
            records,
            loadState,
            addAndScrollToBottom,
            submissionState,
            saveChanges,
        }
    },
})
</script>
