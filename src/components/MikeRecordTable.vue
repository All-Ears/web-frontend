<template lang="pug">
table(class="table-auto border-separate w-full")
    thead(class="text-left")
        tr
            th(class="sticky top-0 m-0 bg-white border-b-2")
            th(class="sticky top-0 m-0 bg-white border-b-2 py-1 px-1") UN Region
            th(class="sticky top-0 m-0 bg-white border-b-2 py-1 px-1") UN Subregion
            th(class="sticky top-0 m-0 bg-white border-b-2 py-1 px-1") UN Subregion ID
            th(class="sticky top-0 m-0 bg-white border-b-2 py-1 px-1") Country
            th(class="sticky top-0 m-0 bg-white border-b-2 py-1 px-1") Country Code
            th(class="sticky top-0 m-0 bg-white border-b-2 py-1 px-1") MIKE Site
            th(class="sticky top-0 m-0 bg-white border-b-2 py-1 px-1") MIKE Site ID
            th(class="sticky top-0 m-0 bg-white border-b-2 py-1 px-1") Year
            th(class="sticky top-0 m-0 bg-white border-b-2 py-1 px-1") Total Carcasses
            th(class="sticky top-0 m-0 bg-white border-b-2 py-1 px-1") Illegal Carcasses
    tbody(class="max-h-80 relative overflow-auto divide-y")
        template(v-for="(val, i) of values" :key="'record: '+i")
            mike-record-row(v-model:record='values[i]' @remove='removeItem(i)')
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue"
import { MikeRecord } from "@/models"
import MikeRecordRow from "@/components/MikeRecordRow.vue"
export default defineComponent({
    name: "MikesRecordRow",
    props: {
        records: {
            type: Array as PropType<MikeRecord[]>,
            required: true,
        },
    },

    setup(props, context) {
        const values = ref<MikeRecord[]>([])

        watch(
            () => props.records,
            (val) => (values.value = val),
            { deep: true }
        )

        watch(
            values,
            (val) => {
                context.emit("update:records", val)
            },
            { deep: true }
        )

        function removeItem(index: number) {
            values.value.splice(index, 1)
        }

        return { values, removeItem }
    },
    components: { MikeRecordRow },
})
</script>

<style lang="sass" scoped></style>
