<template lang="pug">
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import MikeRecordTable from "@/components/MikeRecordTable.vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { MikeRecord } from "@/models"
import Axios, { AxiosResponse } from "axios"
import Router from "@/router"

export default defineComponent({
    name: "UploadData",
    components: { FontAwesomeIcon },
    // setup() {},
})
</script>
<style lang="sass" scoped></style>
