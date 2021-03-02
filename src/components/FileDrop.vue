<template lang="pug">
div(
    class="cursor-copy p-0"
    :class="{'bg-green-200': lightUp}"
    @dragenter.prevent.stop
    @dragover.prevent.stop
    @dragenter="lightUp = true"
    @dragleave="lightUp = false"
    @drop.prevent="handleDrop($event)" 
)
    label(:for="id" class="block min-h-full min-w-full text-center") {{values.length}} file(s) uploaded
    input(
        :id="id"
        class="hidden"
        :multiple="multiple" 
        type="file" 
        :accept="accept"
        @change="handleChange($event)"
        )
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
        accept: {
            type: String,
            default: "*",
        },
        id: {
            type: String,
            default: "file-drop",
        },
    },
    setup(props, context) {
        const values = ref<File[]>([])
        const validFileTypes = props.accept.split(",")
        const lightUp = ref<boolean>(false)
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

        function isFileValid(file: File): boolean {
            console.log(`${file.name}: ${file.type}`)
            return validFileTypes.some((x) => file.name.endsWith(x))
        }

        function filterFiles(fileList: FileList | null | undefined): File[] {
            const files = [] as File[]
            let file
            if (fileList && fileList.length > 0) {
                if (props.multiple) {
                    for (file of fileList) {
                        if (isFileValid(file)) {
                            files.push(file)
                        }
                    }
                } else {
                    file = fileList[0]
                    if (isFileValid(file)) {
                        files.push(file)
                    }
                }
            }
            return files
        }

        function addFileIfValid(file: File) {
            console.log(`${file.name}: ${file.type}`)
            if (validFileTypes.some((x) => file.name.endsWith(x))) {
                values.value.push(file)
            }
        }

        function updateFiles(files: FileList | null | undefined) {
            if (files) {
                if (props.multiple) {
                    for (const file of files) {
                        addFileIfValid(file)
                    }
                } else {
                    if (values.value.length === 1 && files.length > 0) {
                        values.value.pop()
                    }
                    addFileIfValid(files[0])
                }
            }
            console.log(values.value)
        }

        function handleDrop(e: DragEvent) {
            lightUp.value = false
            const validFiles = filterFiles(e?.dataTransfer?.files)
            values.value = validFiles
            updateFiles(e.dataTransfer?.files)
        }

        function handleChange(e: InputEvent) {
            updateFiles((e.target as HTMLInputElement)?.files)
        }

        return {
            values,
            handleChange,
            handleDrop,
            addFileIfValid,
            lightUp,
        }
    },
})
</script>
