<template lang="pug">
tr
  td.px-2
    button(@click='requestRemoval')
      font-awesome-icon(icon='times-circle')
  td
    input(type='text' v-model='value.unRegion')
  td
    input(type='text' v-model='value.subregionName')
  td
    input(type='text' v-model='value.subregionId')
  td
    input(type='text' v-model='value.countryName')
  td
    input(type='text' v-model='value.countryCode')
  td
    input(type='text' v-model='value.mikeSiteId')
  td
    input(type='text' v-model='value.mikeSiteName')
  td
    input(type='number' v-model='value.year')
  td
    input(type='number' v-model='value.totalNumberOfCarcasses')
  td
    input(type='number' v-model='value.numberOfIllegalCarcasses')
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from "vue"
import { MikeRecord } from "@/models"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

export default defineComponent({
    name: "MikeRecordRow",
    props: {
        record: {
            type: Object as PropType<MikeRecord>,
            required: true,
        },
    },
    setup(props, context) {
        const value = ref({ ...props.record })

        watch(
            () => props.record,
            () => (value.value = props.record),
            { deep: true }
        )

        watch(
            value,
            (val) => {
                context.emit("update:record", val)
            },
            { deep: true }
        )

        function requestRemoval() {
            context.emit("remove")
        }
        return { value, requestRemoval }
    },
    components: { FontAwesomeIcon },
})
</script>
<style lang="sass" scoped>
input
    max-width: 100px

td
    @apply py-2
    input
        @apply bg-gray-100 rounded px-1

button
    @apply text-red-500
</style>
