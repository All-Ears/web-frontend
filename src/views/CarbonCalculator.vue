<template>
    <div class="h-full w-full p-5">
        <dropdown-search :options="['one', 'two', 'three']" />
        <dropdown-search :options="['one', 'two', 'three']" />
        <div id="map" class="w-full h-4/5"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"
import { Maps, Zoom } from "@syncfusion/ej2-maps"
import { MAPBOX_TOKEN } from "@/config"
import DropdownSearch from "@/components/DropdownSearch.vue"

export default defineComponent({
    name: "CarbonCalculator",
    components: { DropdownSearch },
    setup() {
        Maps.Inject(Zoom)

        onMounted(() => {
            const maps = new Maps({
                zoomSettings: {
                    enable: true,
                    enablePanning: true,
                    zoomFactor: 3,
                },
                layers: [
                    {
                        layerType: "OSM",
                        urlTemplate:
                            "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/level/tileX/tileY?access_token=" +
                            MAPBOX_TOKEN,
                    },
                ],
            })
            maps.appendTo("#map")
        })
    },
})
</script>
