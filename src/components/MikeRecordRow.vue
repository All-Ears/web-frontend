<template lang="pug">
tr(class="border-b")
    td(class="border-b bg-white py-3 px-0.5 w-5")
        button(@click='requestRemoval' class="text-red-500 w-5")
            font-awesome-icon(icon='times-circle')
    td(class="border-b bg-white py-3 px-0.5")
        input(type='text'  class="w-28 bg-gray-100 rounded px-1" v-model.trim='value.unRegion')
    td(class="border-b bg-white py-3 px-0.5")
        input(type='text'  class="w-28 bg-gray-100 rounded px-1" v-model.trim='value.subregionName')
    td(class="border-b bg-white py-3 px-0.5")
        input(type='text'  class="w-28 bg-gray-100 rounded px-1" v-model.trim='value.subregionId')
    td(class="border-b bg-white py-3 px-0.5")
        input(type='text'  class="w-28 bg-gray-100 rounded px-1" v-model.trim='value.countryName')
    td(class="border-b bg-white py-3 px-0.5")
        input(type='text'  class="w-28 bg-gray-100 rounded px-1" v-model.trim='value.countryCode')
    td(class="border-b bg-white py-3 px-0.5")
        input(type='text'  class="w-28 bg-gray-100 rounded px-1" v-model.trim='value.mikeSiteName')
    td(class="border-b bg-white py-3 px-0.5")
        input(type='text'  class="w-28 bg-gray-100 rounded px-1" v-model.trim='value.mikeSiteId')
    td(class="border-b bg-white py-3 px-0.5 w-18")
        input(type="number" class="w-16 bg-gray-100 rounded px-1" v-model.number='value.year')
    td(class="border-b bg-white py-3 px-0.5")
        input(type="number" class="w-28 bg-gray-100 rounded px-1" v-model.number='value.carcasses')
    td(class="border-b bg-white py-3 px-0.5")
        input(type="number" class="w-28 bg-gray-100 rounded px-1" v-model.number='value.illegalCarcasses')
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
        const value = ref<MikeRecord>({ ...props.record })

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
