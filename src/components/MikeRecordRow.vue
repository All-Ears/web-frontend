<template>
    <tr>
        <td scope="row"><button @click="requestRemoval">Remove</button></td>
        <td><input type="text" v-model="value.unRegion" /></td>
        <td><input type="text" v-model="value.subregionName" /></td>
        <td><input type="text" v-model="value.subregionId" /></td>
        <td><input type="text" v-model="value.countryName" /></td>
        <td><input type="text" v-model="value.countryCode" /></td>
        <td><input type="text" v-model="value.mikeSiteId" /></td>
        <td><input type="text" v-model="value.mikeSiteName" /></td>
        <td><input type="text" v-model="value.year" /></td>
        <td>
            <input type="text" v-model="value.totalNumberOfCarcasses" />
        </td>
        <td>
            <input type="text" v-model="value.numberOfIllegalCarcasses" />
        </td>
    </tr>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, reactive } from "vue"
import { MikeRecord } from "@/models"

export default defineComponent({
    name: "MikeRecordRow",
    props: {
        index: {
            type: Number as PropType<number>,
            required: true,
        },
        record: {
            type: Object as PropType<MikeRecord>,
            required: true,
        },
    },
    setup(props, context) {
        const value = reactive(props.record)

        watch(
            value,
            (val) => {
                context.emit("update:record", val)
            },
            { deep: true }
        )
        function requestRemoval() {
            context.emit("remove", props.index)
        }
        return { value, requestRemoval }
    },
})
</script>
