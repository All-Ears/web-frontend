<template lang="pug">
table(class="table border-collapse")
  thead(class="border-t-2 border-b-2")
    tr
      th
      th UN Region
      th UN Subregion
      th UN Subregion Id
      th Country
      th Country Code
      th MIKE Site
      th MIKE Site Id
      th Year
      th Total Carcasses
      th Illegal Carcasses
  tbody(class="divide-y")
    template(v-for='(val, i) of values' :key='"record: "+i')
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

<style lang="sass" scoped>

th
    @apply p-2 text-center
</style>
