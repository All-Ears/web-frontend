<template>
    <table class="mike-table">
        <thead>
            <tr>
                <th>#</th>
                <th>UN Region</th>
                <th>UN Subregion</th>
                <th>UN Subregion Id</th>
                <th>Country</th>
                <th>Country Code</th>
                <th>MIKE Site</th>
                <th>MIKE Site Id</th>
                <th>Year</th>
                <th>Total Carcasses</th>
                <th>Illegal Carcasses</th>
            </tr>
        </thead>
        <tbody>
            <mike-record-row
                v-for="index in values.length - 1"
                :key="index"
                v-model:record="values[index]"
                :index="index"
                @v-on:remove="removeItem(key)"
            />
        </tbody>
    </table>
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
        const values = ref(props.records)
        watch(
            values,
            (val) => {
                context.emit("update:records", val)
            },
            { deep: true }
        )
        function removeItem(index: number) {
            console.log("Removal attempted")
            values.value.splice(index, 1)
        }

        return { values, removeItem }
    },
    components: { MikeRecordRow },
})
</script>

<style lang="sass">
.mike-table
    @apply table-auto border-collapse
    tbody, thead
        tr
            th, td
                @apply border p-1
</style>
