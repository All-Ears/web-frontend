<template lang="pug">
div(class="p-5")
    form(class="m-auto p-auto inline-block" @submit.prevent)
        file-drop(class="bg-red-50 w-64 h-64" v-model:files="files")
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import FileDrop from "@/components/FileDrop.vue"

export default defineComponent({
    name: "UploadData",
    components: { FileDrop },
    setup() {
        const files = ref<File[]>([])
        return { files }
    },
})
</script>
