<template lang="pug">
div(class="p-5")
    form(class="m-auto p-auto inline-block" @submit.prevent)
        file-drop(class="bg-red-50 w-64 h-64" v-model:files="files" accept="text/csv")
            font-awesome-icon(class="block h-90 m-auto" icon="file-csv" size="10x")
            p(class="text-center") Upload a csv file
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import FileDrop from "@/components/FileDrop.vue"

export default defineComponent({
    name: "UploadData",
    components: { FileDrop, FontAwesomeIcon },
    setup() {
        const files = ref<File[]>([])
        return { files }
    },
})
</script>
