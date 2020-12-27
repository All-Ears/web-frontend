<template lang="pug">
div(class="spinner")
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    name: "LoadingSpinner",
})
</script>

<style lang="sass" scoped>
// idea came from  https://www.w3schools.com/howto/howto_css_loader.asp
.spinner
    border: 16px solid #f3f3f3
    border-top: 16px solid #3498db
    border-radius: 50%
    width: 120px
    height: 120px
    animation: spin 2s linear infinite

@keyframes spin
  0%
      transform: rotate(0deg)
  100%
      transform: rotate(360deg)
</style>
