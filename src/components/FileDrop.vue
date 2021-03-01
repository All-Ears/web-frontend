<template lang="pug">
form(:id="id" class="dropzone block w-12")
    
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue"
import Dropzone from "dropzone"
export default defineComponent({
    name: "FileDrop",
    props: {
        files: {
            type: Array as PropType<File[]>,
            default: [] as File[],
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
            default: "fileDrop",
        },
    },
    setup(props, context) {
        Dropzone.options[props.id] = {
            previewTemplate: "",
            previewsContainer: "",
        }
        const values = ref<File[]>([])
        const showOutline = ref(false)
        watch(
            () => props.files,
            (val) => (values.value = val),
            { deep: true }
        )

        watch(
            values,
            (val) => {
                context.emit("update:files", val)
            },
            { deep: true }
        )

        function updateFiles(fileList: FileList | null | undefined) {
            values.value = fileList ? [...fileList] : ([] as File[])
        }
        function dropFile(event: DragEvent) {
            showOutline.value = false
            updateFiles(event.dataTransfer?.files)
        }
        function chooseFile(event: Event) {
            updateFiles((event.currentTarget as HTMLInputElement).files)
        }
        function passToInput(event: Event) {
            console.log(event.currentTarget)
            const target = event.currentTarget as HTMLDivElement
            target.firstChild?.dispatchEvent(new MouseEvent("click"))
        }

        return {
            values,
            dropFile,
            chooseFile,
            passToInput,
            showOutline,
        }
    },
})
</script>
