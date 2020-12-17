<template lang="pug">
div(class="flex flex-col justify-around p-4 items-center")
    mike-record-table(v-model:records="records")
    div(class="save-button p-5")
        button(class="rounded bg-green-300 py-1 px-3") 
            font-awesome-icon(class="mr-2" icon="save") 
            | Save changes
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import MikeRecordTable from "@/components/MikeRecordTable.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { MikeRecord } from "@/models"
import Axios from "axios"

export default defineComponent({
    name: "EditData",
    components: { MikeRecordTable, FontAwesomeIcon },
    setup() {
        const records = ref<MikeRecord[]>([])
        function loadRecords() {
            Axios.get("/records-mock.json")
                .then((res) => {
                    records.value = res.data
                })
                .catch((err) => {
                    console.error("Failed to to fetch MIKE records", err)
                })
        }
        onMounted(loadRecords)

        return { records }
    },
})
</script>
<style lang="sass" scoped>
.save-button
    position: fixed
    bottom: 0px
    width: 100vw
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-end
</style>
