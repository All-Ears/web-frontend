<template lang="pug">
div(class="p-5")
    form(class="dropzone block" @submit.prevent id="my-form" action="/admin/edit")
        div(class='dz-preview dz-file-preview')
            div(class='dz-details')
                div(class='dz-filename')
                span(data-dz-name)
                div(class='dz-size' data-dz-size)
                img(data-dz-thumbnail)
            div(class='dz-progress')
                span(class='dz-upload' data-dz-uploadprogress)
            div(class='dz-success-mark')
                span ✔
            div(class='dz-error-mark')
                span ✘
            div(class='dz-error-message')
                span(data-dz-errormessage)
        
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import FileDrop from "@/components/FileDrop.vue"
import Dropzone from "dropzone"

export default defineComponent({
    name: "UploadData",
    components: { FileDrop, FontAwesomeIcon },
    setup() {
        const files = ref<File[]>([])

        return { files }
    },
})
</script>
