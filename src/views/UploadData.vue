<template lang="pug">
div(class="p-5 text-center grid grid-cols-2")
    div(class="border-r")
        h1(class="text-xl font-bold mx-5") Update with a CSV
        form(class="bg-gray-200 rounded my-5 w-1/2 h-40 center mx-auto flex flex-col" @submit.prevent="submitUploadedFile()")
            file-drop(class="block center m-2 mb-0 rounded-md bg-white flex-auto" v-model:files="files" accept=".csv")
            div(class="flex-initial m-0 p-0")
                button(class="block m-2 rounded bg-green-300 px-2 py-1 " type="submit") Submit
        p(v-if="fileSubmissionState === 'waiting'")
            font-awesome-icon(class="animate-spin mr-1" icon="spinner")
        p(v-else-if="fileSubmissionState === 'done'") The application database was successfully updated!
        p(v-else-if="fileSubmissionState === 'failed'") The update failed because of internal server problems. If the problem persists, contact an administrator.
    div
        h1(class="text-xl font-bold mx-5") Update from the MIKE database
        form(class="bg-gray-200 rounded m-5 inline-block" @submit.prevent="triggerDbUpdate()")
            button(class="m-2 rounded bg-green-300 px-2 py-1") Start automatic update
        p(v-if="mikeUpdateState === 'waiting'")
            font-awesome-icon( class="animate-spin" icon="spinner")
        p(v-else-if="mikeUpdateState === 'done'") The application database was successfully updated!
        p(v-else-if="mikeUpdateState === 'failed'") The update failed because of internal server problems. If the problem persists, contact an administrator.
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import FileDrop from "@/components/FileDrop.vue"
import Router from "@/router"
import { ProcessState } from "@/models"
import Axios from "axios"

export default defineComponent({
    name: "UploadData",
    components: { FileDrop, FontAwesomeIcon },
    setup() {
        const files = ref<File[]>([])
        const mikeUpdateState = ref<ProcessState>("not started")
        const fileSubmissionState = ref<ProcessState>("not started")

        function triggerDbUpdate() {
            mikeUpdateState.value = "waiting"
            Axios.get("/api/admin/update")
                .then(() => {
                    mikeUpdateState.value = "done"
                })
                .catch((err) => {
                    if (err.status == 401) {
                        Router.push("login")
                    } else {
                        mikeUpdateState.value = "failed"
                    }
                })
        }

        function submitUploadedFile() {
            if (files.value.length === 1) {
                const data = new FormData()
                data.append("mike_datasheet", files.value[0])
                fileSubmissionState.value = "waiting"
                Axios.post("/api/admin/upload", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                    .then(() => {
                        fileSubmissionState.value = "done"
                    })
                    .catch((err) => {
                        if (err.status == 401) {
                            Router.push("login")
                        } else {
                            fileSubmissionState.value = "failed"
                        }
                    })
            }
        }

        return {
            files,
            mikeUpdateState,
            triggerDbUpdate,
            fileSubmissionState,
            submitUploadedFile,
        }
    },
})
</script>
