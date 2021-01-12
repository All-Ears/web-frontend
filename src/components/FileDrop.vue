<template lang="pug">
div(class="cursor-pointer rounded px-1" 
    :class='{"outline-black": showOutline}' 
    @click="passToInput($event)" 
    @drop.prevent="dropFile($event)" 
    @dragover.prevent
    @dragenter="showOutline = true" 
    @dragleave="showOutline = false")
    input(class="opacity-0 w-0 h-0" type="file" @change="chooseFile($event)")
    | Choose a file or drag it here
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue"

export default defineComponent({
    name: "FileDrop",
    props: {
        files: {
            type: Array as PropType<File[]>,
            required: true,
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

        function updateFiles(files: FileList | null | undefined) {
            if (files) {
                values.value = [...files]
            }
        }
        function dropFile(event: DragEvent) {
            showOutline.value = false
            updateFiles(event.dataTransfer?.files)
        }
        function chooseFile(event: Event) {
            updateFiles((event.target as HTMLInputElement).files)
        }
        function passToInput(event: Event) {
            const target = event.target as HTMLDivElement
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
