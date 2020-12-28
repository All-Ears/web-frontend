<template lang="pug">
font-awesome-icon(icon="times")
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

export default defineComponent({
    name: "UploadData",
    components: { FontAwesomeIcon },
    // setup() {},
})
</script>
