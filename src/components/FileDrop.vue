<template lang="pug">
div(
    class="cursor-pointer rounded relative" 
    :class='{"outline-black": showOutline}' 
    @click="passToInput($event)" 
    @drop.prevent="dropFile($event)" 
    @dragover.prevent
    @dragenter="showOutline = true" 
    @dragleave="showOutline = false"
)
    input(
        class="opacity-0 w-0 h-0" 
        type="file" 
        :multiple="multiple" 
        @change="chooseFile($event)"
    )
    slot Click to add {{multiple ? "files" : "a file"}} or drag {{multiple ? "them" : "it"}} here.
    p(class="absolute bottom-0 w-100 text-center mx-auto" v-if="files.length > 0") {{files.length}} file{{files.length > 1 ? "s" : ""}} uploaded.
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue"

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
    },
    setup(props, context) {
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
